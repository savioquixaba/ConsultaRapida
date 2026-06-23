package com.consultarapida.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Api1Response {

    @JsonProperty("NrCpf")
    private String nrCpf;

    @JsonProperty("PendenciaRFB")
    private boolean pendenciaRFB;

    @JsonProperty("DescricaoPendencia")
    private String descricaoPendencia;

    public String getNrCpf() {
        return nrCpf;
    }

    public void setNrCpf(String nrCpf) {
        this.nrCpf = nrCpf;
    }

    public boolean isPendenciaRFB() {
        return pendenciaRFB;
    }

    public void setPendenciaRFB(boolean pendenciaRFB) {
        this.pendenciaRFB = pendenciaRFB;
    }

    public String getDescricaoPendencia() {
        return descricaoPendencia;
    }

    public void setDescricaoPendencia(String descricaoPendencia) {
        this.descricaoPendencia = descricaoPendencia;
    }
}
