package com.project.Grievance_Management_System.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.project.Grievance_Management_System.entity.*;
import com.project.Grievance_Management_System.exception.AssignmentNotFound;
import com.project.Grievance_Management_System.exception.GrievanceNotFound;
import com.project.Grievance_Management_System.exception.UserNotFound;
import com.project.Grievance_Management_System.repository.AssignmentRepository;
import com.project.Grievance_Management_System.repository.GrievanceRepository;
import com.project.Grievance_Management_System.repository.UsersRepository;
import com.project.Grievance_Management_System.converter.ADtoConverter;
import com.project.Grievance_Management_System.dto.AssignmentDto;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final GrievanceRepository grievanceRepository;
    private final UsersRepository usersRepository;
    private final ADtoConverter converter;

    public AssignmentService(AssignmentRepository assignmentRepository,GrievanceRepository grievanceRepository, UsersRepository usersRepository,ADtoConverter converter) {
        this.assignmentRepository = assignmentRepository;
        this.grievanceRepository = grievanceRepository;
        this.usersRepository = usersRepository;
        this.converter=converter;
    }

    public ResponseEntity<List<AssignmentDto>> getAssignment(){
        List <AssignmentDto> assignmentDtoList = converter.AToDto(assignmentRepository.findAll());
        return ResponseEntity.ok(assignmentDtoList);
    }

    public ResponseEntity<AssignmentDto> getAssignmentById(Long id){
        Assignment assignment=assignmentRepository.findById(id).orElse(null);
        if (assignment == null) {
            throw new AssignmentNotFound("Assignment not found for ID: " + id);
        }
        AssignmentDto assignmentDto=converter.AToDto(assignment);
        return ResponseEntity.ok(assignmentDto);  
    }

    public ResponseEntity<AssignmentDto> getByGrievance(Long id){
        Grievance grievance= grievanceRepository.findById(id).orElse(null);
        if (grievance == null) {
            throw new GrievanceNotFound("Grievance not found for ID : " +id);
        }
        Assignment assignment = assignmentRepository.findByGrievance(grievance).orElse(null);
        if (assignment == null) {
            throw new AssignmentNotFound("Assignment not found for ID :" + id);
        }
        AssignmentDto assignmentDto = converter.AToDto(assignment);
        return ResponseEntity.ok(assignmentDto);
    }

    public ResponseEntity<List<AssignmentDto>> getByAssignedBy(Long id){
        Users user= usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        List <AssignmentDto> assignmentDtoList = converter.AToDto(assignmentRepository.findByAssignedBy(user));
        return ResponseEntity.ok(assignmentDtoList);
    }

    public ResponseEntity<List<AssignmentDto>> getByAssignedTo(Long id){
        Users user= usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        List <AssignmentDto> assignmentDtoList = converter.AToDto(assignmentRepository.findByAssignedTo(user));
        return ResponseEntity.ok(assignmentDtoList);
    }

    public ResponseEntity<String> createAssignment(AssignmentDto assignmentDto){
        
        Users supervisor = usersRepository.findById(assignmentDto.getSupervisorId()).orElseThrow(() -> new RuntimeException("Supervisor not found"));
        Users assignee = usersRepository.findById(assignmentDto.getAssigneeId()).orElseThrow(() -> new RuntimeException("Assignee not found"));
        Grievance grievance = grievanceRepository.findById(assignmentDto.getGrievanceId()).orElseThrow(() -> new RuntimeException("Grievance not found"));
        Assignment newAssignment = new Assignment();
        newAssignment.setGrievance(grievance);
        newAssignment.setAssignedBy(supervisor);
        newAssignment.setAssignedTo(assignee);
        assignmentRepository.save(newAssignment);
        return ResponseEntity.ok("Assignment created successfully");

    }

    public ResponseEntity<String> updateAssignedBy(Long id,Long supervisorId){
        Assignment Assignment = assignmentRepository.findById(id).orElseThrow(() -> new AssignmentNotFound("Assignment not found"));
        Assignment.setAssignedBy(usersRepository.findById(supervisorId).orElseThrow(() -> new RuntimeException("Supervisor not found")));
        assignmentRepository.save(Assignment);
        return ResponseEntity.ok("Assignment Supervisor updated successfully");
    }

    public ResponseEntity<String> updateAssignedTo(Long id,Long assigneeId){
        Assignment Assignment = assignmentRepository.findById(id).orElseThrow(() -> new AssignmentNotFound("Assignment not found"));
        Assignment.setAssignedTo(usersRepository.findById(assigneeId).orElseThrow(() -> new RuntimeException("Assignee not found")));
        assignmentRepository.save(Assignment);
        return ResponseEntity.ok("Assignment Assignee updated successfully");
    }

    public ResponseEntity <String> deleteAssignment(Long id){
        Optional <Assignment> assignment= assignmentRepository.findById(id);
        if (assignment.isPresent()){
            assignmentRepository.deleteById(id);
            return ResponseEntity.ok("Assignment deleted successfully");
        }
        else{
            throw new AssignmentNotFound ("Assignment with id "+id+" not found");
        }
    }
    
}
