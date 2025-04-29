package com.example.cloudbalance.cloudbalancebackend.controllers;

import com.example.cloudbalance.cloudbalancebackend.dto.request.CostAnalysisRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.entities.CAGroup;
import com.example.cloudbalance.cloudbalancebackend.services.CostAnalysisService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cost-analysis")
public class CostAnalysisController {

    @Autowired
    private CostAnalysisService costAnalysisService;

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @GetMapping("groups")
    public ResponseEntity<ApiResponseDTO<List<CAGroup>>> getGroupByColumns(){
        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "Columns fetched successfully",
                costAnalysisService.getGroupByColumns()
    ));}

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @PostMapping("cost")
    public ResponseEntity<ApiResponseDTO<List<Map<String,Object>>>> getTotalCosting(@RequestBody CostAnalysisRequestDTO costAnalysisRequestDTO){
        return costAnalysisService.getTotalCosting(costAnalysisRequestDTO);
    }

    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('READ_ONLY') or hasAuthority('CUSTOMER')")
    @GetMapping("filters/{column}")
    public ResponseEntity<ApiResponseDTO<List<String>>> getFilterOptions(@PathVariable String column) {
        return costAnalysisService.getFilterOptions(column);
    }
}
