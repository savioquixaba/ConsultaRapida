package com.consultarapida.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.util.Base64;

public class Api2FeignConfig {

    @Bean
    public feign.RequestInterceptor api2AuthInterceptor(
            @Value("${api.consulta2.username}") String username,
            @Value("${api.consulta2.password}") String password) {
        String auth = username + ":" + password;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
        return requestTemplate -> requestTemplate.header("Authorization", "Basic " + encodedAuth);
    }
}
