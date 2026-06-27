package com.cloudforge.analyzer.docker.rules;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RuleResult {

    private String warning;

    private String recommendation;

    private int penalty;

}