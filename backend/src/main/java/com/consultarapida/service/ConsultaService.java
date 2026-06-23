package com.consultarapida.service;

import com.consultarapida.client.Api1Client;
import com.consultarapida.client.Api2Client;
import com.consultarapida.dto.Api1Response;
import com.consultarapida.dto.Api2Request;
import com.consultarapida.dto.Api2Response;
import com.consultarapida.dto.ConsultaResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ConsultaService {

    private static final Logger log = LoggerFactory.getLogger(ConsultaService.class);

    private final Api1Client api1Client;
    private final Api2Client api2Client;
    private final String cpfUsuario;

    public ConsultaService(Api1Client api1Client, Api2Client api2Client,
                           @Value("${api.consulta2.cpf-usuario}") String cpfUsuario) {
        this.api1Client = api1Client;
        this.api2Client = api2Client;
        this.cpfUsuario = cpfUsuario;
    }

    public ConsultaResponse consultar(String protocolo) {
        Api1Response api1Response = api1Client.consultar(protocolo);

        if (api1Response == null) {
            throw new RuntimeException("Resposta vazia da API externa para o protocolo: " + protocolo);
        }

        String cpf = api1Response.getNrCpf();

        int indConsBiografica = 0;
        int indConsBiometrica = 0;

        try {
            Api2Request api2Request = new Api2Request(cpfUsuario, cpf);
            Api2Response api2Response = api2Client.consultar(api2Request);
            if (api2Response != null) {
                indConsBiografica = api2Response.getIndConsBiografica();
                indConsBiometrica = api2Response.getIndConsBiometrica();
            }
        } catch (Exception e) {
            log.warn("API 2 indisponível para o CPF {}: {}", cpf, e.getMessage());
        }

        return new ConsultaResponse(
                protocolo,
                cpf,
                api1Response.isPendenciaRFB(),
                api1Response.getDescricaoPendencia(),
                indConsBiografica,
                indConsBiometrica
        );
    }
}
