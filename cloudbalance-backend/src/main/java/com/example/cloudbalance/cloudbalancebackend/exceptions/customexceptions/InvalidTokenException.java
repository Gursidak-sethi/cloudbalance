package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }
}