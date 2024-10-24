package com.project.Grievance_Management_System.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.project.Grievance_Management_System.dto.AssignmentDto;
import com.project.Grievance_Management_System.entity.Assignment;

@Component
public class ADtoConverter {
    public AssignmentDto AToDto (Assignment assignment){
        AssignmentDto assignmentDto = new AssignmentDto(assignment.getId(), assignment.getGrievance().getId(), assignment.getAssignedBy().getId(), assignment.getAssignedTo().getId());
        return assignmentDto;
    }

    public List<AssignmentDto> AToDto (List <Assignment> assignment){
        return assignment.stream().map(x -> AToDto(x)).collect(Collectors.toList());
    }
    
}
