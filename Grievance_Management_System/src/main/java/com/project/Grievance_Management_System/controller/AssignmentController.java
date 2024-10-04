package com.project.Grievance_Management_System.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Grievance_Management_System.entity.Assignment;
import com.project.Grievance_Management_System.dto.AssignmentDto;
import com.project.Grievance_Management_System.service.AssignmentService;
import java.util.List;

@RestController
@RequestMapping ("/api/assignments")
public class AssignmentController {

    public final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService){
        this.assignmentService=assignmentService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("")
    public List <Assignment> getAssignment(){
        return assignmentService.getAssignment();
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id){
        return assignmentService.getAssignmentById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("/grievance/{id}")
    public List <Assignment> getAssignmentByGrievance(@PathVariable Long id){
        return assignmentService.getByGrievance(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    @GetMapping ("/assignedby/{id}")
    public List <Assignment> getAssignmentByAssignedBy(@PathVariable Long id){
        return assignmentService.getByAssignedBy(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    @GetMapping ("/assignedto/{id}")
    public List <Assignment> getAssignmentByAssignedTo(@PathVariable Long id){
        return assignmentService.getByAssignedTo(id);
    }
    
    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @PostMapping ("/create")
    public Assignment createAssignment(@RequestBody AssignmentDto assignmentDto){
        return assignmentService.createAssignment(assignmentDto);
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @PutMapping ("/update/{id}")
    public Assignment updateAssignment(@PathVariable Long id ,@RequestBody AssignmentDto assignmentDto){
        return assignmentService.updateAssignment(id,assignmentDto);
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity <String> deleteAssignment (@PathVariable Long id){
        return assignmentService.deleteAssignment(id);
    }
    
}
