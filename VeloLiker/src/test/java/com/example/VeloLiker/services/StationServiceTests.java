package com.example.VeloLiker.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.example.VeloLiker.model.FavoriteStation;
import com.example.VeloLiker.model.User;
import com.example.VeloLiker.model.citybik.Network;
import com.example.VeloLiker.model.citybik.NetworkRoot;
import com.example.VeloLiker.model.citybik.Station;
import com.example.VeloLiker.repositories.FavoriteStationRepository;
import com.example.VeloLiker.repositories.UserRepository;
import com.example.VeloLiker.util.StationRestClient;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;

@SpringBootTest
public class StationServiceTests {
  @MockBean
  private FavoriteStationRepository favoriteStationRepository;
  @MockBean
  private StationRestClient stationRestClient;
  @MockBean
  private UserRepository userRepository;
  @Autowired
  private StationService stationService;
  private NetworkRoot networkRoot;

  @BeforeEach
  void prepareNetwork() {
    var stations = new ArrayList<Station>();
    stations.add(new Station(5, null, 7, "001", 51, 4, "001 - Groenplaats", LocalDateTime.now()));
    stations.add(new Station(7, null, 10, "002", 52, 5, "002 - Keyserlei", LocalDateTime.now()));
    stations.add(new Station(0, null, 15, "003", 53, 6, "003 - Grote markt", LocalDateTime.now()));
    var network = new Network(stations);
    networkRoot = new NetworkRoot(network);
  }

  @Test
  void getStations() {
    given(stationRestClient.getStations()).willReturn(ResponseEntity.ok(networkRoot));

    var response = stationService.getStations();
    assertNotNull(response);
    assertEquals(3, response.size());
  }

  @Test
  void addFavorite() {
    var user = new User(1, "sander.ctin@gmail.com", "");
    given(favoriteStationRepository.save(any())).willReturn(new FavoriteStation(1L, "001", user));
    given(userRepository.findById(1)).willReturn(
        Optional.of(user));

    var response = stationService.addFavorite("001", 1);
    assertNotNull(response);
    assertEquals("001", response.getStationId());
    assertEquals(1L, response.getId());
    assertEquals(user.getId(), response.getUser().getId());
  }

  @Test //smoke test
  void removeExistingFavorite() {
    var user = new User(1, "sander.ctin@gmail.com", "");
    var fs = new FavoriteStation(1L, "001", user);
    given(favoriteStationRepository.findByStationIdAndUserId("001", 1)).willReturn(
        Optional.of(fs));

    stationService.removeFavorite("001", 1);
  }

  @Test //smoke test
  void removeNonExistingFavorite() {
    given(favoriteStationRepository.findByStationIdAndUserId("002", 1)).willReturn(
        Optional.empty());

    stationService.removeFavorite("002", 1);
  }
}
