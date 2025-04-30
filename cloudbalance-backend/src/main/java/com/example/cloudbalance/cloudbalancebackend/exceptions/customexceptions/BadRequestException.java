package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String message){
        super(message);
    }
}
