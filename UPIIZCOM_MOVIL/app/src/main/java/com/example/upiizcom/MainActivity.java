package com.example.upiizcom;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    String nombre, carrera, boleta;
    TextView saludo;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle extras = getIntent().getExtras();
        setContentView(R.layout.activity_main);
        saludo = findViewById(R.id.saludoTV);

        if (extras != null){

            nombre = extras.getString("Nombre");
            carrera = extras.getString("Carrera");
            boleta = extras.getString("Boleta");

            System.out.println("Hola alumno "+nombre+" ("+boleta+")");
            System.out.println("de la carrera "+carrera);
        }

        saludo.setText("Hola alumno "+nombre+"\n("+boleta+")\nde la carrera "+carrera);


    }


}