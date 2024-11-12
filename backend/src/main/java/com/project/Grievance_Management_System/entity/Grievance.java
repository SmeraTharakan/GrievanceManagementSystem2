package com.project.Grievance_Management_System.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="grievance")

public class Grievance {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name="users_id" ,nullable = true, foreignKey = @ForeignKey(name = "fk_user_grievance"))
    private Users user;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String status;

    @JsonIgnore
    @OneToMany(mappedBy = "grievance", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Assignment> assignments;

    @Column(updatable=false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
        this.status="Grievance submitted";
    }

    
}
