package com.example.cloudbalance.cloudbalancebackend.controllers;

import com.example.cloudbalance.cloudbalancebackend.dto.request.LoginRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.LoginResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.services.authserviceimpl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceImpl authService;

    public AuthController(AuthServiceImpl authService){
        this.authService=authService;
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<LoginResponseDTO>> login(@RequestBody LoginRequestDTO loginRequestDTO){
        return authService.login(loginRequestDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponseDTO<?>> logout(@RequestHeader ("Authorization") String header) {
        return authService.logout(header);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponseDTO<?>> getCurrentUser() {
        return authService.me();
    }
}
