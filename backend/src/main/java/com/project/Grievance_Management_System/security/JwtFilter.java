package com.project.Grievance_Management_System.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.context.ApplicationContext;

import com.project.Grievance_Management_System.service.JwtService;
import com.project.Grievance_Management_System.service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter{


    @Autowired
    private JwtService jwtService;

    @Autowired
    ApplicationContext context;

    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String authHeader =request.getHeader("Authorization");
        String token =null;
        String email=null;

        if (authHeader!= null && authHeader.startsWith("Bearer ")){
            token= authHeader.substring(7);
            email =jwtService.extractUserName(token);

        }

        if (email!= null && SecurityContextHolder.getContext().getAuthentication() == null){

            UserDetails userDetails =context.getBean(MyUserDetailsService.class).loadUserByUsername(email);
            if (jwtService.validateToken(token, userDetails)){

                UsernamePasswordAuthenticationToken authToken =new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

            }
        }
        filterChain.doFilter(request, response);
    }
    
}
