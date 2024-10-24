package com.project.Grievance_Management_System.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GrievanceNotFound extends RuntimeException{

    public GrievanceNotFound(String message) {
        super(message);
    }

    
}
