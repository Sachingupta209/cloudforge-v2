package com.cloudforge.analyzer.docker.rules;

import java.util.List;

public interface DockerRule {

    RuleResult check(List<String> lines);

}