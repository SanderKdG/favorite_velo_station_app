package com.example.VeloLiker.model.citybik;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
public class Station{
    public int empty_slots;
    public Extra extra;
    public int free_bikes;
    public String id;
    public double latitude;
    public double longitude;
    public String name;
    public LocalDateTime timestamp;
}
