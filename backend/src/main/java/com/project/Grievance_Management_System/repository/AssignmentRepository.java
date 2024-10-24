package com.project.Grievance_Management_System.repository;

import com.project.Grievance_Management_System.entity.Assignment;
import com.project.Grievance_Management_System.entity.Grievance;
import com.project.Grievance_Management_System.entity.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment,Long>{

    public List<Assignment> findByGrievance(Grievance grievance);
    public List<Assignment> findByAssignedBy(Users user);
    public List<Assignment> findByAssignedTo(Users user);
    
}
