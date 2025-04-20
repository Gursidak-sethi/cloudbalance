package com.example.cloudbalance.cloudbalance_backend.configs;

import com.example.cloudbalance.cloudbalance_backend.dto.response.NotAuthorizedResponse;
import com.example.cloudbalance.cloudbalance_backend.exceptions.NotAuthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotAuthorizedException.class)
    public ResponseEntity<NotAuthorizedResponse> handleNotAuthorizedException(String message){
        NotAuthorizedResponse notAuthorizedResponse = new NotAuthorizedResponse(HttpStatus.UNAUTHORIZED.value(),message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(notAuthorizedResponse);
    }
}
