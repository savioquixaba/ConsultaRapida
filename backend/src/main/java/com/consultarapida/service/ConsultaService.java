package com.consultarapida.service;

import com.consultarapida.dto.Api1Response;
import com.consultarapida.dto.ConsultaResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class ConsultaService {

    private final WebClient webClient;
    private final String apiUrl;

    public ConsultaService(WebClient consultaWebClient,
                           @Value("${api.consulta.url}") String apiUrl) {
        this.webClient = consultaWebClient;
        this.apiUrl = apiUrl;
    }

    public ConsultaResponse consultar(String protocolo) {
        Api1Response api1Response = webClient.get()
                .uri(apiUrl + "?NumeroProtocolo={protocolo}", protocolo)
                .retrieve()
                .bodyToMono(Api1Response.class)
                .block();

        if (api1Response == null) {
            throw new RuntimeException("Resposta vazia da API externa para o protocolo: " + protocolo);
        }

        return new ConsultaResponse(
                protocolo,
                api1Response.getNrCpf(),
                api1Response.isPendenciaRFB(),
                api1Response.getDescricaoPendencia()
        );
    }
}
