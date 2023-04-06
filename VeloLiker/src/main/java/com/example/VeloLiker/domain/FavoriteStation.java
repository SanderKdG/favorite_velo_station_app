package com.example.VeloLiker.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class FavoriteStation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false)
    private Long id;
    @Column(nullable = false)
    private String stationId;
    @Column(nullable = false)
    private int userId;
}
