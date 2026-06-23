package com.consultarapida.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Api1Response {

    private String nrCpf;
    private boolean pendenciaRFB;
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
