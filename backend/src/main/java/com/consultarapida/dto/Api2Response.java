package com.consultarapida.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Api2Response {

    @JsonProperty("RetornoConsultada")
    private List<RetornoConsultada> retornoConsultada;

    public List<RetornoConsultada> getRetornoConsultada() {
        return retornoConsultada;
    }

    public void setRetornoConsultada(List<RetornoConsultada> retornoConsultada) {
        this.retornoConsultada = retornoConsultada;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class RetornoConsultada {

        @JsonProperty("ListaCin")
        private List<CinItem> listaCin;

        public List<CinItem> getListaCin() {
            return listaCin;
        }

        public void setListaCin(List<CinItem> listaCin) {
            this.listaCin = listaCin;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class CinItem {

        @JsonProperty("IndConsBiografica")
        private int indConsBiografica;

        @JsonProperty("IndConsBiometrica")
        private int indConsBiometrica;

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
}
