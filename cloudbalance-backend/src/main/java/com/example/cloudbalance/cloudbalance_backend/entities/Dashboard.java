package com.example.cloudbalance.cloudbalance_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dashboard")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dashboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dashboardId;
    @Enumerated(EnumType.STRING)
    private DashboardEnum dashboard;
    private String displayName;

    private String accessType;
    @Enumerated(EnumType.STRING)
    private Role role;
}
