package com.project.Grievance_Management_System.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    private AuthenticationManager authenticationManager;
    private UsersService usersService;
    public AuthController(UsersService usersService,AuthenticationManager authenticationManager){
        this.usersService=usersService;
        this.authenticationManager=authenticationManager;
    }

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
    public ResponseEntity<String> loginUser (@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate (new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed in",HttpStatus.OK);

    }


}
