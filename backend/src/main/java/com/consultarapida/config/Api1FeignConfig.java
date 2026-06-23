package com.consultarapida.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.util.Base64;

public class Api1FeignConfig {

    @Bean
    public feign.RequestInterceptor api1AuthInterceptor(
            @Value("${api.consulta.username}") String username,
            @Value("${api.consulta.password}") String password) {
        String auth = username + ":" + password;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
        return requestTemplate -> requestTemplate.header("Authorization", "Basic " + encodedAuth);
    }
}

