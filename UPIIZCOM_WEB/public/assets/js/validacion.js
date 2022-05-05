const validacion = document.getElementById('login');
const inputs = document.querySelectorAll('#login input');

const campos = {
    usuario: false,
    password: false
}

const validarFormulario = (e) =>{
    
    switch(e.target.name){
        case "usuario":
            if(expresiones.usuario.test(e.target.value)){
                document.getElementById('login').classList.remove('form__incorrecto');
                document.getElementById('login').classList.add('form__correcto');
                document.getElementById('login').classList.remove('activo');
                campos['usuario'] = true;
            }else{
                document.getElementById('login').classList.add('form__incorrecto');
                document.getElementById('login').classList.remove('form__correcto');
                document.getElementById('login').classList.add('activo');
                campos['usuario'] = false;
            }
        break;
        case "password":
            if(expresiones.password.test(e.target.value)){
                document.getElementById('login').classList.remove('form__incorrecto2');
                document.getElementById('login').classList.add('form__correcto2');
                campos['password'] = true;
            }else{
                document.getElementById('login').classList.add('form__incorrecto2');
                document.getElementById('login').classList.remove('form__correcto2');
                campos['password'] = false;
            }
        break;
    };
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

const expresiones = {
	usuario: /^[0-9]{10}$/, // numeros unicamente, 10 de longitud
	password: /^.{1,50}$/, // 1 a 50 digitos.
}



