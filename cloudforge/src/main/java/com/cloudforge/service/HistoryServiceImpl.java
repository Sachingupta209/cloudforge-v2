package com.cloudforge.service;

import com.cloudforge.entity.AnalysisHistory;
import com.cloudforge.repository.AnalysisHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final AnalysisHistoryRepository analysisHistoryRepository;

    public HistoryServiceImpl(
            AnalysisHistoryRepository analysisHistoryRepository
    ) {
        this.analysisHistoryRepository = analysisHistoryRepository;
    }

    @Override
    public List<AnalysisHistory> getAllHistory() {

        return analysisHistoryRepository.findAll();

    }

    @Override
    public void deleteHistory(Long id) {

        analysisHistoryRepository.deleteById(id);

    }
    @Override
    public AnalysisHistory getHistoryById(Long id) {

        return analysisHistoryRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Analysis not found"));

    }
}