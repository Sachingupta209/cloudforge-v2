package com.cloudforge.report;

import com.cloudforge.dto.AnalysisResponse;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public interface ReportService {

    ByteArrayInputStream generatePdfReport(
            AnalysisResponse analysisResponse
    ) throws IOException;

}