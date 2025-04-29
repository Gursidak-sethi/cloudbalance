package com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions;

public class UsernameNotFoundException extends RuntimeException{
     public UsernameNotFoundException(String message){
        super(message);
    }
}
