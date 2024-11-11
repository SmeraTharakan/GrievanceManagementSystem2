package com.project.Grievance_Management_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Grievance_Management_System.converter.GDtoConverter;
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

    @Autowired
    private GDtoConverter converter;

    public GrievanceService(GrievanceRepository grievanceRepository, UsersRepository usersRepository){
        this.usersRepository=usersRepository;
        this.grievanceRepository=grievanceRepository;
    }

    public ResponseEntity<List<GrievanceDto>> getGrievances(){   
        List <GrievanceDto> grievanceDtoList= converter.GToDto(grievanceRepository.findAll());
        return ResponseEntity.ok(grievanceDtoList);
    }
    
    public ResponseEntity<GrievanceDto> getGrievanceById(Long id){
        Grievance grievance= grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found with id: " + id));
        GrievanceDto grievanceDto = converter.GToDto(grievance);
        return ResponseEntity.ok(grievanceDto);
    }

    public ResponseEntity<List<GrievanceDto>> getGrievancesByCategory(String category){
        List <GrievanceDto> grievanceDtoList= converter.GToDto(grievanceRepository.findByCategory(category));
        return ResponseEntity.ok(grievanceDtoList);   
    }

    public ResponseEntity<List<GrievanceDto>> getGrievancesByStatus(String status){
        List <GrievanceDto> grievanceDtoList= converter.GToDto(grievanceRepository.findByStatus(status));
        return ResponseEntity.ok(grievanceDtoList);
    }

    public ResponseEntity<List<GrievanceDto>> getGrievancesByUser(long id){
        Users user=usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        List <GrievanceDto> grievanceDtoList= converter.GToDto(grievanceRepository.findByUser(user));
        return ResponseEntity.ok(grievanceDtoList);
    }

    public ResponseEntity <String> createGrievance(GrievanceDto grievanceDto){
        try {
            Users user = usersRepository.findById(grievanceDto.getUserId()).orElseThrow(() -> new UserNotFound("User not found"));
            Grievance newGrievance = new Grievance();
            newGrievance.setTitle(grievanceDto.getTitle());
            newGrievance.setDescription(grievanceDto.getDescription());
            newGrievance.setCategory(null);
            newGrievance.setStatus(grievanceDto.getStatus());
            newGrievance.setUser(user);
            grievanceRepository.save(newGrievance);
            return ResponseEntity.ok("Grievance created successfully");

        } catch (UserNotFound e){
            throw new UserNotFound("User with id" + grievanceDto.getUserId() +"Not Found");
        }
        
    }

    public ResponseEntity <String> updateGrievanceDetails(Long id,GrievanceDto grievanceDto){
            Grievance Grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            Grievance.setTitle(grievanceDto.getTitle());
            Grievance.setDescription(grievanceDto.getDescription());
            grievanceRepository.save(Grievance);
            return ResponseEntity.ok("Grievance title updated successfully");
    }

    public ResponseEntity <String> updateGrievanceCategory(Long id, String category){
        try {
            Grievance grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            grievance.setCategory(category);
            grievanceRepository.save(grievance);
            return ResponseEntity.ok("Grievance category updated successfully");

        } catch (GrievanceNotFound e){
            throw new GrievanceNotFound("Grievance with id" + id +"Not Found");
        }
    }

    public ResponseEntity <String> updateGrievanceStatus(Long id, String status){
        try {
            Grievance grievance = grievanceRepository.findById(id).orElseThrow(() -> new GrievanceNotFound("Grievance not found"));
            grievance.setStatus(status);
            grievanceRepository.save(grievance);
            return ResponseEntity.ok("Grievance status updated successfully");

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
