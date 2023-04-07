package com.example.VeloLiker.config;

import com.example.VeloLiker.util.StationRestClient;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignAutoConfiguration;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(clients = {StationRestClient.class})
@ImportAutoConfiguration({FeignAutoConfiguration.class})
public class FeignClientConfig {
}
