package com.project.Grievance_Management_System.converter;

import com.project.Grievance_Management_System.dto.GrievanceDto;
import com.project.Grievance_Management_System.entity.Grievance;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class GDtoConverter {
    public GrievanceDto GToDto (Grievance grievance){
        GrievanceDto grievanceDto = new GrievanceDto(grievance.getId(), grievance.getTitle(), grievance.getDescription(), grievance.getCategory(),grievance.getStatus(),grievance.getUser().getId());
        return grievanceDto;
    }

    public List<GrievanceDto> GToDto (List <Grievance> grievance){
        return grievance.stream().map(x -> GToDto(x)).collect(Collectors.toList());
    }
    
}
