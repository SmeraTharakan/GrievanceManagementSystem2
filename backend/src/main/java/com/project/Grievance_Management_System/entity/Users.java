package com.project.Grievance_Management_System.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users")

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;
    
    @Column(updatable=false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt=LocalDateTime.now();
    }

    @JsonIgnore
    @OneToMany(mappedBy = "assignedTo", cascade = CascadeType.ALL)
    private List<Assignment> assignedtoGrievances;

    @JsonIgnore
    @OneToMany(mappedBy = "assignedBy", cascade = CascadeType.ALL)
    private List<Assignment> assignedbyGrievances;

    @PreRemove
    private void preRemove() {
        if (assignedtoGrievances != null) {
            assignedtoGrievances.forEach(assignment -> assignment.setAssignedTo(null));
        }
        if (assignedbyGrievances != null) {
            assignedbyGrievances.forEach(assignment -> assignment.setAssignedBy(null));
        }
    }

    public enum Role{
        USER, ASSIGNEE, SUPERVISOR, ADMIN
    }

}
