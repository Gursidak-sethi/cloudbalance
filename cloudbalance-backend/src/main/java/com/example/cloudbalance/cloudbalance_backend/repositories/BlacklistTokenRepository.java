package com.example.cloudbalance.cloudbalance_backend.repositories;

import com.example.cloudbalance.cloudbalance_backend.entities.BlacklistToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlacklistTokenRepository extends JpaRepository<BlacklistToken, Long> {
    BlacklistToken findByToken(String token);
    Boolean existsByToken(String jwt);
}
