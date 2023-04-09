package com.example.VeloLiker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteStation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false)
    private String stationId;
    @Column(nullable = false)
    private int userId;

    public FavoriteStation(String stationId, int userId) {
        this.stationId = stationId;
        this.userId = userId;
    }
}
