package com.consultarapida.service;

import com.consultarapida.client.Api1Client;
import com.consultarapida.dto.Api1Response;
import com.consultarapida.dto.ConsultaResponse;
import org.springframework.stereotype.Service;

@Service
public class ConsultaService {

    private final Api1Client api1Client;

    public ConsultaService(Api1Client api1Client) {
        this.api1Client = api1Client;
    }

    public ConsultaResponse consultar(String protocolo) {
        Api1Response api1Response = api1Client.consultar(protocolo);

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
