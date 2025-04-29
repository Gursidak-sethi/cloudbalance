package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class TokenExpiredException extends RuntimeException {
    public TokenExpiredException(String message) {
        super(message);
    }
}