package com.cloudforge.controller;

import com.cloudforge.entity.AnalysisHistory;
import com.cloudforge.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public List<AnalysisHistory> getAllHistory() {
        return historyService.getAllHistory();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnalysisHistory> getHistoryById(
            @PathVariable Long id
    ) {

        AnalysisHistory history = historyService.getHistoryById(id);

        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistory(
            @PathVariable Long id
    ) {

        historyService.deleteHistory(id);

        return ResponseEntity.noContent().build();
    }
}