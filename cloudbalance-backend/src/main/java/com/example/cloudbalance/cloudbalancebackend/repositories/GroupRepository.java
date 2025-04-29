package com.example.cloudbalance.cloudbalancebackend.repositories;

import com.example.cloudbalance.cloudbalancebackend.entities.CAGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<CAGroup, Long> {
}
