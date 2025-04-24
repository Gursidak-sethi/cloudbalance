package com.example.cloudbalance.cloudbalance_backend.configs;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.datasource.url}")
    private String url;

    @Value("${snowflake.datasource.username}")
    private String username;

    @Value("${snowflake.datasource.password}")
    private String password;

    @Value("${snowflake.datasource.warehouse")
    private String warehouse;

    @Value("${snowflake.datasource.driver-class-name}")
    private String driverClassName;

    @Bean(name = "snowflakeDataSource")
    public DataSource snowflakeDataSource() {
        HikariDataSource dataSource = new HikariDataSource();

        String connectionUrl = url;
        if (warehouse != null && !warehouse.isEmpty()) {
            if (connectionUrl.contains("?")) {
                connectionUrl += "&warehouse=" + warehouse;
            } else {
                connectionUrl += "?warehouse=" + warehouse;
            }
        }

        dataSource.setJdbcUrl(connectionUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName("net.snowflake.client.jdbc.SnowflakeDriver");

        return dataSource;
    }

    @Bean(name = "snowflakeJdbcTemplate")
    public JdbcTemplate snowflakeJdbcTemplate(@Qualifier("snowflakeDataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}

