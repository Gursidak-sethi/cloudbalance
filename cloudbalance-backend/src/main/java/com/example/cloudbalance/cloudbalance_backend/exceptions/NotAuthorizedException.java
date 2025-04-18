package com.example.cloudbalance.cloudbalance_backend.exceptions;


public class NotAuthorizedException extends RuntimeException{
    public NotAuthorizedException(String message){
        super(message);
    }
}
