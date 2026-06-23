package com.consultarapida.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;

@Configuration
public class FeignConfig {

    private final String username;
    private final String password;

    public FeignConfig(@Value("${api.consulta.username}") String username,
                       @Value("${api.consulta.password}") String password) {
        this.username = username;
        this.password = password;
    }

    @Bean
    public feign.RequestInterceptor basicAuthRequestInterceptor() {
        String auth = username + ":" + password;
        String encodedAuth = Base64.getEncoder().encodeToString(auth.getBytes());
        return requestTemplate -> requestTemplate.header("Authorization", "Basic " + encodedAuth);
    }
}
