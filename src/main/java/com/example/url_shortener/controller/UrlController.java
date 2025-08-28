package com.example.url_shortener.controller;

import com.example.url_shortener.service.UrlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/url")
public class UrlController {

    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    @PostMapping("/shorten")
    public ResponseEntity<String> shortenUrl(@RequestParam("url") String url) {
        String shortCode = service.shortenUrl(url);
        return ResponseEntity.ok("http://localhost:8080/" + shortCode);
    }
}
