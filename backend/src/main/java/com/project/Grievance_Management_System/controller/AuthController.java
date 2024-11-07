package com.project.Grievance_Management_System.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Grievance_Management_System.dto.AuthRequest;
import com.project.Grievance_Management_System.dto.AuthResponse;
import com.project.Grievance_Management_System.dto.UserDto;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.exception.UserNotFound;
import com.project.Grievance_Management_System.service.UsersService;
import com.project.Grievance_Management_System.repository.UsersRepository;


@RestController
@RequestMapping ("/api/auth")
public class AuthController {

    @Autowired
    private UsersService usersService;
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping ("/signup")
    public ResponseEntity<?> createUsers(@RequestBody UserDto userDto){
        usersService.createUser(userDto);
        String token = usersService.loginUser(userDto.getEmail(),userDto.getPassword());  
        if (token != null) {
            Users user=usersRepository.findByEmail(userDto.getEmail()).orElseThrow(() -> new UserNotFound("User not found with email: " + userDto.getEmail()));
            return ResponseEntity.ok(new AuthResponse(token,user.getId(),user.getUsername(),user.getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @PostMapping ("/createEmployee")
    public ResponseEntity<String> createUserEmployee(@RequestBody UserDto userDto){
        return usersService.createEmployee(userDto);
    }

    @PostMapping ("/login")
    public ResponseEntity<?> loginUser (@RequestBody AuthRequest loginDto){
        String token = usersService.loginUser(loginDto.getEmail(),loginDto.getPassword());  
        if (token != null) {
            Users user=usersRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new UserNotFound("User not found with email: " + loginDto.getEmail()));
            return ResponseEntity.ok(new AuthResponse(token,user.getId(),user.getUsername(),user.getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
