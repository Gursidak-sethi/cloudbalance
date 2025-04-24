package com.example.cloudbalance.cloudbalance_backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Entity
@Table(name = "dashboard")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Dashboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dashboard_id")
    private Long dashboardId;
    @Enumerated(EnumType.STRING)
    private DashboardEnum dashboard;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "access_type")
    private String accessType;
    @Enumerated(EnumType.STRING)
    private Role role;
}
