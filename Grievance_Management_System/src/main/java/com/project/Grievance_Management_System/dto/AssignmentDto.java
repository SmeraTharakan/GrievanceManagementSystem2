package com.project.Grievance_Management_System.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AssignmentDto {
    private long assignmentId; 
    private long grievanceId;
    private long supervisorId; 
    private long assigneeId;    
}