package com.cloudforge.service;

import com.cloudforge.analyzer.docker.DockerfileAnalyzer;
import com.cloudforge.dto.AnalysisResponse;
import com.cloudforge.entity.AnalysisHistory;
import com.cloudforge.repository.AnalysisHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
public class FileServiceImpl implements FileService {

    private static final String UPLOAD_DIR = "uploads";

    private final DockerfileAnalyzer dockerfileAnalyzer;
    private final AnalysisHistoryRepository analysisHistoryRepository;

    public FileServiceImpl(
            DockerfileAnalyzer dockerfileAnalyzer,
            AnalysisHistoryRepository analysisHistoryRepository) {

        this.dockerfileAnalyzer = dockerfileAnalyzer;
        this.analysisHistoryRepository = analysisHistoryRepository;
    }

    @Override
    public AnalysisResponse uploadFile(MultipartFile file)
            throws IOException {

        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(file.getOriginalFilename());

        Files.copy(
                file.getInputStream(),
                filePath,
                java.nio.file.StandardCopyOption.REPLACE_EXISTING
        );

        // Analyze Dockerfile
        AnalysisResponse response = dockerfileAnalyzer.analyze(filePath);

        // Save analysis history
        AnalysisHistory history = AnalysisHistory.builder()
                .fileName(response.getFileName())
                .score(response.getScore())
                .grade(response.getGrade())
                .warnings(response.getWarnings())
                .recommendations(response.getRecommendations())
                .createdAt(LocalDateTime.now())
                .build();

        analysisHistoryRepository.save(history);

        return response;
    }
}