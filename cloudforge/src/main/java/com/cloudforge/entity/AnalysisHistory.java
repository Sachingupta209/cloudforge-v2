package com.cloudforge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalysisHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private Integer score;

    private String grade;

    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "analysis_warnings",
            joinColumns = @JoinColumn(name = "analysis_id")
    )
    @Column(name = "warning")
    private List<String> warnings;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "analysis_recommendations",
            joinColumns = @JoinColumn(name = "analysis_id")
    )
    @Column(name = "recommendation")
    private List<String> recommendations;

}