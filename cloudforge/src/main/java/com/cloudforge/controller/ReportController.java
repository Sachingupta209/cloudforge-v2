package com.cloudforge.controller;

import com.cloudforge.dto.AnalysisResponse;
import com.cloudforge.report.ReportService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/pdf")
    public ResponseEntity<InputStreamResource> generatePdf(
            @RequestBody AnalysisResponse analysisResponse)
            throws IOException {

        InputStreamResource file =
                new InputStreamResource(
                        reportService.generatePdfReport(analysisResponse)
                );

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=CloudForge_Report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(file);
    }
}