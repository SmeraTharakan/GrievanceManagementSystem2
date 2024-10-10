package com.project.Grievance_Management_System.controller;

import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.service.GrievanceService;
import com.project.Grievance_Management_System.dto.GrievanceDto;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/grievances")
public class GrievanceController {
    public final GrievanceService grievanceService;

    public GrievanceController(GrievanceService grievanceService){
        this.grievanceService=grievanceService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("")
    public List <Grievance> getGrievances(){
        return grievanceService.getGrievances();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/{id}")
    public Grievance getGrievanceById(@PathVariable Long id){
        return grievanceService.getGrievanceById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/category/{category}")
    public List <Grievance> getGrievanceByCategory(@PathVariable String category){
        return grievanceService.getGrievancesByCategory(category);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/status/{status}")
    public List <Grievance> getGrievanceByStatus(@PathVariable String status){
        return grievanceService.getGrievancesByStatus(status);
    }

    @GetMapping ("/user/{id}")
    public List <Grievance> getGrievanceByUser(@PathVariable Long id){
        return grievanceService.getGrievancesByUser(id);
    }

    @PostMapping ("/create")
    public Grievance createGrievance(@RequestBody GrievanceDto grievanceDto){
        return grievanceService.createGrievance(grievanceDto);
    }

    @PutMapping ("/updateTitle/{id}")
    public Grievance updateGrievanceTitle(@PathVariable Long id ,@RequestBody String title){
        return grievanceService.updateGrievanceTitle(id,title);
    }

    @PutMapping ("/updateDescription/{id}")
    public Grievance updateGrievanceDescription(@PathVariable Long id ,@RequestBody String description){
        return grievanceService.updateGrievanceDescription(id,description);
    }

    @PreAuthorize("hasAnyRole('SUPERVISOR')")
    @PutMapping ("/updateCategory/{id}")
    public Grievance updateGrievanceCategory(@PathVariable Long id ,@RequestBody String category){
        return grievanceService.updateGrievanceCategory(id,category);
    }

    @PreAuthorize("hasAnyRole('ASSIGNEE', 'SUPERVISOR')")
    @PutMapping ("/updateStatus/{id}")
    public Grievance updateGrievanceStatus(@PathVariable Long id ,@RequestBody String status){
        return grievanceService.updateGrievanceStatus(id,status);
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity <String> deleteGrievance(@PathVariable Long id){
        return grievanceService.deleteGrievance(id);
    }


    
    
}
