package com.example.cloudbalance.cloudbalancebackend.utils;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CostAnalysisQueryBuilder {

    private final StringBuilder selectClause = new StringBuilder();
    private final StringBuilder fromClause = new StringBuilder();
    private final StringBuilder whereClause = new StringBuilder();
    private final StringBuilder groupByClause = new StringBuilder();
    private final StringBuilder orderByClause = new StringBuilder();

    // Constructor to initialize with base SELECT statement
    public CostAnalysisQueryBuilder() {
        selectClause.append("SELECT TO_CHAR(USAGESTARTDATE, 'YYYY-MM') AS USAGE_DATE, ");
        selectClause.append("SUM(LINEITEM_USAGEAMOUNT) AS TOTAL_USAGE_COST, ");
    }

    // Method to set the FROM clause
    public CostAnalysisQueryBuilder from(String tableName) {
        fromClause.append("FROM ").append(sanitizeInput(tableName)).append(" ");
        return this;
    }

    // Method to apply date range filter based on the request
    public CostAnalysisQueryBuilder whereDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            LocalDate firstDayOfStartMonth = startDate.withDayOfMonth(1);
            LocalDate lastDayOfEndMonth = endDate.withDayOfMonth(endDate.lengthOfMonth());

            if (!whereClause.isEmpty()) {
                whereClause.append(" AND ");
            }
            whereClause.append("TO_DATE(MYCLOUD_STARTYEAR || '-' || MYCLOUD_STARTMONTH || '-' || MYCLOUD_STARTDAY, 'YYYY-MM-DD') BETWEEN '")
                    .append(sanitizeInput(firstDayOfStartMonth.toString())).append("' AND '")
                    .append(sanitizeInput(lastDayOfEndMonth.toString())).append("' ");
        }
        return this;
    }

    // Method to apply dynamic filters like 'column IN (...)'
    public CostAnalysisQueryBuilder whereFilters(Map<String, List<String>> filters) {
        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                String column = sanitizeInput(entry.getKey()); // sanitize column name
                List<String> values = entry.getValue();
                if (values != null && !values.isEmpty()) {
                    if (!whereClause.isEmpty()) {
                        whereClause.append(" AND ");
                    }
                    String inClause = values.stream()
                            .map(val -> "'" + sanitizeInput(val) + "'") // sanitize each value
                            .collect(Collectors.joining(", "));
                    whereClause.append(column).append(" IN (").append(inClause).append(") ");
                }

//                'WHERE FILTER1 in (<FILTER>) AND FILTER2 in (<FILTER2>) ';
            }
        }
        return this;
    }

    public CostAnalysisQueryBuilder whereAccountId(String accId){
        if (accId != null && !accId.isEmpty()) {
            if (!whereClause.isEmpty()) {
                whereClause.append(" AND ");
            }
            whereClause.append("LINKEDACCOUNTID = '").append(sanitizeInput(accId))
                    .append("' ");
        }
        return this;
    }

    // Method to add GROUP BY clause
    public CostAnalysisQueryBuilder groupBy(String groupByField) {
        selectClause.append(sanitizeInput(groupByField)).append(" ");
        groupByClause.append("GROUP BY TO_CHAR(USAGESTARTDATE, 'YYYY-MM'), ").append(sanitizeInput(groupByField)).append(" ");
        return this;
    }

    // Method to add ORDER BY clause
    public CostAnalysisQueryBuilder orderBy(String orderByColumn, boolean desc) {
        orderByClause.append("ORDER BY ").append(sanitizeInput(orderByColumn));
        if (desc) {
            orderByClause.append(" DESC");
        }
        return this;
    }

    // Method to sanitize user inputs (escaping quotes and special characters)
    private String sanitizeInput(String input) {
        if (input == null) {
            return "";
        }
        // Escape single quotes (to prevent SQL injection)
        return input.replace("'", "''");
    }

    // Method to build and return the final query string
    public String build() {
        StringBuilder query = new StringBuilder();
        query.append(selectClause.toString())
                .append(fromClause.toString());

        // Only add WHERE clause if it contains any conditions
        if (!whereClause.isEmpty()) {
            query.append("WHERE ").append(whereClause.toString());
        }

        query.append(groupByClause.toString())
                .append(orderByClause.toString());

        return query.toString();
    }
}
