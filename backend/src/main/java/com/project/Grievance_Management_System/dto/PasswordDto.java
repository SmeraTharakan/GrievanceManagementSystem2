package com.project.Grievance_Management_System.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PasswordDto {
    private String oldPassword;
    private String newPassword;
}