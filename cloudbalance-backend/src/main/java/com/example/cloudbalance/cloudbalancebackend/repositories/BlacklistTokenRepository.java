package com.example.cloudbalance.cloudbalancebackend.repositories;

import com.example.cloudbalance.cloudbalancebackend.entities.BlacklistToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlacklistTokenRepository extends JpaRepository<BlacklistToken, Long> {
    BlacklistToken findByToken(String token);
    Boolean existsByToken(String jwt);
}
