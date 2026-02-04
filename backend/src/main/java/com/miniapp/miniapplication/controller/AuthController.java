package com.miniapp.miniapplication.controller;

import com.miniapp.miniapplication.entity.User;
import com.miniapp.miniapplication.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register") // [cite: 126]
    public User register(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login") // [cite: 127]
    public String login(@RequestParam String email, @RequestParam String password) {
        if(authService.authenticateUser(email, password)) {
            return "Login Successful";
        }
        return "Invalid Credentials";
    }

    @PostMapping("/logout") // [cite: 128]
    public String logout() {
        return "Logout Successful";
    }
}