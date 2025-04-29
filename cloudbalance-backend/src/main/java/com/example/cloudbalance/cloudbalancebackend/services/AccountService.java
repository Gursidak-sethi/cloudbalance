package com.example.cloudbalance.cloudbalancebackend.services;

import com.example.cloudbalance.cloudbalancebackend.dto.request.AccountRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.AccountDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.entities.Account;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.ResourceNotFoundException;
import com.example.cloudbalance.cloudbalancebackend.repositories.AccountRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<ApiResponseDTO<List<AccountDTO>>> getAccounts(){
        List<Account> accounts = accountRepository.findAll();
        if(accounts == null){
            throw new ResourceNotFoundException("Accounts not found");
        }
        List<AccountDTO> accountDTOS= accounts.stream().map(account ->
                new AccountDTO(account.getAccountId(),account.getAccountName())).toList();

        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "Accounts fetched successfully",
                accountDTOS
        ));
    }

    public ResponseEntity<ApiResponseDTO<?>> createAccount(AccountRequestDTO accountRequestDTO){
        Account account = new Account(accountRequestDTO.getAccountId(),
                accountRequestDTO.getAccountName(),
                accountRequestDTO.getArn());

        accountRepository.save(account);
        return ResponseEntity.status(HttpServletResponse.SC_CREATED).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_CREATED,
                "Account saved successfully",
                null
        ));
    }
}
