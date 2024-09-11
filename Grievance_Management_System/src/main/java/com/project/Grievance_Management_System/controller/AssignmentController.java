package com.project.Grievance_Management_System.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Grievance_Management_System.entity.Assignment;
import com.project.Grievance_Management_System.service.AssignmentService;
import java.util.List;

@RestController
@RequestMapping ("/api/assignments")
public class AssignmentController {

    public final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService){
        this.assignmentService=assignmentService;
    }

    @GetMapping ("")
    public List <Assignment> getAssignment(){
        return assignmentService.getAssignment();
    }

    @GetMapping ("/{id}")
    public Assignment getAssignmentById(@PathVariable Long id){
        return assignmentService.getAssignmentById(id);
    }

    @GetMapping ("/grievance/{id}")
    public List <Assignment> getAssignmentByGrievance(@PathVariable Long id){
        return assignmentService.getByGrievance(id);
    }

    @GetMapping ("/assignedby/{id}")
    public List <Assignment> getAssignmentByAssignedBy(@PathVariable Long id){
        return assignmentService.getByAssignedBy(id);
    }

    @GetMapping ("/assignedto/{id}")
    public List <Assignment> getAssignmentByAssignedTo(@PathVariable Long id){
        return assignmentService.getByAssignedTo(id);
    }
    
    @PostMapping ("/create")
    public Assignment creatAssignment(@RequestBody Assignment Assignment){
        return assignmentService.createAssignment(Assignment);
    }

    @PutMapping ("/update")
    public Assignment updateAssignment(@RequestBody Assignment Assignment){
        return assignmentService.updateAssignment(Assignment);
    }

    @DeleteMapping ("/delete/{id}")
    public Assignment deleteAssignment (@PathVariable Long id){
        return assignmentService.deleteAssignment(id);
    }
    
}
