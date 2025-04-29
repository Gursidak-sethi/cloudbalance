package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}