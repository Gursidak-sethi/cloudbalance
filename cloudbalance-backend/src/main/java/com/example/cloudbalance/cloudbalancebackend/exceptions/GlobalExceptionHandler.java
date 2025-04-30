package com.example.cloudbalance.cloudbalancebackend.exceptions;

import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.*;
import net.snowflake.client.jdbc.internal.google.protobuf.Api;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleConflict(ConflictException ex){
        return new ResponseEntity<>(new ApiResponseDTO<>(
                HttpStatus.CONFLICT.value(),
                ex.getMessage(),
                null
        ),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleUnauthorized(UnauthorizedException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleForbidden(ForbiddenException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.FORBIDDEN.value(), ex.getMessage(), null),
                HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleUserNotFound(UsernameNotFoundException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.NOT_FOUND.value(), ex.getMessage(), null),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleBadCredentials(BadCredentialsException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), "Invalid Credentials", null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleTokenExpired(TokenExpiredException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), ex.getMessage(), null),
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleInvalidToken(InvalidTokenException ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleAccessDeniedException(AccessDeniedException ex){
        return new ResponseEntity<>(new ApiResponseDTO<>(
                HttpStatus.FORBIDDEN.value(),
                ex.getMessage(),
                null
        ), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleResourceNotFound(ResourceNotFoundException ex){
        return new ResponseEntity<>(new ApiResponseDTO<>(
                HttpStatus.NOT_FOUND.value(),
                ex.getMessage(),
                null
        ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponseDTO<?>> handleBadRequest(BadRequestException ex){
        return new ResponseEntity<>(new ApiResponseDTO<>(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                null
        ), HttpStatus.BAD_REQUEST);
    }


    // Fallback for any other uncaught exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDTO<?>> handleGlobalException(Exception ex) {
        return new ResponseEntity<>(
                new ApiResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An unexpected error occurred", null),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
