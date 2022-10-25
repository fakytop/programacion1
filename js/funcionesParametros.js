//valida que la password cumpla con los requisitos exigidos por la letra.
function ControlarPassword(pPass) {
    let resultadoValido = false;
    let minuscula = false;
    let mayuscula = false;
    let numero = false;

    for(let i = 0; i < pPass.length; i++) {
        if(funcionCharCodeAt(pPass, i, 47, 58)) {//codigo ASCII numeros.
            numero = true;
        } else if(funcionCharCodeAt(pPass, i, 64, 91)) {//codigo ASCII letras mayusculas
            mayuscula = true;
        } else if(funcionCharCodeAt(pPass, i, 96, 123)) {//codigo ASCII letras minusculas
            minuscula = true;
        }
    }

    if(numero && mayuscula && minuscula && pPass.length > 3) {
        resultadoValido = true;
    }
    return resultadoValido;
}

//Funcion que controla los datos ingresados, si todos son correctos guarda al profesor
function validarGuardandoUsuarioProfesor(pNombre, pUsuario, pPassword, pTipoUsuario) {
    let datosValidos = pNombre != "" && pUsuario != "" && ControlarPassword(pPassword) && !existeUsuario(pUsuario);

    if(datosValidos) {
        let usuarioLowerCase = pUsuario.toLowerCase();
        let nuevoProfesor = new ClaseUsuarios(pNombre, usuarioLowerCase, pPassword, pTipoUsuario, "", "");
        usuariosGuardados.push(nuevoProfesor);
        console.log(usuariosGuardados);
    }
    
}
//busca que el usuario ingresado no existe de antemano.
function existeUsuario(pUsuario) {
    let usuarioExistente = false;
    let i = 0;
    let usuarioExistenteLowerCase = pUsuario.toLowerCase();
    while(i < usuariosGuardados.length && !usuarioExistente) {
        if(usuariosGuardados[i].nombreUsuario == usuarioExistenteLowerCase) {
            usuarioExistente = true;
        }
        i++;
    }
    
    return usuarioExistente;
}
//Funcion que controla los datos ingresados, si todos son correctos guarda al alumno
function validarGuardandoUsuarioAlumno(pNombre, pUsuario, pPassword, pTipoUsuario, pProfesorResponsable, pNivel) {
    let datosValidos = pNombre != "" && pUsuario != "" && ControlarPassword(pPassword) && existeUsuario(pProfesorResponsable) && !existeUsuario(pUsuario);
    if(datosValidos) {
        let usuarioLowerCase = pUsuario.toLowerCase();
        let nuevoAlumno = new ClaseUsuarios(pNombre, usuarioLowerCase, pPassword, pTipoUsuario, pProfesorResponsable.toLowerCase(), pNivel);
        usuariosGuardados.push(nuevoAlumno);
        console.log(usuariosGuardados);
    }
}
//funcion para simplificar el charcodeAT (codigo ASCII)
function funcionCharCodeAt(pPass, pContador, pCodigo1, pCodigo2) {
    resultado = false;
    if(pPass.charCodeAt(pContador) > pCodigo1 && pPass.charCodeAt(pContador) < pCodigo2) {
        resultado = true;
    }

    return resultado;
}
//funcion que retorna mensajes de error en la pantalla de reguitrio.
function msjsDeErrorDivRegistro(pNombre, pUsuario, pPass) {
    let msjDivReg = "";

    if(pNombre == "") {
        msjDivReg = "Ingrese un nombre por favor.";
    } else if(pUsuario == "") {
        msjDivReg = "Ingrese un nombre de usuario por favor.";
    } else if(ControlarPassword(pPass) == false) {
        msjDivReg = `
            Debe ingresar una contraseña con los siguientes requisitos:
            <ul>
                <li>4 caracteres o más</li>
                <li>Debe contener al menos una mayúscula</li>
                <li>Debe contener al menos una minúscula</li>
                <li>Debe contener al menos un número</li>
            </ul>    
        `;
    } else {
        msjDivReg = "Registro completado."
    }

    return msjDivReg;
}
//se genera la tabla para asignar el nivel de los alumnos, según el profesor que esté loggeado.
function generarTablaAsignarNivelDeAlumnos(pProfesor) {
    let mostrarTabla = "";
    let alMenosUnAlumno = false;
    mostrarTabla += `
        <table border=1px bordercolor="#ED4028"  cellspacing="0">
            <tr>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Nivel Actual</th>
                <th>Seleccionar Nivel</th>
                <th bgcolor="#ED4028"></th>
            </tr>
    `;
    
    for(let i = 0; i < usuariosGuardados.length; i++) {
        if(usuariosGuardados[i].profesorResponsable == pProfesor) {
            alMenosUnAlumno = true;
            mostrarTabla += `
                <tr>
                    <td>${usuariosGuardados[i].nombrePersona}</td>
                    <td>${usuariosGuardados[i].nombreUsuario}</td>
                    <td>${usuariosGuardados[i].nivelAlumno}</td>
                    <td>
                        <select id="slctCambiarNivelDeAlumno_${i}">
                            <option value="" selected>Seleccione...</option>
                            <option value="Inicial">Nivel Inicial</option>
                            <option value="Intermedio">Nivel Intermedio</option>
                            <option value="Avanzado">Nivel Avanzado</option>
                        </select>    
                    </td>
                    <td>
                        <input type="button" id-btnCambiarNivel="${i}" class="btnCambiarNivel" value="Cambiar">
                    </td>
                </tr>
            `;
        }
    }
    if(alMenosUnAlumno) {
        mostrarTabla += "</table>";
    } else {
        mostrarTabla = "No tienes alumnos asignados.";
    }
    

    return mostrarTabla;
}

//Busca el último caracter, lo utilizamos para quitar el fakepath en este caso estaríamos buscando una contrabarra.
function buscarUltimoCaracterEnTexto(textoDondeBuscar, caracterBuscado) {
    let resultado = 0;
    let bandera = true;

    let i = textoDondeBuscar.length - 1;
    while (i >= 0 && bandera) { //se busca de derecha a izquierda la posicion de la primera barra (con iterador i--)
        if (textoDondeBuscar[i] == caracterBuscado) { 
            resultado = i;
            bandera = false;
        }

        i--;
    }
    if(bandera) {
        resultado = (-1);
    }
    return resultado;//DEVUELVE EN FORMATOS NUMERO, LA POSICION DE LA BARRA
}//combinado con buscarultimocaracter, determinamos la posicion donde arranca el nombre del archivo guardado.
function cortarTextoDesdePosicion(texto, posicion) {
    let textoParaRetornar = "";

    for (let i = posicion; i < texto.length; i++) {
        textoParaRetornar += texto[i]; //EMPIEZA A ARMAR EL TEXTO DESDE LA BARRA ENCONTRADA (ULTIMA BARRA), HASTA EL FINAL , ACA DE IZQUIERDA A DERECHA.
    }

    //RETORNA EL TEXTO ARMADO DESDE LA BARRA ENCONTRADA
    return textoParaRetornar;
}//Elimina el fakepath ccon ayuda de las otras dos funciones.
function eliminarFakePath(pathCompleto) {
    
    let posicionUltimaBarra = buscarUltimoCaracterEnTexto(pathCompleto, "\\");
    let nombreArchivo = cortarTextoDesdePosicion(pathCompleto, posicionUltimaBarra + 1);

    return nombreArchivo;

}//controla y verifica que los datos de tareas sean validos. y los pushea en el array
function guardarTarea(pTituloPush, pDescripcionPush, pNivelPush, pImgPush, pProfPush) {
    let guardarTarea = new ClaseTareas(pTituloPush, pDescripcionPush, pImgPush, pProfPush, pNivelPush, null, null, false, "");
    crearTarea.push(guardarTarea);
}//controla los limites de caracteres por letra.
function limiteCaracteres(pTitulo, pDescripcion) {
    let tituloSinEspacios = pTitulo.trim();
    let descripcionSinEspacios = pDescripcion.trim();

    let validar = false;
    let condicion = (tituloSinEspacios.length + descripcionSinEspacios.length) <= 200 && (tituloSinEspacios.length + descripcionSinEspacios.length) >= 20 && tituloSinEspacios != "" && descripcionSinEspacios != "";
    if(condicion) {
        validar = true;
    }
    return validar;
}
//verifica que la tarea pendeinte tenga datos válidos para poder guardarla en el array
function validarGuardandoTareaPendiente(pTituloTarea, pDescripcionTarea, pNivelTarea, pImgTarea, pProfesorResp) {
    let validacion = false;
    
    let imgSinFP = eliminarFakePath(pImgTarea);

    let i = 0;
    let encontrado = false;

    while (i < crearTarea.length && !encontrado) {
        let crearTareaTituloLC = crearTarea[i].titulo.toLowerCase();
        let tituloTareaLC = pTituloTarea.toLowerCase();
        let crearTareaDescrpLC = crearTarea[i].descripcion.toLowerCase();
        let descripcionTareaLC = pDescripcionTarea.toLowerCase();
        let aValidar = crearTareaTituloLC == tituloTareaLC && crearTareaDescrpLC == descripcionTareaLC && crearTarea[i].profesorResponsable == pProfesorResp && crearTarea[i].nivelAlumno == pNivelTarea;
    
        if(aValidar) {
            encontrado = true;
        } 
        i++;
    }
    if(!encontrado) {
        if(imgSinFP != "" && limiteCaracteres(pTituloTarea, pDescripcionTarea) && pNivelTarea != "") {
            guardarTarea(pTituloTarea, pDescripcionTarea, pNivelTarea, imgSinFP, pProfesorResp);
            validacion = true;
        }
    }
    
    return validacion;
}//le agrega el audio a la tarea cargada por el profesor, y se guarda en nuevo array.
function validarGuardandoTareaParaCalificar(pAudio) {
    let entregado = false;

    if(tareaEntregada.length == 0) {
        let nuevaTareaEntregada = new ClaseTareasEntregadas(entregarTarea.id, entregarTarea.titulo, entregarTarea.descripcion, entregarTarea.img, entregarTarea.profesorResponsable, usuarioSesionIniciada.nivelAlumno, usuarioSesionIniciada.nombreUsuario, pAudio, false, "")
        tareaEntregada.push(nuevaTareaEntregada);
    } else {
        let i = 0;
        while (i < tareaEntregada.length && !entregado) {
            if(tareaEntregada[i].id == entregarTarea.id && tareaEntregada[i].usuarioQueEntrega == usuarioSesionIniciada.nombreUsuario) {
                entregado = true;
            } 
            i++;
        }
        if(!entregado) {
            let nuevaTareaEntregada = new ClaseTareasEntregadas(entregarTarea.id, entregarTarea.titulo, entregarTarea.descripcion, entregarTarea.img, entregarTarea.profesorResponsable, usuarioSesionIniciada.nivelAlumno, usuarioSesionIniciada.nombreUsuario, pAudio, false, "")
            tareaEntregada.push(nuevaTareaEntregada);
        }    
    }
    return entregado;
}
//busca subcadenas de texto para los titulos y descripciones 
function buscarSubCadenas(pCadena, pSubCadena) {
    let resultadoBuscador = false;
    let esCadena = "";
    let cadenaLowerCase = pCadena.toLowerCase();
    let subCadenaLowerCase = pSubCadena.toLowerCase();
    let i = 0;
    let j = 0;
    //Primero hace la busqueda en los titulos, en caso de falso pasa a la descripcion.
    while(i < cadenaLowerCase.length && !resultadoBuscador) {
        if(cadenaLowerCase[i] == subCadenaLowerCase[j]) {
            let k = i;

            while(j < subCadenaLowerCase.length && cadenaLowerCase[k] == subCadenaLowerCase[j]) {
                esCadena += cadenaLowerCase[k];
                k++;
                j++;
            }

            if(esCadena == subCadenaLowerCase) {
                resultadoBuscador = true;
            } else {
                esCadena = "";
                j = 0;
            }
        }
        i++;
    }
    return resultadoBuscador;
}
//Cuenta cantidad de tareas para las estadisticas.
function contarTareas(pArrayDeTareas) {
    let cantidad = 0;

    for(let i = 0; i < pArrayDeTareas.length; i++) {
        if(usuarioSesionIniciada.profesorResponsable == pArrayDeTareas[i].profesorResponsable && usuarioSesionIniciada.nivelAlumno == pArrayDeTareas[i].nivelAlumno) {
            cantidad++;
        }
    } 
    return cantidad;
}   //cuenta las tareas comentadas por el profesor para las estadísticas
function contarTareasComentadas(pArrayDeTareas) {
    let cantidad = 0;
    for(let i = 0; i < pArrayDeTareas.length; i++) {
        if(usuarioSesionIniciada.nombreUsuario == pArrayDeTareas[i].usuarioQueEntrega && usuarioSesionIniciada.profesorResponsable == pArrayDeTareas[i].profesorResponsable && usuarioSesionIniciada.nivelAlumno == pArrayDeTareas[i].nivelAlumno && pArrayDeTareas[i].comentado) {
            cantidad++;
        }
    } 
    return cantidad;
    
}//Hace la busqueda de el o los alumnos que mas tareas entregaron por profesor.
function alumnoMasTareasEntregadas(pProfesor) {
    let variableInfinitaNegativa = Number.NEGATIVE_INFINITY;
    let msj = "";
    let alMenosUnAlumno = false;
    for(let i = 0; i < usuariosGuardados.length; i++) { //si el usuario que está preguntando entregó mas tareas, sustituye el actual por este.
        if(usuariosGuardados[i].profesorResponsable == pProfesor) {
            alMenosUnAlumno = true;
            if(contarTareasPorAlumno(usuariosGuardados[i]) > variableInfinitaNegativa) {
                variableInfinitaNegativa = contarTareasPorAlumno(usuariosGuardados[i]);
                msj = `
                <table border="1px" cellspacing="0" bordercolor="#ED4028">
                <tr>
                    <th>Nombre</th>
                    <th>Cantidad Ejercicios resueltos</th>
                </tr>
                <tr>
                        <td>${usuariosGuardados[i].nombrePersona}</td>
                        <td align="center">${contarTareasPorAlumno(usuariosGuardados[i])}</td>
                    </tr>
                `
            } else if(contarTareasPorAlumno(usuariosGuardados[i]) == variableInfinitaNegativa){ // si el usuario que está preguntando entregó la misma cantidad de tareas, se agrega al anterior.
                msj += `
                    <tr>
                        <td>${usuariosGuardados[i].nombrePersona}</td>
                        <td align="center">${contarTareasPorAlumno(usuariosGuardados[i])}</td>
                    </tr>                    
                `
            } 
            //en caso de no haber resultados, muestra msj de eerror
            if(variableInfinitaNegativa == 0){
                msj = "Los alumnos no han resuelto tareas.";
            }
        }
    }
    if (!alMenosUnAlumno) {
        msj = "No tienes alumnos asignados.";
    }
    return msj;
}
//se le pasa usuarios dinamicos y les calcula cuantas tareas tiene hechas. En la function anterior es utilizada.
function contarTareasPorAlumno(pAlumno) {
    let contador = 0;
    
    for(let i = 0; i < tareaEntregada.length; i++) {
        if(tareaEntregada[i].usuarioQueEntrega == pAlumno.nombreUsuario) {
            contador++;
        }
    }

    return contador;
}
//Muestra las estadisticas de cuantas tareas fueron entregadas para el.
function totalTareasEntregadasPorProfesor(pProfesor) {
    let contador = 0; 

    for(let i = 0; i < tareaEntregada.length; i++) {
        if(tareaEntregada[i].profesorResponsable == pProfesor) {
            contador++;
        }
    }
    return contador;
}
//Selector de alumnos en la pantalla del profesor para que muestre sus estadisticas.
function slctInfoAlumnos(pProfesor) {
    let opciones = `
        <option value="" selected>Seleccione alumno...</option>
    `;
    for(let i = 0; i < usuariosGuardados.length; i++) {
        if(pProfesor == usuariosGuardados[i].profesorResponsable) {
            opciones += `
                <option value="${usuariosGuardados[i].nombreUsuario}">${usuariosGuardados[i].nombrePersona}</option>
            `;
        }
    }

    return opciones;
}
//calcula cuantas tareas fueron propuestas para ese alumno en ese nivel
function tareasPropuestasParaElAlumno(pAlumno) {
    let nivel = obtenerNivelAlumno(pAlumno);
    let tareasContadas = contarTareasPorNivelyProfesor(nivel, usuarioSesionIniciada.nombreUsuario);
    return tareasContadas;
}
//Cuenta las tareas para ese nivel segun el profesor responsable.
function contarTareasPorNivelyProfesor(pNivelTareas, pProfesorResponsable) {
    let contador = 0;

    for(let i = 0; i < crearTarea.length; i++) {
        if(pNivelTareas == crearTarea[i].nivelAlumno && pProfesorResponsable == crearTarea[i].profesorResponsable) {
            contador++;
        }
    }
    return contador;
}
//cuenta las tareas entregadas por el alumno que se consulta en el nivel que pertenece.
function contarTareasEntregadasPorAlumnoPorNivel(pAlumno) {
    let contador = 0;
    let nivel = obtenerNivelAlumno(pAlumno);
    for(let i = 0; i < tareaEntregada.length; i++) {
        if(tareaEntregada[i].usuarioQueEntrega == pAlumno && tareaEntregada[i].nivelAlumno == nivel) {
            contador++;
        }
    }
    return contador;
}
//Devuelve el nivel del alumno que se está consultando
function obtenerNivelAlumno(pAlumno) {
    let encontrado = false;
    let i = 0;
    let nivel = "";
    while(i < usuariosGuardados.length && !encontrado) {
        if(usuariosGuardados[i].nombreUsuario == pAlumno) {
            nivel = usuariosGuardados[i].nivelAlumno;
            encontrado = true;
        }
        i++;
    }
    return nivel;
}