package com.consultarapida.client;

import com.consultarapida.config.Api2FeignConfig;
import com.consultarapida.dto.Api2Request;
import com.consultarapida.dto.Api2Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "api2", url = "${api.consulta2.base-url}", configuration = Api2FeignConfig.class)
public interface Api2Client {

    @PostMapping("/ConsultarCPF")
    Api2Response consultar(@RequestBody Api2Request request);
}
