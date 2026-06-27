package com.cloudforge.analyzer.docker;

import com.cloudforge.analyzer.docker.rules.DockerRule;
import com.cloudforge.analyzer.docker.rules.RuleResult;
import com.cloudforge.dto.AnalysisResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Component
public class DockerfileAnalyzer {

    private final List<DockerRule> rules;

    public DockerfileAnalyzer(List<DockerRule> rules) {
        this.rules = rules;
    }

    public AnalysisResponse analyze(Path filePath) throws IOException {

        List<String> lines = Files.readAllLines(filePath);

        List<String> warnings = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();

        int score = 100;

        for (DockerRule rule : rules) {

            RuleResult result = rule.check(lines);

            if (result != null) {

                warnings.add(result.getWarning());
                recommendations.add(result.getRecommendation());

                score -= result.getPenalty();
            }
        }

        if (score < 0) {
            score = 0;
        }

        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }

        return new AnalysisResponse(
                filePath.getFileName().toString(),
                score,
                grade,
                warnings,
                recommendations
        );
    }
}