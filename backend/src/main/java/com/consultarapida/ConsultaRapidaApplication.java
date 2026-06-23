package com.consultarapida;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ConsultaRapidaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsultaRapidaApplication.class, args);
    }
}
