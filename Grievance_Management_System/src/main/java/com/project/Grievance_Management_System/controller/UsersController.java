package com.project.Grievance_Management_System.controller;

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

import java.util.List;

@RestController
@RequestMapping("/api/users")

public class UsersController {

    public final UsersService usersService;

    public UsersController(UsersService usersService){
        this.usersService=usersService;
    }

    @GetMapping ("")
    public List <Users> getUsers(){
        return usersService.getUsers();
    }

    @GetMapping ("/{id}")
    public Users getUserById(@PathVariable Long id){
        return usersService.getUserById(id);
    }

    @GetMapping ("/username/{username}")
    public List <Users> getUserByName(@PathVariable String username){
        return usersService.getUserByName(username);
    }

    @GetMapping ("/role/{role}")
    public List <Users> getUserByRole(@PathVariable Role role){
        return usersService.getUserByRole(role);
    }

    @GetMapping ("/email/{email}")
    public Users getUserByEmail(@PathVariable String email){
        return usersService.getUserByEmail(email);
    }

    @PostMapping ("/create")
    public Users creatUsers(@RequestBody Users user){
        return usersService.createUser(user);
    }

    @PutMapping ("/update")
    public Users updateUsers(@RequestBody Users user){
        return usersService.updateUser(user);
    }

    @DeleteMapping ("/delete/{id}")
    public Users deleteUsers (@PathVariable Long id){
        return usersService.deleteUser(id);
    }


    
}
