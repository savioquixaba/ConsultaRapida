package com.consultarapida.dto;

public class Api2Request {

    private String cpfUsuario;
    private String listadecpf;

    public Api2Request() {}

    public Api2Request(String cpfUsuario, String listadecpf) {
        this.cpfUsuario = cpfUsuario;
        this.listadecpf = listadecpf;
    }

    public String getCpfUsuario() {
        return cpfUsuario;
    }

    public void setCpfUsuario(String cpfUsuario) {
        this.cpfUsuario = cpfUsuario;
    }

    public String getListadecpf() {
        return listadecpf;
    }

    public void setListadecpf(String listadecpf) {
        this.listadecpf = listadecpf;
    }
}
