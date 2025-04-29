package com.example.cloudbalance.cloudbalancebackend.controllers;
import com.example.cloudbalance.cloudbalancebackend.dto.request.UserDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.UserInfoResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")

public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY')")
    public ResponseEntity<ApiResponseDTO<List<UserInfoResponseDTO>>> getUser(){
        return userManagementService.getUser();
    }

    @PostMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponseDTO<?>> createUser(@RequestBody UserDTO userDTO){
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        return userManagementService.createUser(userDTO);
    }
    @PutMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ApiResponseDTO<?>> updateUser(@RequestBody UserDTO userDTO){

        return userManagementService.updateUser(userDTO);
    }
}
