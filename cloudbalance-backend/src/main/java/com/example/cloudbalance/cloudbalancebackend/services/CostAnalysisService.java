package com.example.cloudbalance.cloudbalancebackend.services;

import com.example.cloudbalance.cloudbalancebackend.dto.request.CostAnalysisRequestDTO;
import com.example.cloudbalance.cloudbalancebackend.dto.response.ApiResponseDTO;
import com.example.cloudbalance.cloudbalancebackend.entities.CAGroup;
import com.example.cloudbalance.cloudbalancebackend.exceptions.customexceptions.ResourceNotFoundException;
import com.example.cloudbalance.cloudbalancebackend.repositories.GroupRepository;
import com.example.cloudbalance.cloudbalancebackend.repositories.SnowflakeRepository;
import com.example.cloudbalance.cloudbalancebackend.utils.QueryGenerator;
import jakarta.servlet.http.HttpServletResponse;
import net.snowflake.client.jdbc.internal.google.protobuf.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CostAnalysisService {

    @Autowired
    private SnowflakeRepository snowflakeRepository;

    @Autowired
    private GroupRepository groupRepository;

    public List<CAGroup> getGroupByColumns(){
        return groupRepository.findAll();
    }


    public ResponseEntity<ApiResponseDTO<List<Map<String,Object>>>> getTotalCosting(CostAnalysisRequestDTO request) {
        String req = QueryGenerator.generateCostAnalysisQuery(request);
        return processData(snowflakeRepository.getCostAnalysisData(req), request.getGroupBy());
    }

    private ResponseEntity<ApiResponseDTO<List<Map<String,Object>>>> processData(List<Map<String, Object>> data, String groupedBy) {
        data = data.stream()
                .filter(row -> row.values().stream().noneMatch(Objects::isNull))
                .collect(Collectors.toList());
        // Group by USAGE_DATE, preserving the order
        Map<String, List<Map<String, Object>>> dataByDate = data.stream()
                .collect(Collectors.groupingBy(
                        row -> row.get("USAGE_DATE").toString(),
                        LinkedHashMap::new,    // important: keep order!
                        Collectors.toList()
                ));

        List<Map<String, Object>> finalProcessedList = new ArrayList<>();

        for (Map.Entry<String, List<Map<String, Object>>> entry : dataByDate.entrySet()) {
            String date = entry.getKey();
            List<Map<String, Object>> rows = entry.getValue();

            // Sort by TOTAL_USAGE_COST descending
            rows.sort((row1, row2) -> {
                double cost1 = Double.parseDouble(row1.get("TOTAL_USAGE_COST").toString());
                double cost2 = Double.parseDouble(row2.get("TOTAL_USAGE_COST").toString());
                return Double.compare(cost2, cost1);
            });

            // Take top 5
            List<Map<String, Object>> top5 = rows.stream().limit(5).collect(Collectors.toList());
            finalProcessedList.addAll(top5);

            // Handle "Others" if needed
            if (rows.size() > 5) {
                double othersTotal = rows.stream().skip(5)
                        .mapToDouble(r -> Double.parseDouble(r.get("TOTAL_USAGE_COST").toString()))
                        .sum();

                Map<String, Object> othersRow = new LinkedHashMap<>();
                othersRow.put("USAGE_DATE", date);
                othersRow.put("TOTAL_USAGE_COST", othersTotal);
                othersRow.put(groupedBy, "Others");

                finalProcessedList.add(othersRow);
            }
        }
        return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                HttpServletResponse.SC_OK,
                "Cost Data fetched successfully",
                finalProcessedList
        ));
    }


    public ResponseEntity<ApiResponseDTO<List<String >>> getFilterOptions(String column){
        try {
            List<String> distinctValues = snowflakeRepository.getDistinctValuesForColumn(column);
            return ResponseEntity.status(HttpServletResponse.SC_OK).body(new ApiResponseDTO<>(
                    HttpServletResponse.SC_OK,
                    "Filters fetched successfully",
                    distinctValues
            ));
        } catch (ResourceNotFoundException e) {
            throw new ResourceNotFoundException("Resource not found: "+e.getMessage());
        }
    }

}
