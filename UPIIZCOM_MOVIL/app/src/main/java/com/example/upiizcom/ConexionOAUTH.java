/*
    autor: Cri
    fecha: 16 de octubre de 2021

    Se realizo la conexion OAUTH utilizando loopJ con una solicitud del metodo POST.
    A la fecha de hoy (16 de octubre) falta retornar el objeto de tipo JSON obtenido al iniciar sesion,
    asi como tambien retornar una variable que permita saber que se inicio satisfactoriamente la sesion

    fecha: 17 de octubre de 2021

    Se extrajeron los datos resultantes de la solicitud POST (estatus, nombre, boleta, carrera, mail, token)
    y se guardaron dentro de un objeto de tipo Alumno con dichos atributos.
    Queda pendiente encontrar la manera de retornar satisfactoriamente el objeto Alumno a la clase LoginActivity
 */
package com.example.upiizcom;

import android.content.Intent;
import android.os.Parcelable;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java9.util.concurrent.CompletableFuture;
import com.loopj.android.http.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.Serializable;

import cz.msebera.android.httpclient.Header;

public class ConexionOAUTH{
    String direccion;
    AsyncHttpClient cliente;
    String parametros;
    boolean respuesta;
    Alumno alumno;

    public ConexionOAUTH(){
        direccion = "http://148.204.142.2/pump/web/index.php/login";
        cliente = new AsyncHttpClient();
        respuesta = false;
    }

    public void setRespuesta(boolean respuesta) {
        this.respuesta = respuesta;
    }

    public boolean getRespuesta(){
        return respuesta;
    }

    public Alumno metodoPOST(String username, String password){
        RequestParams params = new RequestParams();
        params.put("username", username);
        params.put("password",password);
        cliente.addHeader("Authorization", "Bearer 202006080078033");

        cliente.post(direccion, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                if (statusCode == 200){
                    String rsps = new String(String.valueOf(response));
                    try {
                        JSONObject datos = response.getJSONObject("datos");
                        alumno = new Alumno(datos.getString("Nombre"),datos.getInt("boleta"),
                                            datos.getString("mail"),datos.getString("token"),
                                            datos.getString("Carrera"), response.getBoolean("estatus"));
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    Log.e("INFO",rsps);
                    System.out.println("Recieved event with data: "+response+" estatus: "+statusCode);
                    respuesta = true;
                    System.out.println("Nombre: "+alumno.getNombre()+"\nBoleta: "+alumno.getBoleta()+
                                        "\nCarrera: "+alumno.getCarrera()+"\nmail: "+alumno.getMail());
                }else{
                    System.out.println("No sirve tu mamada");
                }
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, Throwable throwable, JSONObject errorResponse) {
                String rsps = new String(String.valueOf(errorResponse));
                Log.e("INFO",rsps);
                System.out.println("Fail");
                setRespuesta(false);
            }

        });
        //System.out.println(alumno.getNombre());
        return alumno;
    }

}
