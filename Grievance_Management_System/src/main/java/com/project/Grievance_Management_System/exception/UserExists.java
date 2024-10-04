package com.project.Grievance_Management_System.exception;

public class UserExists extends RuntimeException {

    public UserExists(String message) {
        super(message);
    }

    public UserExists() {
        super();
    }
}