package com.example.url_shortener.controller;

import com.example.url_shortener.model.dto.ShortenRequest;
import com.example.url_shortener.model.dto.ShortenResponse;
import com.example.url_shortener.service.UrlService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class ApiV1Controller {

    private final UrlService service;

    public ApiV1Controller(UrlService service) {
        this.service = service;
    }

    @PostMapping("/shorten")
    public ResponseEntity<ShortenResponse> shorten(@RequestBody ShortenRequest req) {
        String code = service.shortenUrl(req.getUrl());
        String shortUrl = "http://localhost:8080/" + code;
        // Minimal: ignore expiryDays, return null for expiresAt
        return ResponseEntity.ok(new ShortenResponse(code, shortUrl, null));
    }
}
