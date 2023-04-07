package com.example.VeloLiker.util;

import com.example.VeloLiker.model.citybik.NetworkRoot;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "StationRestClient", url = "https://api.citybik.es/v2")
public interface StationRestClient {
    @GetMapping("networks/velo-antwerpen?fields=stations")
    ResponseEntity<NetworkRoot> getStations();
}
