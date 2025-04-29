package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class ForbiddenException extends RuntimeException {
    public ForbiddenException(String message) {
        super(message);
    }
}