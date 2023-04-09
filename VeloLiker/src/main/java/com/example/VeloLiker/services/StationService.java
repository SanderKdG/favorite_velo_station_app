package com.example.VeloLiker.services;

import com.example.VeloLiker.model.citybik.Station;
import com.example.VeloLiker.model.FavoriteStation;
import com.example.VeloLiker.repositories.FavoriteStationRepository;
import com.example.VeloLiker.repositories.UserRepository;
import com.example.VeloLiker.util.StationRestClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class StationService {
    private final FavoriteStationRepository favoriteStationRepository;
    private final StationRestClient stationRestClient;
    private final UserRepository userRepository;

    public StationService(FavoriteStationRepository favoriteStationRepository, StationRestClient stationRestClient,
                          UserRepository userRepository) {
        this.favoriteStationRepository = favoriteStationRepository;
        this.stationRestClient = stationRestClient;
        this.userRepository = userRepository;
    }

    public FavoriteStation addFavorite(String stationId, int userId) {
        var user = userRepository.findById(userId);
        if(user.isEmpty()) throw new IllegalArgumentException("User not found");
        var response = favoriteStationRepository.findByStationIdAndUserId(stationId, userId);
        return response.orElseGet(() -> favoriteStationRepository.save(new FavoriteStation(stationId, user.get())));
    }

    public void removeFavorite(String stationId, int userId) {
        var response = favoriteStationRepository.findByStationIdAndUserId(stationId, userId);
        if(response.isEmpty()) return;
        favoriteStationRepository.delete(response.get());
    }

    public List<FavoriteStation> getFavorites(int userId) {
        return favoriteStationRepository.findByUserId(userId);
    }

    public List<Station> getStations() {
        var response = stationRestClient.getStations();
        var body = response.getBody();
        if(body == null || body.getNetwork() == null) {
            log.warn("Stations API returned null");
            log.warn("Http code: "+response.getStatusCode());
            return new ArrayList<>();
        }
        return body.getNetwork().stations;
    }
}
