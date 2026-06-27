package com.cloudforge.controller;

import com.cloudforge.dto.ApiResponse;
import com.cloudforge.dto.LoginRequest;
import com.cloudforge.dto.LoginResponse;
import com.cloudforge.dto.RegisterRequest;
import com.cloudforge.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ApiResponse register(@Valid @RequestBody RegisterRequest request) {

        return authService.register(request);

    }
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {

        return authService.login(request);

    }
}