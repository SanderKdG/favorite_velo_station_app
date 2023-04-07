package com.example.VeloLiker.controllers;

import com.example.VeloLiker.dto.LikeInfo;
import com.example.VeloLiker.dto.StationDto;
import com.example.VeloLiker.model.FavoriteStation;
import com.example.VeloLiker.services.StationService;
import com.example.VeloLiker.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/station")
public class StationController {
    private final StationService stationService;
    private final UserService userService;

    public StationController(StationService stationService, UserService userService) {
        this.stationService = stationService;
        this.userService = userService;
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<StationDto>> Get(@RequestHeader("Authorization") String userToken) {
        var user = userService.getUserFromToken(userToken);
        var favorites = stationService.getFavorites(user.getId());
        var stations = stationService.getStations();
        return ResponseEntity.ok(
                stations.stream()
                        .map(station -> new StationDto(station, favorites.stream()
                                .anyMatch(favorite -> favorite.getStationId().equals(station.id))
                        )).toList()
        );
    }

    @PostMapping("/favorites/add")
    public ResponseEntity<FavoriteStation> Add(@RequestBody LikeInfo dto, @RequestHeader("Authorization") String userToken) {
        var user = userService.getUserFromToken(userToken);
        return ResponseEntity.ok(stationService.addFavorite(dto.stationId(), user.getId()));
    }

    @DeleteMapping("/favorites/{stationId}")
    public ResponseEntity<Boolean> Remove(@PathVariable String stationId, @RequestHeader("Authorization") String userToken) {
        var user = userService.getUserFromToken(userToken);
        stationService.removeFavorite(stationId, user.getId());
        return ResponseEntity.ok(true);
    }
}
