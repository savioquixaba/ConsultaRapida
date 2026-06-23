package com.consultarapida.client;

import com.consultarapida.dto.Api1Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "api1", url = "${api.consulta.base-url}")
public interface Api1Client {

    @GetMapping("/DadosAtendimento")
    Api1Response consultar(@RequestParam("NumeroProtocolo") String protocolo);
}
