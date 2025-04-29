package com.example.cloudbalance.cloudbalancebackend.repositories;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class SnowflakeRepository {

    private final JdbcTemplate jdbcTemplate;

    public SnowflakeRepository(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // SnowflakeRepository.java
    public List<String> getDistinctValuesForColumn(String column) {
        String sql = String.format(
                "SELECT DISTINCT %s FROM cost_explorer WHERE %s IS NOT NULL ORDER BY %s LIMIT 1000",
                column, column, column
        );
        return jdbcTemplate.queryForList(sql, String.class);
    }

    public List<Map<String, Object>> getCostAnalysisData(String req) {
        return jdbcTemplate.queryForList(req);
    }

}