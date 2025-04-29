package com.example.cloudbalance.cloudbalancebackend.controllers;

import com.example.cloudbalance.cloudbalancebackend.dto.request.AccountRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.AccountDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/account")
    public ResponseEntity<ApiResponseDTO<?>> createAccount(@RequestBody AccountRequestDTO accountRequestDTO){
       return accountService.createAccount(accountRequestDTO);
    }
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY')")
    @GetMapping("/account")
    public ResponseEntity<ApiResponseDTO<List<AccountDTO>>> getAccounts(){
        return accountService.getAccounts();
    }
}
