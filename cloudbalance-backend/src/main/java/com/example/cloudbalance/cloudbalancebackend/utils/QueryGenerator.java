package com.example.cloudbalance.cloudbalancebackend.utils;

import com.example.cloudbalance.cloudbalancebackend.dto.request.CostAnalysisRequestDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class QueryGenerator {
    public static String generateCostAnalysisQuery(CostAnalysisRequestDTO request){
        System.out.println(request.toString());
        String groupByField = request.getGroupBy();
        if (groupByField == null || groupByField.trim().isEmpty()) {
            throw new IllegalArgumentException("GroupBy field cannot be null or empty");
        }

        // Parse dates from request (which are like "2025-04")
        String startDateString = request.getStartDate();  // e.g., "2025-04"
        String endDateString = request.getEndDate();      // e.g., "2025-04"

        // Correct formatter for "yyyy-MM-dd"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Add "-01" to the date string to make it a complete date
        startDateString = startDateString + "-01";  // "2025-04-01"
        endDateString = endDateString + "-01";      // "2025-04-01"

        // Convert to LocalDate by parsing "yyyy-MM-dd"
        LocalDate startDate = LocalDate.parse(startDateString, formatter);
        LocalDate endDate = LocalDate.parse(endDateString, formatter);

        // Set the last day of the end month
        endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());

        // Initialize the query builder
        CostAnalysisQueryBuilder queryBuilder = new CostAnalysisQueryBuilder();

        // Build query using the builder methods
        queryBuilder
                .from("COST_EXPLORER")  // Static table name (could also be dynamic if needed)
                .whereDateRange(startDate, endDate)
                .whereAccountId(request.getAccountId())
                .whereFilters(request.getFilters())
                .groupBy(groupByField)
                .orderBy("USAGE_DATE", true); // Assuming ordering by date in descending order

        return queryBuilder.build();
    }
}
