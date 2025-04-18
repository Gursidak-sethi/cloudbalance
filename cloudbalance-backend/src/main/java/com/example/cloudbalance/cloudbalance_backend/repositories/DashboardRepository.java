package com.example.cloudbalance.cloudbalance_backend.repositories;

import com.example.cloudbalance.cloudbalance_backend.entities.Dashboard;
import com.example.cloudbalance.cloudbalance_backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Dashboard,Long> {
    List<Dashboard> findByRole(Role role);
}
