package com.example.cloudbalance.cloudbalancebackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CostAnalysisRequestDTO {
    private String accountId;
    private String groupBy;
    private Map<String, List<String>> filters;
    private String startDate;
    private String endDate;
}
