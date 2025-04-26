package com.example.cloudbalance.cloudbalance_backend.controllers;

import com.example.cloudbalance.cloudbalance_backend.dto.request.CostAnalysisRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.services.CostAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cost-analysis")
public class CostAnalysisController {

    @Autowired
    private CostAnalysisService costAnalysisService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @GetMapping("groups")
    public ResponseEntity<?> getGroupByColumns(){
        return ResponseEntity.ok(costAnalysisService.getGroupByColumns());
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @PostMapping("cost")
    public ResponseEntity<?> getTotalCosting(@RequestBody CostAnalysisRequestDTO costAnalysisRequestDTO){
        return ResponseEntity.ok(costAnalysisService.getTotalCosting(costAnalysisRequestDTO));
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @GetMapping("filters/{column}")
    public ResponseEntity<?> getFilterOptions(@PathVariable String column) {
        return costAnalysisService.getFilterOptions(column);
    }
}
