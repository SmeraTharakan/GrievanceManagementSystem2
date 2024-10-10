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
import com.project.Grievance_Management_System.dto.AssignmentDto;

import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final GrievanceRepository grievanceRepository;
    private final UsersRepository usersRepository;

    public AssignmentService(AssignmentRepository assignmentRepository,GrievanceRepository grievanceRepository, UsersRepository usersRepository) {
        this.assignmentRepository = assignmentRepository;
        this.grievanceRepository = grievanceRepository;
        this.usersRepository = usersRepository;
    }

    public List <Assignment> getAssignment(){
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id){
        Optional <Assignment> assignment=assignmentRepository.findById(id);
        if (assignment.isEmpty()){
            throw new AssignmentNotFound("Assignment with id"+id+"not found");
        }
        return assignment.get();
    }

    public List <Assignment> getByGrievance(Long id){
        Grievance grievance= grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
        return assignmentRepository.findByGrievance(grievance);
    }

    public List <Assignment> getByAssignedBy(Long id){
        Users user= usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        return assignmentRepository.findByAssignedBy(user);
    }

    public List <Assignment> getByAssignedTo(Long id){
        Users user= usersRepository.findById(id).orElseThrow(() -> new UserNotFound("Usernot found"));
        return assignmentRepository.findByAssignedTo(user);
    }

    public Assignment createAssignment(AssignmentDto assignmentDto){
        
        Users supervisor = usersRepository.findById(assignmentDto.getSupervisorId()).orElseThrow(() -> new RuntimeException("Supervisor not found"));
        Users assignee = usersRepository.findById(assignmentDto.getAssigneeId()).orElseThrow(() -> new RuntimeException("Assignee not found"));
        Grievance grievance = grievanceRepository.findById(assignmentDto.getGrievanceId()).orElseThrow(() -> new RuntimeException("Grievance not found"));
        Assignment newAssignment = new Assignment();
        newAssignment.setGrievance(grievance);
        newAssignment.setAssignedBy(supervisor);
        newAssignment.setAssignedTo(assignee);
        return assignmentRepository.save(newAssignment);

    }

    public Assignment updateAssignedBy(Long id,Long supervisorId){
        Assignment Assignment = assignmentRepository.findById(id).orElseThrow(() -> new AssignmentNotFound("Assignment not found"));
        Assignment.setAssignedBy(usersRepository.findById(supervisorId).orElseThrow(() -> new RuntimeException("Supervisor not found")));
        return assignmentRepository.save(Assignment);
    }

    public Assignment updateAssignedTo(Long id,Long assigneeId){
        Assignment Assignment = assignmentRepository.findById(id).orElseThrow(() -> new AssignmentNotFound("Assignment not found"));
        Assignment.setAssignedTo(usersRepository.findById(assigneeId).orElseThrow(() -> new RuntimeException("Assignee not found")));
        return assignmentRepository.save(Assignment);
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
