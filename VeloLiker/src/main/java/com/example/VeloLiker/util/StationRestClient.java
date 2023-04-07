package com.example.VeloLiker.util;

import com.example.VeloLiker.model.citybik.Network;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;

@Component
@FeignClient(value = "StationRestClient", url = "https://api.citybik.es/v2")
public interface StationRestClient {
    @PostMapping("/networks/velo-antwerpen?fields=stations")
    ResponseEntity<Network> getStations();
}
