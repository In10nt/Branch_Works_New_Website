package com.branchworks.comingsoon.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        try {
            // Check if careers table exists and has the old schema
            String checkColumnSql = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS " +
                    "WHERE TABLE_NAME = 'CAREERS' AND COLUMN_NAME = 'TYPE'";
            
            Integer oldColumnExists = jdbcTemplate.queryForObject(checkColumnSql, Integer.class);
            
            if (oldColumnExists != null && oldColumnExists > 0) {
                System.out.println("Detected old career schema. Migrating...");
                
                // Drop the old table and let Hibernate recreate it
                jdbcTemplate.execute("DROP TABLE IF EXISTS careers");
                
                System.out.println("Old careers table dropped. Hibernate will recreate it with the new schema.");
            }
        } catch (Exception e) {
            System.err.println("Error during database initialization: " + e.getMessage());
            // Don't fail the application startup
        }
    }
}
