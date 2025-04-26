package com.example.cloudbalance.cloudbalance_backend.services;

import com.example.cloudbalance.cloudbalance_backend.dto.request.CostAnalysisRequestDTO;
import com.example.cloudbalance.cloudbalance_backend.entities.CAGroup;
import com.example.cloudbalance.cloudbalance_backend.repositories.GroupRepository;
import com.example.cloudbalance.cloudbalance_backend.repositories.SnowflakeRepository;
import com.example.cloudbalance.cloudbalance_backend.utils.QueryGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<Map<String, Object>> getData() {
        return snowflakeRepository.getData();
    }

    public Object getTotalCosting(CostAnalysisRequestDTO request) {
        String req = QueryGenerator.generateCostAnalysisQuery(request);
        return processData(snowflakeRepository.getCostAnalysisData(req), request.getGroupBy());
    }

    private Map<String, Object> processData(List<Map<String, Object>> data, String groupedBy) {
        // Sort the data by USAGE_DATE or TOTAL_USAGE_COST to get the top 5
        data.sort((row1, row2) -> {
            // Compare by USAGE_DATE or TOTAL_USAGE_COST depending on your need
            return Double.compare((Double) row2.get("TOTAL_USAGE_COST"), (Double) row1.get("TOTAL_USAGE_COST"));
        });

        // Get the top 5 rows
        List<Map<String, Object>> top5Rows = data.stream().limit(5).collect(Collectors.toList());

        // Calculate the "Others" data by aggregating the rest
        double othersTotalCost = data.stream().skip(5).mapToDouble(row -> (Double) row.get("TOTAL_USAGE_COST")).sum();

        // Add "Others" as a new row
        Map<String, Object> othersRow = new HashMap<>();

        othersRow.put("USAGE_DATE", "Others");
        othersRow.put("TOTAL_USAGE_COST", othersTotalCost);
        othersRow.put(groupedBy, "Others");


        // Add "Others" row to the top 5 rows
        top5Rows.add(othersRow);

        // Return the processed data
        Map<String, Object> result = new HashMap<>();
        result.put("data", top5Rows);
        result.put("totalRows", data.size());
        return result;
    }

    public ResponseEntity<?> getFilterOptions(String column){
        try {

            List<String> distinctValues = snowflakeRepository.getDistinctValuesForColumn(column);
            return ResponseEntity.ok(distinctValues);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching filter values.");
        }
    }

}
