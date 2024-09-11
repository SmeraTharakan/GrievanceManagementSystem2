package com.project.Grievance_Management_System.repository;

import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance,Long>{

    public List<Grievance> findByUser(Users user);
    public List<Grievance> findByCategory(String category);
    public List<Grievance> findByStatus(String status);
    public Optional<Grievance> findById(Long id);
    
}
