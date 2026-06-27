package com.cloudforge.service;

import com.cloudforge.dto.AnalysisResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    AnalysisResponse uploadFile(MultipartFile file) throws IOException;

}