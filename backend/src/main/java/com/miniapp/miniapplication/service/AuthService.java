package com.miniapp.miniapplication.service;

import com.miniapp.miniapplication.entity.User;
import com.miniapp.miniapplication.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(User user) { // [cite: 129]
        System.out.println("Registering user: " + user.getEmail());
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash())); // [cite: 131]
        User savedUser = userRepository.save(user);
        System.out.println("User saved with ID: " + savedUser.getUserId());
        return savedUser;
    }

    public boolean authenticateUser(String email, String password) { // [cite: 124]
        return userRepository.findByEmail(email)
                .map(user -> passwordEncoder.matches(password, user.getPasswordHash())) // [cite: 132]
                .orElse(false);
    }
}