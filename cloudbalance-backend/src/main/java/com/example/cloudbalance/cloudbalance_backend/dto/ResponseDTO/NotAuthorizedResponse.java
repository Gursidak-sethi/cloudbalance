package com.example.cloudbalance.cloudbalance_backend.dto.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotAuthorizedResponse {
    private int status;
    private String message;
}
