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
                login(v);
            }
        });
    }

    public void login(View view){
        username = et_username.getText().toString();
        password = et_password.getText().toString();

        if (username.equals("")){
            showError(et_username, "Ingrese el usuario");
        }else if (password.equals("")){
            showError(et_password, "Ingrese la contrasena");
        }else{
            ConexionOAUTH comp = new ConexionOAUTH();

            comp.metodoPOST(username, password);
            System.out.println(comp.getRespuesta());
            if (comp.getRespuesta() == true){
                et_username.setText("");
                et_password.setText("");
                startActivity(new Intent(LoginActivity.this, MainActivity.class));
                finish();
            }else{
                Toast.makeText(getApplicationContext(), "Credenciales incorrectas", Toast.LENGTH_SHORT).show();
            }
        }



    }

    public void showError(EditText input, String s){
        input.setError(s);
        input.requestFocus();
    }
}
