package com.cloudforge.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {

    private String fileName;

    private int score;

    private String grade;

    private List<String> warnings;

    private List<String> recommendations;
}