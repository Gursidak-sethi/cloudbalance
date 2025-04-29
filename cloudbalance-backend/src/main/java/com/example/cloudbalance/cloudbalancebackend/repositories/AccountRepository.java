package com.example.cloudbalance.cloudbalancebackend.repositories;
import com.example.cloudbalance.cloudbalancebackend.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account,String> {
    Optional<Account> findByAccountId(String accountId);
    List<Account> findAllByAccountIdIn(List<String> accountIds);
}
