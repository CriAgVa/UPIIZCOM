package com.example.upiizcom;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class LoginActivity extends AppCompatActivity {
    EditText et_username, et_password;
    String username, password;
    Button boton;
    Alumno alumno;
    boolean estado;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        et_username = findViewById(R.id.editTextUsername);
        et_password = findViewById(R.id.editTextPassword);
        boton = findViewById(R.id.buttonSesion);

        boton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                try {
                    login(v);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void login(View view) throws InterruptedException {
        username = et_username.getText().toString();
        password = et_password.getText().toString();

        if (username.equals("")){
            showError(et_username, "Ingrese el usuario");
        }else if (password.equals("")){
            showError(et_password, "Ingrese la contrasena");
        }else{
            Runnable run;

            Thread nT = new Thread (run = new Runnable(){
                @Override
                public void run() {
                    ConexionOAUTH comp = new ConexionOAUTH(username, password);
                    alumno = comp.metodoPOST(username, password);
                    System.out.println("En loginActivity: "+alumno.getBoleta());
                    setEstado(alumno.getEstado());
                }
            });

            nT.start();
            nT.join();

               System.out.println("sts"+getEstado());

            if (getEstado() == true){
                et_username.setText("");
                et_password.setText("");
                Intent i = new Intent(LoginActivity.this, MainActivity.class);
                i.putExtra("Nombre",alumno.getNombre());
                i.putExtra("Carrera",alumno.getCarrera());
                i.putExtra("Boleta",alumno.getBoleta()+"");
                startActivity(i);
                finish();
            }else{
                Toast.makeText(getApplicationContext(), "Credenciales incorrectas", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public void setEstado(boolean estado){
        this.estado = estado;
    }

    public boolean getEstado(){
        return estado;
    }

    public void showError(EditText input, String s){
        input.setError(s);
        input.requestFocus();
    }
}
