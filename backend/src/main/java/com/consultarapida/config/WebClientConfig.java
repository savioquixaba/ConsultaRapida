package com.consultarapida.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Base64;

@Configuration
public class WebClientConfig {

    @Value("${api.consulta.username}")
    private String username;

    @Value("${api.consulta.password}")
    private String password;

    @Bean
    public WebClient consultaWebClient() {
        String auth = username + ":" + password;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());

        return WebClient.builder()
                .defaultHeader("Authorization", "Basic " + encodedAuth)
                .build();
    }
}
