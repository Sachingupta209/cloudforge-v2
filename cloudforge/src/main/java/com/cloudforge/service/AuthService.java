package com.cloudforge.service;

import com.cloudforge.dto.ApiResponse;
import com.cloudforge.dto.LoginRequest;
import com.cloudforge.dto.LoginResponse;
import com.cloudforge.dto.RegisterRequest;

public interface AuthService {

    ApiResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}