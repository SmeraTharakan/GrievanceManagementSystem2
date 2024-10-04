package com.project.Grievance_Management_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Grievance_Management_System.dto.UserDto;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.repository.UsersRepository;
import com.project.Grievance_Management_System.entity.Users.Role;

import java.util.List;
import java.util.Optional;

import com.project.Grievance_Management_System.exception.*;


@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);



    public List <Users> getUserByName(String username){
        return usersRepository.findByUsername(username);
    }

    public List <Users> getUserByRole(Role role){
        return usersRepository.findByRole(role);
    }

    public Users getUserByEmail(String email){
        return usersRepository.findByEmail(email)
        .orElseThrow(() -> new UserNotFound("User not found with email: " + email));
    }

    public Users getUserById(Long id){
        return usersRepository.findById(id)
        .orElseThrow(() -> new UserNotFound("User not found with id: " + id));
    }

    public List <Users> getUsers(){
        return usersRepository.findAll();
    }

    public Users createUser(UserDto userDto){
        if (usersRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserExists("User already exists with email: " + userDto.getEmail());
        }
        Role roleUser = Role.USER;
        Users newUser = new Users();
        newUser.setUsername(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());  
        newUser.setPassword(encoder.encode(userDto.getPassword()));
        newUser.setRole(roleUser);
        return usersRepository.save(newUser);
    }

    public Users createEmployee(UserDto userDto){
        if (usersRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserExists("User already exists with email: " + userDto.getEmail());
        }
        Role roleAdmin = Role.ADMIN;
        if (userDto.getRole().equals(roleAdmin)) {
            throw new RuntimeException("User not allowed to create user with role: " + userDto.getRole());
        }
        Users newUser = new Users();
        newUser.setUsername(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());  
        newUser.setPassword(encoder.encode(userDto.getPassword()));
        newUser.setRole(userDto.getRole());
        return usersRepository.save(newUser);
    }

    public Users updateUser(Long id,UserDto userDto){
        
        Users User = usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        User.setUsername(userDto.getUsername());
        User.setEmail(userDto.getEmail());  
        User.setPassword(encoder.encode(userDto.getPassword()));
        User.setRole(userDto.getRole());
        return usersRepository.save(User);
      
    }

    public ResponseEntity<String> deleteUser(Long id){
        Optional <Users> user=usersRepository.findById(id) ;
        
        if (user.isPresent()){
            usersRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        }
        
        else{
            throw new UserNotFound("User not found with id: " + id);
        }
    }



}
