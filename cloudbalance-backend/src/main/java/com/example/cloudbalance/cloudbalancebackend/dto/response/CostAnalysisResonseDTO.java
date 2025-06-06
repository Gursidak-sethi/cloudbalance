package com.example.cloudbalance.cloudbalancebackend.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CostAnalysisResonseDTO {

        private String linkedAccountId;
        private Integer myCloudStartDay;
        private Integer myCloudStartMonth;
        private Integer myCloudStartYear;

        private String lineItemOperation;
        private String lineItemUsageType;
        private String myCloudInstanceType;
        private String myCloudOperatingSystem;

        private String myCloudPricingType;
        private String myCloudRegionName;

        private ZonedDateTime usageStartDate;

        private String productDatabaseEngine;
        private String productProductName;

        private Double lineItemUnblendedCost;
        private Double lineItemUsageAmount;

        private String myCloudCostExplorerUsageGroupType;
        private String pricingUnit;
        private String chargeType;

        private String availabilityZone;
        private String tenancy;
    }