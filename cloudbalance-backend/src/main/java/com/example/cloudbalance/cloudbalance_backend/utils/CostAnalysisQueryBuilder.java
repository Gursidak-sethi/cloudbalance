package com.example.cloudbalance.cloudbalance_backend.utils;

import com.example.cloudbalance.cloudbalance_backend.dto.request.CostAnalysisRequestDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        fromClause.append("FROM ").append(tableName).append(" ");
        return this;
    }

    // Method to apply date range filter based on the request
    public CostAnalysisQueryBuilder whereDateRange(LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            // Converting start date to first day of the month
            LocalDate firstDayOfStartMonth = startDate.withDayOfMonth(1);

            // Converting end date to last day of the month
            LocalDate lastDayOfEndMonth = endDate.withDayOfMonth(endDate.lengthOfMonth());

            // Adding conditions for start date and end date based on the year, month, and day
            if (whereClause.length() > 0) {
                whereClause.append(" AND ");
            }
            whereClause.append("TO_DATE(MYCLOUD_STARTYEAR || '-' || MYCLOUD_STARTMONTH || '-' || MYCLOUD_STARTDAY, 'YYYY-MM-DD') BETWEEN '")
                    .append(firstDayOfStartMonth).append("' AND '")
                    .append(lastDayOfEndMonth).append("' ");
        }
        return this;
    }

    // Method to apply dynamic filters like 'column IN (...)'
    public CostAnalysisQueryBuilder whereFilters(Map<String, List<String>> filters) {
        if (filters != null && !filters.isEmpty()) {
            for (Map.Entry<String, List<String>> entry : filters.entrySet()) {
                String column = entry.getKey();
                List<String> values = entry.getValue();
                if (values != null && !values.isEmpty()) {
                    if (whereClause.length() > 0) {
                        whereClause.append(" AND ");
                    }
                    String inClause = values.stream()
                            .map(val -> "'" + val.replace("'", "''") + "'")
                            .collect(Collectors.joining(", "));
                    whereClause.append(column).append(" IN (").append(inClause).append(") ");
                }
            }
        }
        return this;
    }

    public CostAnalysisQueryBuilder whereAccountId(String accId){
        if (accId != null && !accId.isEmpty()) {
            if (!whereClause.isEmpty()) {
                whereClause.append(" AND ");
            }
            whereClause.append("LINKEDACCOUNTID = '").append(accId.replace("'", "''"))
                    .append("' ");
        }
        return this;
    }
    // Method to add GROUP BY clause
    public CostAnalysisQueryBuilder groupBy(String groupByField) {
        selectClause.append(groupByField).append(" ");
        groupByClause.append("GROUP BY TO_CHAR(USAGESTARTDATE, 'YYYY-MM'), ").append(groupByField).append(" ");
        return this;
    }

    // Method to add ORDER BY clause
    public CostAnalysisQueryBuilder orderBy(String orderByColumn, boolean desc) {
        orderByClause.append("ORDER BY ").append(orderByColumn);
        if (desc) {
            orderByClause.append(" DESC");
        }
        return this;
    }

    // Method to build and return the final query string
    public String build() {
        StringBuilder query = new StringBuilder();
        query.append(selectClause.toString())
                .append(fromClause.toString());

        // Only add WHERE clause if it contains any conditions
        if (whereClause.length() > 0) {
            query.append("WHERE ").append(whereClause.toString());
        }

        query.append(groupByClause.toString())
                .append(orderByClause.toString());

        return query.toString();
    }

}
