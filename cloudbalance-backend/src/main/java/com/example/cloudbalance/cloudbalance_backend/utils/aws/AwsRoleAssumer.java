package com.example.cloudbalance.cloudbalance_backend.utils.aws;

import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sts.StsClient;
import software.amazon.awssdk.services.sts.model.AssumeRoleRequest;
import software.amazon.awssdk.services.sts.model.AssumeRoleResponse;
import software.amazon.awssdk.services.sts.model.Credentials;

@Component
public class AwsRoleAssumer {

    public AwsCredentialsProvider createCredentials(String roleArn) {
        StsClient stsClient = StsClient.builder()
                .region(Region.AWS_GLOBAL)
                .build();
        System.out.println("STSCLIENT: " + stsClient);
        AssumeRoleRequest assumeRoleRequest = AssumeRoleRequest.builder()
                .roleArn(roleArn)
                .roleSessionName("cloudbalance-session")
                .build();

        AssumeRoleResponse assumeRoleResponse = stsClient.assumeRole(assumeRoleRequest);
        Credentials tempCredentials = assumeRoleResponse.credentials();

        return StaticCredentialsProvider.create(AwsSessionCredentials.create(
                tempCredentials.accessKeyId(),
                tempCredentials.secretAccessKey(),
                tempCredentials.sessionToken()
        ));
    }
}

