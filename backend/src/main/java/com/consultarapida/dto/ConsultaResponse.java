package com.consultarapida.dto;

public class ConsultaResponse {

    private String protocolo;
    private String nrCpf;
    private boolean pendenciaRFB;
    private String descricaoPendencia;

    public ConsultaResponse() {}

    public ConsultaResponse(String protocolo, String nrCpf, boolean pendenciaRFB, String descricaoPendencia) {
        this.protocolo = protocolo;
        this.nrCpf = nrCpf;
        this.pendenciaRFB = pendenciaRFB;
        this.descricaoPendencia = descricaoPendencia;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

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
