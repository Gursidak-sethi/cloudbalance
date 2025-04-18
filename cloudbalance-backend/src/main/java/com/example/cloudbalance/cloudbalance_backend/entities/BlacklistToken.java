package com.example.cloudbalance.cloudbalance_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "blacklist_token")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlacklistToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blacklistId;

    private String token;
    private Date expiryDate;
}
