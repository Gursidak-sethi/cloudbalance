package com.example.cloudbalance.cloudbalance_backend.controllers;

import com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO.LoginRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.services.AuthServiceImpl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceImpl authService;

    public AuthController(AuthServiceImpl authService){
        this.authService=authService;
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){
        return authService.login(loginRequestDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader ("Authorization") String header) {
        return authService.logout(header);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        return authService.me();
    }
}
