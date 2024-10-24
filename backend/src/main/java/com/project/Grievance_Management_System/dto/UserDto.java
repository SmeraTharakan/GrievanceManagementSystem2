package com.project.Grievance_Management_System.dto;

import lombok.Data;
import com.project.Grievance_Management_System.entity.Users.Role;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Role role;

    public UserDto(Long id,String username, String email, String password, Role role) {
        this.id=id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
