package com.example.cloudbalance.cloudbalance_backend.repositories;

import com.example.cloudbalance.cloudbalance_backend.entities.CAGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<CAGroup, Long> {
}
