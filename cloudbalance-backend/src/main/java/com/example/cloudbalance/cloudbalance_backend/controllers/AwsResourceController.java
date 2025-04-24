package com.example.cloudbalance.cloudbalance_backend.controllers;

import com.example.cloudbalance.cloudbalance_backend.services.AwsResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aws")
public class AwsResourceController {

    @Autowired
    private AwsResourceService awsService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @GetMapping("/{accountId}")
    public ResponseEntity<?> getResources(
            @PathVariable String accountId,
            @RequestParam String type
    ) {
        switch (type.toLowerCase()) {
            case "ec2":
                return ResponseEntity.ok(awsService.fetchEC2Instances(accountId));
            case "rds":
                return ResponseEntity.ok(awsService.fetchRDSInstances(accountId));
            case "asg":
                return ResponseEntity.ok(awsService.fetchASGInstances(accountId));
            default:
                return ResponseEntity.badRequest().body("Invalid type: must be ec2, rds, or asg");
        }
    }
}
