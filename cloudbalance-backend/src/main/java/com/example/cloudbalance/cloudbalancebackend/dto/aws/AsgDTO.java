package com.example.cloudbalance.cloudbalancebackend.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsgDTO {
    private String resourceId;
    private String resourceName;
    private String region;
    private int desiredCapacity;
    private int minSize;
    private int maxSize;
    private String status;
}
