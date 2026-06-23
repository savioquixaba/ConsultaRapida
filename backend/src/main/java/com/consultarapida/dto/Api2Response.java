package com.consultarapida.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Api2Response {

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
