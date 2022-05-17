function alfanumerico(e){
   
    key=e.keyCode || e.which;
    teclado=String.fromCharCode(key);
    letrasnum=" abcdefghijklmnñopqrstuvwxyz0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    especiales=["46","8","37","38","164","45","95"];

    teclado_especial=false;
   
    for(var i in especiales){
        if(key==especiales[i]){
            teclado_especial=true;break;
        }
    }

    if(letrasnum.indexOf(teclado)==-1&& !teclado_especial){
        return false;
    }
}