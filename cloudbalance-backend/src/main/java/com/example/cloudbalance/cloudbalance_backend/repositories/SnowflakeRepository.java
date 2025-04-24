package com.example.cloudbalance.cloudbalance_backend.repositories;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class SnowflakeRepository {

    private final JdbcTemplate jdbcTemplate;

    public SnowflakeRepository(@Qualifier("snowflakeJdbcTemplate") JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Fetches linked account IDs and their record counts from the cost_explorer table
     * @return List of AccountCostCount objects containing linked account IDs and their record counts
     */

//    public List<AccountCostCount> getLinkedAccountCounts() {
//        String query = "SELECT LINKEDACCOUNTID, COUNT(*) as COUNT FROM cost_explorer GROUP BY LINKEDACCOUNTID";
//
//        return jdbcTemplate.query(query, (rs, rowNum) -> {
//            AccountCostCount accountCostCount = new AccountCostCount();
//            accountCostCount.setLinkedAccountId(rs.getString("LINKEDACCOUNTID"));
//            accountCostCount.setCount(rs.getLong("COUNT"));
//            return accountCostCount;
//        });
//    }

}