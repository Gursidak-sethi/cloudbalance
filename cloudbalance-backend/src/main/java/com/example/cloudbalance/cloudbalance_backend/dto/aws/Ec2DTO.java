package com.example.cloudbalance.cloudbalance_backend.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ec2DTO {
    private String instanceId;
    private String instanceType;
    private String state;
}
