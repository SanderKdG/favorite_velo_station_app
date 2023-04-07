package com.example.VeloLiker.model.citybik;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class Station {
    public int empty_slots;
    public Extra extra;
    public int free_bikes;
    public String id;
    public double latitude;
    public double longitude;
    public String name;
    public LocalDateTime timestamp;
}
