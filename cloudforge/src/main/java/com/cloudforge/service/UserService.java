package com.cloudforge.service;

import com.cloudforge.dto.UserProfileResponse;

public interface UserService {

    UserProfileResponse getCurrentUser(String email);

}