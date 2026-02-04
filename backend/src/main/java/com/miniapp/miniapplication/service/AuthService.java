package com.miniapp.miniapplication.service;

import com.miniapp.miniapplication.entity.User;
import com.miniapp.miniapplication.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) { // [cite: 129]
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash())); // [cite: 131]
        return userRepository.save(user);
    }

    public boolean authenticateUser(String email, String password) { // [cite: 124]
        return userRepository.findByEmail(email)
                .map(user -> passwordEncoder.matches(password, user.getPasswordHash())) // [cite: 132]
                .orElse(false);
    }
}