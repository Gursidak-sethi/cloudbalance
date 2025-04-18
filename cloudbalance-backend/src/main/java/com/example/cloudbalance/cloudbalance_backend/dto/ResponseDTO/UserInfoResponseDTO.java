package com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponseDTO {
    private Long userId;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private Date lastLogin;
    private List<AccountDTO> accounts;
    private List<DashboardDTO> dashboards;
}
