package com.project.Grievance_Management_System.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class GrievanceDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String status;
    private Long userId;

}