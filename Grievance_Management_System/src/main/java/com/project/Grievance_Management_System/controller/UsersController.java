package com.project.Grievance_Management_System.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.service.UsersService;


import com.project.Grievance_Management_System.entity.Users.Role;
import com.project.Grievance_Management_System.dto.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")

public class UsersController {

    public final UsersService usersService;

    public UsersController(UsersService usersService){
        this.usersService=usersService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("")
    public List <Users> getUsers(){
        return usersService.getUsers();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/{id}")
    public Users getUserById(@PathVariable Long id){
        return usersService.getUserById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/username/{username}")
    public List <Users> getUserByName(@PathVariable String username){
        return usersService.getUserByName(username);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/role/{role}")
    public List <Users> getUserByRole(@PathVariable Role role){
        return usersService.getUserByRole(role);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @GetMapping ("/email/{email}")
    public Users getUserByEmail(@PathVariable String email){
        return usersService.getUserByEmail(email);
    }

    @PostMapping ("/create")
    public Users createUsers(@RequestBody UserDto userDto){
        return usersService.createUser(userDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERVISOR')")
    @PostMapping ("/createEmployee")
    public Users createUserEmployee(@RequestBody UserDto userDto){
        return usersService.createEmployee(userDto);
    }

    @PutMapping ("/update/{id}")
    public Users updateUsers(@PathVariable Long id, @RequestBody UserDto userDto){
        return usersService.updateUser(id,userDto);
    }

    @DeleteMapping ("/delete/{id}")
    public ResponseEntity<String> deleteUsers (@PathVariable Long id){
        return usersService.deleteUser(id);
    }


    
}
