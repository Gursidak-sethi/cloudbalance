package com.example.cloudbalance.cloudbalancebackend.dto.response;

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
