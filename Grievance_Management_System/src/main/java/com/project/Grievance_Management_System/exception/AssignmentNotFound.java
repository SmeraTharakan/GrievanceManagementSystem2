package com.project.Grievance_Management_System.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AssignmentNotFound extends RuntimeException{

    public AssignmentNotFound(String message) {
        super(message);
    }

    
}