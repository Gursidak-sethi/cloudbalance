package com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO;

import com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO.AccountDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private List<String> accounts;
}
