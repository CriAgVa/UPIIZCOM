package com.example.upiizcom;

public class Alumno {
    String  nombre;
    int     boleta;
    String  mail;
    String  token;
    String  carrera;
    boolean estado;

    public Alumno(String nombre, int boleta, String mail, String token, String carrera, boolean estado){
        this.nombre = nombre;
        this.boleta = boleta;
        this.mail = mail;
        this.token = token;
        this.carrera = carrera;
        this.estado = estado;
        //l
    }

    public String getNombre() {
        return nombre;
    }

    public int getBoleta() {
        return boleta;
    }

    public String getCarrera() {
        return carrera;
    }

    public String getMail() {
        return mail;
    }

    public String getToken() {
        return token;
    }

    public boolean getEstado(){
        return estado;
    }
}
