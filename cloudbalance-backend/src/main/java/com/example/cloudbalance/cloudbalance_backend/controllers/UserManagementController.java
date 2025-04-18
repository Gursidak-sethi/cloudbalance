package com.example.cloudbalance.cloudbalance_backend.controllers;
import com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO.UserDTO;
import com.example.cloudbalance.cloudbalance_backend.entities.User;
import com.example.cloudbalance.cloudbalance_backend.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")

public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY')")
    public ResponseEntity<?> getUser(){
        return userManagementService.getUser();
    }

    @PostMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO){
        userDTO.setPassword(encoder.encode(userDTO.getPassword()));
        return userManagementService.createUser(userDTO);
    }
    @PutMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO){

        return userManagementService.updateUser(userDTO);
    }
}
