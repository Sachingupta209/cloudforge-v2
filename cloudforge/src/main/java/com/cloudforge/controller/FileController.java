package com.cloudforge.controller;

import com.cloudforge.dto.AnalysisResponse;
import com.cloudforge.dto.UploadResponse;
import com.cloudforge.service.FileService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }
    @PostMapping("/upload")
    public AnalysisResponse uploadFile(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        return fileService.uploadFile(file);

    }
}