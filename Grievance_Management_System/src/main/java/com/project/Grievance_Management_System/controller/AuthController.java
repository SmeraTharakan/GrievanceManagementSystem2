package com.project.Grievance_Management_System.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public String loginUser (@RequestBody LoginDto loginDto){
        return usersService.loginUser(loginDto);
    }


}
