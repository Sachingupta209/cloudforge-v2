package com.cloudforge.analyzer.docker.rules;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LatestTagRule implements DockerRule {

    @Override
    public RuleResult check(List<String> lines) {

        for (String line : lines) {

            String current = line.trim().toUpperCase();

            if (current.startsWith("FROM")
                    && current.contains(":LATEST")) {

                return new RuleResult(
                        "Avoid using latest tag.",
                        "Use a fixed version such as ubuntu:24.04.",
                        10
                );
            }
        }

        return null;
    }
}