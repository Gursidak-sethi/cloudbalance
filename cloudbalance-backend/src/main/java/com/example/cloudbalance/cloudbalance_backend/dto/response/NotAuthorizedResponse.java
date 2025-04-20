package com.example.cloudbalance.cloudbalance_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotAuthorizedResponse {
    private int status;
    private String message;
}
