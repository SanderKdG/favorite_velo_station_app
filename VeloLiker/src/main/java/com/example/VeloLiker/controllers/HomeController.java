package com.example.VeloLiker.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/home/get")
    public String home() {
        return "Hello, JWT";
    }
}
