package com.example.cloudbalance.cloudbalance_backend.services;

import com.example.cloudbalance.cloudbalance_backend.dto.aws.AsgDTO;
import com.example.cloudbalance.cloudbalance_backend.dto.aws.Ec2DTO;
import com.example.cloudbalance.cloudbalance_backend.dto.aws.RdsDTO;
import com.example.cloudbalance.cloudbalance_backend.repositories.AccountRepository;
import com.example.cloudbalance.cloudbalance_backend.utils.aws.AwsRoleAssumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.autoscaling.AutoScalingClient;
import software.amazon.awssdk.services.autoscaling.model.DescribeAutoScalingGroupsResponse;
import software.amazon.awssdk.services.ec2.Ec2Client;
import software.amazon.awssdk.services.ec2.model.DescribeInstancesResponse;
import software.amazon.awssdk.services.ec2.model.Instance;
import software.amazon.awssdk.services.ec2.model.Tag;
import software.amazon.awssdk.services.rds.RdsClient;
import software.amazon.awssdk.services.rds.model.DescribeDbInstancesResponse;

import java.util.List;

@Service
public class AwsResourceService {

    @Value("${aws.region}")
    private String awsRegion;

    @Autowired
    private AwsRoleAssumer roleAssumer;

    @Autowired
    private AccountRepository accountRepository;

    public List<Ec2DTO> fetchEC2Instances(String accountId) {
        String arn = getArnFromAccountId(accountId);
        AwsCredentialsProvider credentials = roleAssumer.createCredentials(arn);

        Ec2Client ec2Client = Ec2Client.builder()
                .credentialsProvider(credentials)
                .region(Region.US_EAST_1) // Use the region you need
                .build();

        DescribeInstancesResponse response = ec2Client.describeInstances();

        List<Instance> instances = response.reservations().stream()
                .flatMap(res -> res.instances().stream())
                .toList();

        return instances.stream().map(instance -> new Ec2DTO(
                instance.instanceId(),
                instance.tags().stream().filter(tag -> "Name".equals(tag.key())).map(Tag::value).findFirst().orElse("N/A"),
                awsRegion,
                instance.state().nameAsString()
        )).toList();
    }

    public List<RdsDTO> fetchRDSInstances(String accountId) {
        String arn = getArnFromAccountId(accountId);
        AwsCredentialsProvider credentials = roleAssumer.createCredentials(arn);
        System.out.println(credentials.toString());
        RdsClient rdsClient = RdsClient.builder()
                .credentialsProvider(credentials)
                .region(Region.US_EAST_1)
                .build();

        DescribeDbInstancesResponse response = rdsClient.describeDBInstances();
        return response.dbInstances().stream().map(db -> new RdsDTO(
                db.dbInstanceArn(),
                db.dbInstanceIdentifier(),
                db.engine(),
                awsRegion,
                db.dbInstanceStatus()
        )).toList();
    }

    public List<AsgDTO> fetchASGInstances(String accountId) {
        String arn = getArnFromAccountId(accountId);
        AwsCredentialsProvider credentials = roleAssumer.createCredentials(arn);

        AutoScalingClient asgClient = AutoScalingClient.builder()
                .credentialsProvider(credentials)
                .region(Region.US_EAST_1)
                .build();

        DescribeAutoScalingGroupsResponse response = asgClient.describeAutoScalingGroups();

        return response.autoScalingGroups().stream().map(asg -> new AsgDTO(
                asg.autoScalingGroupARN(),
                asg.autoScalingGroupName(),
                awsRegion,
                asg.desiredCapacity(),
                asg.minSize(),
                asg.maxSize(),
                asg.status()
        )).toList();
    }

    private String getArnFromAccountId(String accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"))
                .getArn();
    }
}
