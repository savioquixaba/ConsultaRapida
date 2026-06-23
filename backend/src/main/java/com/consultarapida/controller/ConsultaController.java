package com.consultarapida.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @GetMapping("/{protocolo}")
    public ResponseEntity<Map<String, Object>> consultar(@PathVariable String protocolo) {
        return ResponseEntity.ok(Map.of(
                "protocolo", protocolo,
                "mensagem", "Endpoint pronto. Serviço de integração será implementado no próximo passo."
        ));
    }
}
