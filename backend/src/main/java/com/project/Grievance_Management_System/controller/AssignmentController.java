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

import com.project.Grievance_Management_System.dto.AssignmentDto;
import com.project.Grievance_Management_System.exception.AssignmentNotFound;
import com.project.Grievance_Management_System.service.AssignmentService;
import java.util.List;

@RestController
@RequestMapping ("/api/assignments")
public class AssignmentController {

    public final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService){
        this.assignmentService=assignmentService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    @GetMapping ("")
    public ResponseEntity<List<AssignmentDto>> getAssignment(){
        return assignmentService.getAssignment();
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("/{id}")
    public ResponseEntity<AssignmentDto> getAssignmentById(@PathVariable Long id){
        return assignmentService.getAssignmentById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("/grievance/{id}")
    public ResponseEntity<AssignmentDto> getAssignmentByGrievance(@PathVariable Long id){
        return assignmentService.getByGrievance(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR')")
    @GetMapping ("/assignedby/{id}")
    public ResponseEntity<List<AssignmentDto>> getAssignmentByAssignedBy(@PathVariable Long id){
        return assignmentService.getByAssignedBy(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping ("/assignedto/{id}")
    public ResponseEntity<List<AssignmentDto>> getAssignmentByAssignedTo(@PathVariable Long id){
        return assignmentService.getByAssignedTo(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPERVISOR','ASSIGNEE')")
    @GetMapping("/test-assignment-not-found")
    public void testAssignmentNotFound() {
        throw new AssignmentNotFound("Assignment not found test");
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @PostMapping ("/create")
    public ResponseEntity<String> createAssignment(@RequestBody AssignmentDto assignmentDto){
        return assignmentService.createAssignment(assignmentDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping ("/updateSupervisor/{id}")
    public ResponseEntity<String> updateSupervisor(@PathVariable Long id ,@RequestBody Long supervisorId){
        return assignmentService.updateAssignedBy(id,supervisorId);
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @PutMapping ("/updateAssignee/{id}")
    public ResponseEntity<String> updateAssignee(@PathVariable Long id ,@RequestBody Long assigneeId){
        return assignmentService.updateAssignedTo(id,assigneeId);
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @DeleteMapping ("/delete/{id}")
    public ResponseEntity <String> deleteAssignment (@PathVariable Long id){
        return assignmentService.deleteAssignment(id);
    }
    
}
