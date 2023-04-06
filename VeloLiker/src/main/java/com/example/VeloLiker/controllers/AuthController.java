package com.example.VeloLiker.controllers;

import com.example.VeloLiker.dto.LoginInfo;
import com.example.VeloLiker.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login(LoginInfo dto) {
        log.info("trying to login");
        var response = userService.login(dto.email(), dto.password());
        return response
                .map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }
}
