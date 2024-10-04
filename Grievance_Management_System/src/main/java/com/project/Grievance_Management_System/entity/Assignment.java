package com.project.Grievance_Management_System.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="assignment")

public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="grievance_id", nullable=false)
    private Grievance  grievance;

    @ManyToOne
    @JoinColumn(name="assigned_by_id", nullable=true)
    private Users assignedBy;

    @ManyToOne
    @JoinColumn(name="assigned_to_id", nullable=true)
    private Users assignedTo;

    private String status;

    @Column(updatable =false)
    private LocalDateTime assignedAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate(){
        this.assignedAt=LocalDateTime.now();
        this.updatedAt=LocalDateTime.now();
        this.status="Grievance assigned";
    }

    @PreUpdate
    protected void onUpdate(){
        this.updatedAt=LocalDateTime.now();
        this.status="Grievance assignment updated";
    }
   
}
