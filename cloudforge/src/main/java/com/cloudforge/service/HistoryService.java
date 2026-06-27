package com.cloudforge.service;

import com.cloudforge.entity.AnalysisHistory;

import java.util.List;

public interface HistoryService {
    AnalysisHistory getHistoryById(Long id);
    List<AnalysisHistory> getAllHistory();

    void deleteHistory(Long id);

}