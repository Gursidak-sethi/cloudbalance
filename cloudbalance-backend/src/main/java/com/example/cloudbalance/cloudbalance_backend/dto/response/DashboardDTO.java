package com.example.cloudbalance.cloudbalance_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private Long id;
    private String dashboard;
    private String displayName;
    private String access;
}
