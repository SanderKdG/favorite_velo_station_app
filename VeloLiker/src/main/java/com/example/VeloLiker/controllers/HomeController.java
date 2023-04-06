package com.example.VeloLiker.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HomeController {
    @GetMapping("/home/get")
    public String home(Principal principal) {
        return "Hello, "+principal.getName();
    }
}
