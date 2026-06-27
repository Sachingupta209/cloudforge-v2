package com.cloudforge.analyzer.docker.rules;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HealthCheckRule implements DockerRule {

    @Override
    public RuleResult check(List<String> lines) {

        for (String line : lines) {

            String current = line.trim().toUpperCase();

            if (current.startsWith("HEALTHCHECK")) {
                return null;
            }
        }

        return new RuleResult(
                "Consider adding HEALTHCHECK.",
                "Add a HEALTHCHECK instruction to monitor container health.",
                10
        );
    }
}