package com.example.cloudbalance.cloudbalance_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private String token;
//    private List<DashboardDTO> dashboardDTOS;
}
