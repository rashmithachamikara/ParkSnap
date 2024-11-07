package com.example.parking.controller;

import com.example.parking.dto.LoginRequest;
import com.example.parking.entity.User;
import com.example.parking.repo.UserRepo;
import com.example.parking.security.CustomUserDetails;
import com.example.parking.security.CustomUserDetailsService;
import com.example.parking.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil,
                          CustomUserDetailsService userDetailsService, UserRepo userRepo,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate JWT using UserDetails
        String jwt = jwtUtil.generateToken((CustomUserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(jwt);
    }

    // Fetch logged-in user details
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Create a response containing userId, username, and role
        return ResponseEntity.ok(
                new Object() {
                    public final int userId = userDetails.getUserId();
                    public final String username = userDetails.getUsername();
                    public final String role = userDetails.getAuthorities().iterator().next().getAuthority();
                }
        );
    }

    // Logout Endpoint (invalidate the JWT or clear the security context)
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext(); // Clears the authentication information
        return ResponseEntity.ok("Successfully logged out!");
    }
}
