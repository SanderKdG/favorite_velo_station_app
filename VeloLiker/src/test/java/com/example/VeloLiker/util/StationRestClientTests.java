package com.example.VeloLiker.util;

import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.util.AssertionErrors.assertNotNull;
import static org.springframework.test.util.AssertionErrors.assertTrue;

import java.util.Objects;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class StationRestClientTests {
  @Autowired
  private StationRestClient stationRestClient;

  @Test
  void getStations() {
    var response = stationRestClient.getStations();
    assertEquals("Has thrown error", false ,response.getStatusCode().isError());
    assertEquals("Status code", 200 ,response.getStatusCode().value());
    assertNotNull("Body is not null", response.getBody());
    assertNotNull("Network is not null", Objects.requireNonNull(response.getBody()).getNetwork());
    assertNotNull("Stations is not null", response.getBody().getNetwork().getStations());
    assertTrue("At least 1 station", response.getBody().getNetwork().getStations().size() > 0);
  }
}
