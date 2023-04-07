package com.example.VeloLiker.model.citybik;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@NoArgsConstructor @AllArgsConstructor
@Getter
@Setter
public class Network {
    public ArrayList<Station> stations;
}
