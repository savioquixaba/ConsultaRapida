package com.consultarapida.dto;

public class ConsultaResponse {

    private String protocolo;
    private String nrCpf;
    private boolean pendenciaRFB;
    private String descricaoPendencia;
    private int indConsBiografica;
    private int indConsBiometrica;

    public ConsultaResponse() {}

    public ConsultaResponse(String protocolo, String nrCpf, boolean pendenciaRFB, String descricaoPendencia,
                            int indConsBiografica, int indConsBiometrica) {
        this.protocolo = protocolo;
        this.nrCpf = nrCpf;
        this.pendenciaRFB = pendenciaRFB;
        this.descricaoPendencia = descricaoPendencia;
        this.indConsBiografica = indConsBiografica;
        this.indConsBiometrica = indConsBiometrica;
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

    public int getIndConsBiografica() {
        return indConsBiografica;
    }

    public void setIndConsBiografica(int indConsBiografica) {
        this.indConsBiografica = indConsBiografica;
    }

    public int getIndConsBiometrica() {
        return indConsBiometrica;
    }

    public void setIndConsBiometrica(int indConsBiometrica) {
        this.indConsBiometrica = indConsBiometrica;
    }
}
