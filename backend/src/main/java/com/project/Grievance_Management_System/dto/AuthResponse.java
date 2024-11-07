package com.project.Grievance_Management_System.dto;
import com.project.Grievance_Management_System.entity.Users.Role;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data

public class AuthResponse {
    private String token;
    private long id;
    private String username;
    private Role role;
}
