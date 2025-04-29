package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
    }
}
