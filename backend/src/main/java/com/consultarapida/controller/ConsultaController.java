package com.consultarapida.controller;

import com.consultarapida.dto.ConsultaResponse;
import com.consultarapida.service.ConsultaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping("/{protocolo}")
    public ResponseEntity<ConsultaResponse> consultar(@PathVariable String protocolo) {
        ConsultaResponse response = consultaService.consultar(protocolo);
        return ResponseEntity.ok(response);
    }
}
