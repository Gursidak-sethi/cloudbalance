package com.example.cloudbalance.cloudbalance_backend.controllers;

import com.example.cloudbalance.cloudbalance_backend.dto.request.AccountRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.services.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/account")
    public ResponseEntity<?> createAccount(@RequestBody AccountRequestDTO accountRequestDTO){
       return accountService.createAccount(accountRequestDTO);
    }
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY')")
    @GetMapping("/account")
    public ResponseEntity<?> getAccounts(){
        return accountService.getAccounts();
    }
}
