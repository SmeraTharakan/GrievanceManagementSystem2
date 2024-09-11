package com.project.Grievance_Management_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.repository.UsersRepository;
import com.project.Grievance_Management_System.entity.Users.Role;

import java.util.List;
import java.util.Optional;


@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;

    public List <Users> getUserByName(String username){
        return usersRepository.findByUsername(username);
    }

    public List <Users> getUserByRole(Role role){
        return usersRepository.findByRole(role);
    }

    public Users getUserByEmail(String email){
        return usersRepository.findByEmail(email);
    }

    public Users getUserById(Long id){
        Optional<Users> user = usersRepository.findById(id);
        if (user.isEmpty()) {
            throw new RuntimeException("User with id " + id + " not found");
        }
        return user.get();
    }

    public List <Users> getUsers(){
        return usersRepository.findAll();
    }

    public Users createUser(Users user){
        return usersRepository.save(user);
    }

    public Users updateUser(Users user){
        return usersRepository.save(user);
    }

    public Users deleteUser(Long id){
        Optional <Users> user=usersRepository.findById(id) ;
        if (user.isPresent()){
            usersRepository.deleteById(id);
            return user.get();
        }
        else{
            throw new RuntimeException("User not found with id: " + id);
        }
    }



}
