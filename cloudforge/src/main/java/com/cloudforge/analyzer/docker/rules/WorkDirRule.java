package com.cloudforge.analyzer.docker.rules;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WorkDirRule implements DockerRule {

    @Override
    public RuleResult check(List<String> lines) {

        for (String line : lines) {

            String current = line.trim().toUpperCase();

            if (current.startsWith("WORKDIR")) {
                return null;
            }
        }

        return new RuleResult(
                "Consider adding WORKDIR.",
                "Specify a WORKDIR instead of relying on the default directory.",
                10
        );
    }
}