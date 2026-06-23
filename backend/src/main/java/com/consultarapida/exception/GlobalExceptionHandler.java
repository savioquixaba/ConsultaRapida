package com.consultarapida.exception;

import feign.FeignException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleValidationError(ConstraintViolationException ex) {
        return ResponseEntity.badRequest().body(Map.of(
                "erro", "Protocolo inválido"
        ));
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<Map<String, Object>> handleFeignError(FeignException ex) {
        return ResponseEntity.status(ex.status() != -1 ? ex.status() : 502).body(Map.of(
                "erro", "Erro na comunicação com o serviço externo"
        ));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleGenericError(RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "erro", "Erro interno no servidor"
        ));
    }
}
