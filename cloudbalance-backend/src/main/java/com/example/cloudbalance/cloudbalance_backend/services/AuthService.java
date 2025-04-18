package com.example.cloudbalance.cloudbalance_backend.services;

import com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO.LoginRequestDTO;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> login(LoginRequestDTO loginRequestDTO);
    ResponseEntity<?> me();
    ResponseEntity<?> logout(String header);
}
