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
    @Column(name = "blacklist_id")
    private Long blacklistId;

    private String token;

    @Column(name = "expiry_date")
    private Date expiryDate;
}
