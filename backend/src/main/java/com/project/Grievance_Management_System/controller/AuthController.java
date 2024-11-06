package com.project.Grievance_Management_System.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Grievance_Management_System.dto.LoginDto;
import com.project.Grievance_Management_System.dto.UserDto;
import com.project.Grievance_Management_System.service.UsersService;

@RestController
@RequestMapping ("/api/auth")
public class AuthController {

    @Autowired
    private UsersService usersService;

    @PostMapping ("/signup")
    public ResponseEntity<String> createUsers(@RequestBody UserDto userDto){
        return usersService.createUser(userDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @PostMapping ("/createEmployee")
    public ResponseEntity<String> createUserEmployee(@RequestBody UserDto userDto){
        return usersService.createEmployee(userDto);
    }

    @PostMapping ("/login")
    public ResponseEntity<?> loginUser (@RequestBody LoginDto loginDto){
        String token = usersService.loginUser(loginDto);  
        if (token != null) {
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
