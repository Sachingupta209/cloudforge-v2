package com.cloudforge.analyzer.docker.rules;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RootUserRule implements DockerRule {

    @Override
    public RuleResult check(List<String> lines) {

        for (String line : lines) {

            String current = line.trim().toUpperCase();

            if (current.equals("USER ROOT")) {

                return new RuleResult(
                        "Running as root is insecure.",
                        "Create and use a non-root user inside the container.",
                        20
                );
            }
        }

        return null;
    }
}