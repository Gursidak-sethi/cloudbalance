package com.example.cloudbalance.cloudbalance_backend.services;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private final String jwtSecret = "%THeSupErStr0NglYGenRATedRaND0MSecREtKEY%" ; //
    private final long jwtExpirationMs = 900000; // 15 minutes expiration


    private SecretKey getSigningKey() {
        String key = Base64.getEncoder().encodeToString(jwtSecret.getBytes());
        return Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(key));
    }

    // Generate token with username & role
    public String generateToken(String username, String role) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), Jwts.SIG.HS256)
                .compact();
    }

    // Extract username from JWT
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract role from JWT
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // Generic method to extract any claim
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims from JWT
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey()) // ✅ New method
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Validate JWT token & role
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("JWT expired: " + e.getMessage());
        } catch (JwtException e) {
            System.out.println("JWT validation error: " + e.getMessage());
        }
        return false;
    }

    private boolean isTokenExpired(String token){
        return extractExpiratonDate(token).before(new Date());
    }

    public Date extractExpiratonDate(String token){
        return extractClaim(token,Claims::getExpiration);
    }
}
