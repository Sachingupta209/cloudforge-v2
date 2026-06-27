package com.cloudforge.report;

import com.cloudforge.dto.AnalysisResponse;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfReportService implements ReportService {

    @Override
    public ByteArrayInputStream generatePdfReport(
            AnalysisResponse analysisResponse)
            throws IOException {

        Document document = new Document();

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, out);

        document.open();

        document.add(new Paragraph("CloudForge Analysis Report"));
        document.add(new Paragraph(" "));
        document.add(new Paragraph(
                "File Name: " + analysisResponse.getFileName()));
        document.add(new Paragraph(
                "Score: " + analysisResponse.getScore()));
        document.add(new Paragraph(
                "Grade: " + analysisResponse.getGrade()));

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Warnings:"));

        for (String warning : analysisResponse.getWarnings()) {
            document.add(new Paragraph("- " + warning));
        }

        document.add(new Paragraph(" "));
        document.add(new Paragraph("Recommendations:"));

        for (String recommendation
                : analysisResponse.getRecommendations()) {

            document.add(new Paragraph("- " + recommendation));
        }

        document.close();

        return new ByteArrayInputStream(out.toByteArray());
    }
}