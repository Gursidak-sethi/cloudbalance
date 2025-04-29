package com.example.cloudbalance.cloudbalancebackend.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ec2DTO {
    private String resourceId;
    private String resourceName;
    private String region;
    private String status;
}
