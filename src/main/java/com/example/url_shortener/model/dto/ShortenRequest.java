package com.example.url_shortener.model.dto;

public class ShortenRequest {
    private String url;
    private Integer expiryDays; // optional

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Integer getExpiryDays() { return expiryDays; }
    public void setExpiryDays(Integer expiryDays) { this.expiryDays = expiryDays; }
}
