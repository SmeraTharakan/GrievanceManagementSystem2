package com.project.Grievance_Management_System.service;

import org.springframework.stereotype.Service;
import com.project.Grievance_Management_System.entity.*;
import com.project.Grievance_Management_System.repository.AssignmentRepository;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final GrievanceService grievanceService;
    private final UsersService usersService;

    public AssignmentService(AssignmentRepository assignmentRepository,GrievanceService grievanceService, UsersService usersService) {
        this.assignmentRepository = assignmentRepository;
        this.grievanceService = grievanceService;
        this.usersService = usersService;
    }

    public List <Assignment> getAssignment(){
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Long id){
        Optional <Assignment> assignment=assignmentRepository.findById(id);
        if (assignment.isEmpty()){
            throw new RuntimeException("Assignment with id"+id+"not found");
        }
        return assignment.get();
    }

    public List <Assignment> getByGrievance(Long id){
        Grievance grievance= grievanceService.getGrievanceById(id);
        return assignmentRepository.findByGrievance(grievance);
    }

    public List <Assignment> getByAssignedBy(Long id){
        Users user= usersService.getUserById(id);
        return assignmentRepository.findByAssignedBy(user);
    }

    public List <Assignment> getByAssignedTo(Long id){
        Users user= usersService.getUserById(id);
        return assignmentRepository.findByAssignedTo(user);
    }

    public Assignment createAssignment(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Assignment assignment){
        return assignmentRepository.save(assignment);
    }

    public Assignment deleteAssignment(Long id){
        Optional <Assignment> assignment= assignmentRepository.findById(id);
        if (assignment.isPresent()){
            assignmentRepository.deleteById(id);
            return assignment.get();
        }
        else{
            throw new RuntimeException ("Assignment with id "+id+" not found");
        }
    }
    
}
