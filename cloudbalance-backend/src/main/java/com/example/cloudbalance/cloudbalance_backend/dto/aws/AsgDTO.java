package com.example.cloudbalance.cloudbalance_backend.dto.aws;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsgDTO {
    private String name;
    private int minSize;
    private int maxSize;
    private int desiredCapacity;
}
