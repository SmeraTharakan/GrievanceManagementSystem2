package com.project.Grievance_Management_System.controller;

import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.service.GrievanceService;
import java.util.List;

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

    @GetMapping ("")
    public List <Grievance> getGrievances(){
        return grievanceService.getGrievances();
    }

    @GetMapping ("/grievance/{id}")
    public Grievance getGrievanceById(@PathVariable Long id){
        return grievanceService.getGrievanceById(id);
    }

    @GetMapping ("/category/{category}")
    public List <Grievance> getGrievanceByCategory(@PathVariable String category){
        return grievanceService.getGrievancesByCategory(category);
    }

    @GetMapping ("/status/{status}")
    public List <Grievance> getGrievanceByStatus(@PathVariable String status){
        return grievanceService.getGrievancesByStatus(status);
    }

    @GetMapping ("/user/{id}")
    public List <Grievance> getGrievanceByUser(@PathVariable Long id){
        return grievanceService.getGrievancesByUser(id);
    }

    @PostMapping ("/create")
    public Grievance createGrievance(@RequestBody Grievance grievance){
        return grievanceService.createGrievance(grievance);
    }

    @PutMapping ("/update")
    public Grievance updateGrievance(@RequestBody Grievance grievance){
        return grievanceService.updateGrievance(grievance);
    }

    @DeleteMapping ("/delete/{id}")
    public Grievance deletGrievance(@PathVariable Long id){
        return grievanceService.deleteGrievance(id);
    }


    
    
}
