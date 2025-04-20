package com.example.cloudbalance.cloudbalance_backend.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RdsDTO {
    private String dbIdentifier;
    private String engine;
    private String status;
}
