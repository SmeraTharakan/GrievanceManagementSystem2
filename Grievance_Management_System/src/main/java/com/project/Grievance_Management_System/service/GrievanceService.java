package com.project.Grievance_Management_System.service;

import org.springframework.stereotype.Service;
import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.repository.GrievanceRepository;
import java.util.List;
import java.util.Optional;


@Service
public class GrievanceService {

    private final GrievanceRepository grievanceRepository;
    private final UsersService usersService;

    public GrievanceService(GrievanceRepository grievanceRepository, UsersService usersService){
        this.usersService=usersService;
        this.grievanceRepository=grievanceRepository;
    }

    public List <Grievance> getGrievances(){
        return grievanceRepository.findAll();
    }
    
    public Grievance getGrievanceById(Long id){
        Optional <Grievance> grievance= grievanceRepository.findById(id);
        if(grievance.isEmpty()){
            throw new RuntimeException("Grievance with id"+id +"not found");
        }
        return grievance.get();
    }

    public List <Grievance> getGrievancesByCategory(String category){
        return grievanceRepository.findByCategory(category);
    }

    public List <Grievance> getGrievancesByStatus(String status){
        return grievanceRepository.findByStatus(status);
    }

    public List <Grievance> getGrievancesByUser(long id){
        Users user=usersService.getUserById(id);
        return grievanceRepository.findByUser(user);
    }

    public Grievance createGrievance(Grievance grievance){
        return grievanceRepository.save(grievance);
    }

    public Grievance updateGrievance(Grievance grievance){
        return grievanceRepository.save(grievance);
    }

    public Grievance deleteGrievance(Long id){
        Optional <Grievance> grievance= grievanceRepository.findById(id);
        if(grievance.isPresent()){
            grievanceRepository.deleteById(id);
            return grievance.get();
        }
        else{
            throw new RuntimeException("Grievance with id"+id +"not found");
        }
        
    }
}
