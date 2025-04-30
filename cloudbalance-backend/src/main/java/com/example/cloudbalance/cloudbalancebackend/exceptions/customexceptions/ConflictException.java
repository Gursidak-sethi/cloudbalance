package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class ConflictException extends RuntimeException{
    public ConflictException(String message){
        super(message);
    }
}
