/*
    autor: Cri
    fecha: 16 de Octubre de 2021

    Se realizo la conexion OAUTH utilizando loopJ con una solicitud del metodo POST.
    A la fecha de hoy (16 de octubre) falta retornar el objeto de tipo JSON obtenido al iniciar sesion,
    asi como tambien retornar una variable que permita saber que se inicio satisfactoriamente la sesion
 */
package com.example.upiizcom;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java9.util.concurrent.CompletableFuture;
import com.loopj.android.http.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import cz.msebera.android.httpclient.Header;

public class ConexionOAUTH {
    String direccion;
    AsyncHttpClient cliente;
    String parametros;
    boolean respuesta;

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

    public boolean metodoPOST(String username, String password){
        RequestParams params = new RequestParams();
        params.put("username", username);
        params.put("password",password);
        cliente.addHeader("Authorization", "Bearer 202006080078033");
        cliente.addHeader("username:", username);
        cliente.addHeader("password:", password);
        cliente.post(direccion, params, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                if (statusCode == 200){
                    String rsps = new String(String.valueOf(response));
                    String estatus = "";
                    try {
                        estatus = response.getJSONObject("estatus").toString();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    Log.e("INFO",rsps);
                    System.out.println("Recieved event with data: "+response+" estatus: "+statusCode+"successsssss");
                    System.out.println("username:"+username+" password:"+password);
                    respuesta = true;
                    System.out.println("Respuesta seteada en true");
                    System.out.println("estatus"+estatus);
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
        return respuesta;
    }
}
