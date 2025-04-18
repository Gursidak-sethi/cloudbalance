package com.example.cloudbalance.cloudbalance_backend.dto.RequestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRequestDTO {
    private String accountId;
    private String accountName;
    private String arn;
}
