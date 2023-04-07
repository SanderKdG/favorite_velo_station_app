package com.example.VeloLiker.repositories;

import com.example.VeloLiker.model.FavoriteStation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteStationRepository extends JpaRepository<FavoriteStation, Integer> {
    List<FavoriteStation> findByUserId(int userId);
    Optional<FavoriteStation> findByStationIdAndUserId(String stationId, int userId);
}
