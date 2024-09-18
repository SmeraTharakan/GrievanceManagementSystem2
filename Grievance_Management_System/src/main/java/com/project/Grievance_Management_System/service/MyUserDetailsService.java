package com.project.Grievance_Management_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.Grievance_Management_System.repository.UsersRepository;
import com.project.Grievance_Management_System.entity.UserPrincipal;
import com.project.Grievance_Management_System.entity.Users;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        Users user = usersRepository.findByEmail(email);
        if (user==null){
            throw new UsernameNotFoundException("User not found");
        }
        return new UserPrincipal(user);
    }
    
}
