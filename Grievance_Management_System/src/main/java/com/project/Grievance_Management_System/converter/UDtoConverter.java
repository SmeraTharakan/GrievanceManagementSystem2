package com.project.Grievance_Management_System.converter;

import org.springframework.stereotype.Component;
import com.project.Grievance_Management_System.dto.UserDto;
import com.project.Grievance_Management_System.entity.Users;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UDtoConverter {
    public UserDto userToDto (Users user){
        UserDto userDto = new UserDto(user.getId(),user.getUsername(), user.getEmail(), user.getPassword(), user.getRole());
        return userDto;
    }

    public List<UserDto> userToDto (List <Users> user){
        return user.stream().map(x -> userToDto(x)).collect(Collectors.toList());
    }
    
}
