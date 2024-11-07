package com.project.Grievance_Management_System.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthRequest {
    private String email;
    private String password;

}