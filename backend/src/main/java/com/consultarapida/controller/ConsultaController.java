package com.consultarapida.controller;

import com.consultarapida.dto.ConsultaResponse;
import com.consultarapida.service.ConsultaService;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping("/{protocolo}")
    public ResponseEntity<ConsultaResponse> consultar(
            @Pattern(regexp = "^[A-Za-z0-9-]+$", message = "Protocolo inválido")
            @Size(min = 3, max = 50, message = "Protocolo inválido")
            @PathVariable String protocolo) {
        ConsultaResponse response = consultaService.consultar(protocolo);
        return ResponseEntity.ok(response);
    }
}
