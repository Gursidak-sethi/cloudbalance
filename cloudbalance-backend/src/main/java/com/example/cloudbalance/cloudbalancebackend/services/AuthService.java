package com.example.cloudbalance.cloudbalancebackend.services;

import com.example.cloudbalance.cloudbalancebackend.dto.request.LoginRequestDTO;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> login(LoginRequestDTO loginRequestDTO);
    ResponseEntity<?> me();
    ResponseEntity<?> logout(String header);
}
