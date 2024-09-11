package com.project.Grievance_Management_System.repository;

import com.project.Grievance_Management_System.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import com.project.Grievance_Management_System.entity.Users.Role;



@Repository
public interface UsersRepository extends JpaRepository<Users,Long>{

    public Users findByEmail(String email);
    public List<Users> findByUsername(String username);
    public List<Users> findByRole(Role role);
    public Optional<Users> findById(Long id);

    
}
