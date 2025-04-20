package com.example.cloudbalance.cloudbalance_backend.services;

import com.example.cloudbalance.cloudbalance_backend.dto.request.AccountRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.response.AccountDTO;
import com.example.cloudbalance.cloudbalance_backend.entities.Account;
import com.example.cloudbalance.cloudbalance_backend.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<?> getAccounts(){
        List<Account> accounts = accountRepository.findAll();
        List<AccountDTO> accountDTOS= accounts.stream().map(account ->
                new AccountDTO(account.getAccountId(),account.getAccountName())).toList();

        return ResponseEntity.ok(accountDTOS);
    }

    public ResponseEntity<?> createAccount(AccountRequestDTO accountRequestDTO){
        Account account = new Account(accountRequestDTO.getAccountId(),
                accountRequestDTO.getAccountName(),
                accountRequestDTO.getArn());

        accountRepository.save(account);
        return ResponseEntity.ok("Account saved");
    }
}
