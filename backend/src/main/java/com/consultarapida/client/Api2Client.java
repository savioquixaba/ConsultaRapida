package com.consultarapida.client;

import com.consultarapida.dto.Api2Request;
import com.consultarapida.dto.Api2Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "api2", url = "${api.consulta2.url}")
public interface Api2Client {

    @PostMapping
    Api2Response consultar(@RequestBody Api2Request request);
}
