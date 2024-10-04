package com.project.Grievance_Management_System.dto;

import lombok.Data;
import com.project.Grievance_Management_System.entity.Users.Role;

@Data
public class UserDto {
    private String username;
    private String password;
    private String email;
    private Role role;

    public UserDto(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
