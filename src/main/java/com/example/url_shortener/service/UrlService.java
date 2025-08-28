package com.example.url_shortener.service;

import com.example.url_shortener.Repo.UrlRepository;
import com.example.url_shortener.model.UrlMapping;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Random;
import java.util.Optional;
import java.net.URI;
import java.net.URISyntaxException;

@Service
public class UrlService {

    private final UrlRepository repository;

    public UrlService(UrlRepository repository) {
        this.repository = repository;
    }

    public String shortenUrl(String originalUrl) {
        validateUrl(originalUrl);

        // Retry a few times to avoid rare collisions
        for (int attempt = 0; attempt < 5; attempt++) {
            String shortCode = generateShortCode();
            Optional<UrlMapping> existing = repository.findByShortCode(shortCode);
            if (existing.isPresent()) {
                continue; // collision, try again
            }
            UrlMapping mapping = new UrlMapping();
            mapping.setOriginalUrl(originalUrl);
            mapping.setShortCode(shortCode);
            repository.save(mapping);
            return shortCode;
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to generate unique short code, please retry");
    }

    public String getOriginalUrl(String shortCode) {
        return repository.findByShortCode(shortCode)
                .map(UrlMapping::getOriginalUrl)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Short URL not found"));
    }

    private String generateShortCode() {
        String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    private void validateUrl(String url) {
        try {
            URI u = new URI(url);
            if (u.getScheme() == null || u.getHost() == null) {
                throw new IllegalArgumentException("Invalid URL");
            }
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid URL");
        }
    }
}
