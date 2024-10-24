package com.project.Grievance_Management_System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.Grievance_Management_System.dto.LoginDto;
import com.project.Grievance_Management_System.dto.UserDto;
import com.project.Grievance_Management_System.entity.Users;
import com.project.Grievance_Management_System.repository.UsersRepository;
import com.project.Grievance_Management_System.entity.Users.Role;
import com.project.Grievance_Management_System.converter.UDtoConverter;

import java.util.List;
import java.util.Optional;

import com.project.Grievance_Management_System.exception.*;


@Service
public class UsersService {
    
    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private UDtoConverter converter; 

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);



    public ResponseEntity<List<UserDto>> getUserByName(String username){
        List <UserDto> userDtoList= converter.userToDto(usersRepository.findByUsername(username));
        return ResponseEntity.ok(userDtoList);
    }

    public ResponseEntity<List<UserDto>> getUserByRole(Role role){    
        List <UserDto> userDtoList= converter.userToDto(usersRepository.findByRole(role));
        return ResponseEntity.ok(userDtoList);
    }

    public ResponseEntity<UserDto> getUserByEmail(String email){
        Users user=usersRepository.findByEmail(email).orElseThrow(() -> new UserNotFound("User not found with email: " + email));
        UserDto userDto = converter.userToDto(user);
        return ResponseEntity.ok(userDto);
    }

    public ResponseEntity<UserDto> getUserById(Long id){
        Users user=usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found with id: " + id));
        UserDto userDto = converter.userToDto(user);
        return ResponseEntity.ok(userDto);
    }

    public ResponseEntity<List<UserDto>> getUsers(){    
        List <UserDto> userDtoList= converter.userToDto(usersRepository.findAll());
        return ResponseEntity.ok(userDtoList);
    }

    public ResponseEntity<String> createUser(UserDto userDto){
        if (usersRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new UserExists("User already exists with email: " + userDto.getEmail());
        }
        Role roleUser = Role.USER;
        Users newUser = new Users();
        newUser.setUsername(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());  
        newUser.setPassword(encoder.encode(userDto.getPassword()));
        newUser.setRole(roleUser);
        usersRepository.save(newUser);
        return ResponseEntity.ok("User Created successfully");
    }

    public ResponseEntity<String> createEmployee(UserDto userDto){
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
        usersRepository.save(newUser);
        return ResponseEntity.ok("Employee Created successfully");
    }

    public ResponseEntity<String> updateUsername(Long id,String username){
        
        Users User = usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        User.setUsername(username);
        usersRepository.save(User);
        return ResponseEntity.ok("Username updated successfully");
      
    }

    public ResponseEntity<String> updateUserpassword(Long id,String password){
        
        Users User = usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        User.setPassword(encoder.encode(password));
        usersRepository.save(User);
        return ResponseEntity.ok("Password updated successfully");
      
    }

    public ResponseEntity<String> updateRole(Long id,Role role){
        
        Users User = usersRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
        User.setRole(role);
        usersRepository.save(User);
        return ResponseEntity.ok("Role updated successfully");
      
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

    public String loginUser (@RequestBody LoginDto loginDto){
        Authentication authentication = authenticationManager.authenticate (new UsernamePasswordAuthenticationToken(loginDto.getEmail(),loginDto.getPassword()));
        //SecurityContextHolder.getContext().setAuthentication(authentication);
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loginDto.getEmail());
        } else {
            return "fail";
        }
    }


}
