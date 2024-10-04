package com.project.Grievance_Management_System.dto;

import lombok.Data;

@Data
public class AssignmentDto {
    private long assignmentId; 
    private long grievanceId;
    private long supervisorId; 
    private long assigneeId;    
}