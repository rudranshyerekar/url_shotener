package com.example.url_shortener.model.dto;

public class ShortenResponse {
    private String code;
    private String shortUrl;
    private String expiresAt; // ISO string or null for minimal version

    public ShortenResponse() {}
    public ShortenResponse(String code, String shortUrl, String expiresAt) {
        this.code = code;
        this.shortUrl = shortUrl;
        this.expiresAt = expiresAt;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getShortUrl() { return shortUrl; }
    public void setShortUrl(String shortUrl) { this.shortUrl = shortUrl; }

    public String getExpiresAt() { return expiresAt; }
    public void setExpiresAt(String expiresAt) { this.expiresAt = expiresAt; }
}
