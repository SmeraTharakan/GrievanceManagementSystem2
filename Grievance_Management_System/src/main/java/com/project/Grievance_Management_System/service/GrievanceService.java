package com.project.Grievance_Management_System.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Grievance_Management_System.dto.GrievanceDto;
import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.exception.GrievanceNotFound;
import com.project.Grievance_Management_System.exception.UserNotFound;
import com.project.Grievance_Management_System.repository.GrievanceRepository;
import com.project.Grievance_Management_System.repository.UsersRepository;
import java.util.List;
import java.util.Optional;


@Service
public class GrievanceService {

    private final GrievanceRepository grievanceRepository;
    private final UsersRepository usersRepository;

    public GrievanceService(GrievanceRepository grievanceRepository, UsersRepository usersRepository){
        this.usersRepository=usersRepository;
        this.grievanceRepository=grievanceRepository;
    }

    public List <Grievance> getGrievances(){
        return grievanceRepository.findAll();
    }
    
    public Grievance getGrievanceById(Long id){
        Optional <Grievance> grievance= grievanceRepository.findById(id);
        if(grievance.isEmpty()){
            throw new GrievanceNotFound("Grievance with id"+id +"not found");
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
        Users user=usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        return grievanceRepository.findByUser(user);
    }

    public Grievance createGrievance(GrievanceDto grievanceDto){
        try {
            Users user = usersRepository.findById(grievanceDto.getUserId()).orElseThrow(() -> new UserNotFound("User not found"));
            Grievance newGrievance = new Grievance();
            newGrievance.setTitle(grievanceDto.getTitle());
            newGrievance.setDescription(grievanceDto.getDescription());
            newGrievance.setCategory(grievanceDto.getCategory());
            newGrievance.setStatus(grievanceDto.getStatus());
            newGrievance.setUser(user);
            return grievanceRepository.save(newGrievance);

        } catch (UserNotFound e){
            throw new UserNotFound("User with id" + grievanceDto.getUserId() +"Not Found");
        }
        
    }

    public Grievance updateGrievance(Long id,GrievanceDto grievanceDto){
        try {
            Grievance Grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            Users user = usersRepository.findById(grievanceDto.getUserId()).orElseThrow(() -> new UserNotFound("User not found"));
            Grievance.setTitle(grievanceDto.getTitle());
            Grievance.setDescription(grievanceDto.getDescription());
            Grievance.setCategory(grievanceDto.getCategory());
            Grievance.setStatus(grievanceDto.getStatus());
            Grievance.setUser(user);
            return grievanceRepository.save(Grievance);

        } catch (UserNotFound e){
            throw new UserNotFound("User with id" + grievanceDto.getUserId() +"Not Found");
        }
    }

    public Grievance updateGrievanceCategory(Long id, String category){
        try {
            Grievance grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            grievance.setCategory(category);
            return grievanceRepository.save(grievance);

        } catch (GrievanceNotFound e){
            throw new GrievanceNotFound("Grievance with id" + id +"Not Found");
        }
    }

    public Grievance updateGrievanceStatus(Long id, String status){
        try {
            Grievance grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            grievance.setStatus(status);
            return grievanceRepository.save(grievance);

        } catch (GrievanceNotFound e){
            throw new GrievanceNotFound("Grievance with id" + id +"Not Found");
        }
    }

    public ResponseEntity <String> deleteGrievance(Long id){
        Optional <Grievance> grievance= grievanceRepository.findById(id);
        if(grievance.isPresent()){
            grievanceRepository.deleteById(id);
            return ResponseEntity.ok("Grievance successfully deleted");
        }
        else{
            throw new RuntimeException("Grievance with id"+id +"not found");
        }
        
    }
}
