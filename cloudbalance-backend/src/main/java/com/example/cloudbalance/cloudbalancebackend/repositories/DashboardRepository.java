package com.example.cloudbalance.cloudbalancebackend.repositories;

import com.example.cloudbalance.cloudbalancebackend.entities.Dashboard;
import com.example.cloudbalance.cloudbalancebackend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<Dashboard,Long> {
    List<Dashboard> findByRole(Role role);
}
