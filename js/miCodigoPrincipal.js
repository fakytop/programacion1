inicializar();

function inicializar() {
    //Hacemos la precarga de datos, y hacemos llamada de todos los botones que dan funcionalidad a la aplicación
    ocultarTodo();
    mostrarOcultarBotonera("block", "block", "none", "none", "none", "none", "none", "none", "none");
    botonesCambiosDePantallas();    
    botonesConFuncionalidades();
    precargaDatos();

    //Evento de cambio de visualizaciones para los combo selects.
    document.querySelector("#slctTipoDeUsuario").addEventListener("change", mostrarSelectorDeProfesoresRegistro);
    document.querySelector("#slctInfoAlumnos").addEventListener("change", mostrarDivInfoAlumnos);
    console.log(usuariosGuardados);
    console.log(tareaEntregada);
    console.log(crearTarea);
}

//Función que recibe los datos del HTML y permite o no el registro de un nuevo usuario.
function registrarNuevoUsuario() {
    let nuevoNombrePersona = document.querySelector("#txtNombreRegistrarse").value;
    let nuevoNombreUsuario = document.querySelector("#txtNombreUsuarioRegistrarse").value;
    let nuevoPassword = document.querySelector("#txtPasswordRegistrarse").value;
    let tipoUsuario = document.querySelector("#slctTipoDeUsuario").value;
    let msjDivReg = "";

    //Pregunta si el usuario es profesor o Alumno, para luego validar según el tipo de usuario si los datos son correctos.
    if(tipoUsuario == "soyProf") {
        //Pregunta si ya hay un usuario guardado con ese nombre (de usuario).
        if(!existeUsuario(nuevoNombreUsuario)) {
            //En caso de que no exista, y los datos ingresados sean validos guarda el nuevo usuario PROFESOR.
            validarGuardandoUsuarioProfesor(nuevoNombrePersona, nuevoNombreUsuario, nuevoPassword, tipoUsuario);
            msjDivReg = msjsDeErrorDivRegistro(nuevoNombrePersona, nuevoNombreUsuario, nuevoPassword);
        } else {
            msjDivReg = "Nombre de usuario ya utilizado, ingrese otro por favor.";
        }
    } else if(tipoUsuario == "soyAlumno") {
        let profesorResponsable = document.querySelector("#slctProfesorResponsable").value;
        if(!existeUsuario(nuevoNombreUsuario)) {
            //Si no existe ese nombre de usuario, y el tipo de usuario es alumno, guarda nuevo alumno en el nivel inicial. (Si los datos cumplen la validación).
            validarGuardandoUsuarioAlumno(nuevoNombrePersona, nuevoNombreUsuario, nuevoPassword, tipoUsuario, profesorResponsable, "Inicial");
            if(profesorResponsable == "") {
                msjDivReg = "Debe elegir un profesor.";
            } else {
                msjDivReg = msjsDeErrorDivRegistro(nuevoNombrePersona, nuevoNombreUsuario, nuevoPassword);    
            }
        } else {
            msjDivReg = "Nombre de usuario ya utilizado, ingrese otro por favor.";
        }   
    } else {
        msjDivReg = "Seleccione tipo de usuario.";
    }

    document.querySelector("#mensajeDivError").innerHTML = msjDivReg;
    document.querySelector("#txtNombreRegistrarse").value = "";
    document.querySelector("#txtNombreUsuarioRegistrarse").value = "";
    document.querySelector("#txtPasswordRegistrarse").value = "";
}
//Funcion que recibe los datos del HTML y busca si existe el usuario y su contraseña es correcta.
function iniciarSesion() {
    let nombreUsuario = document.querySelector("#txtIniciarSesionUsuario").value.toLowerCase();
    let pass = document.querySelector("#txtIniciarSesionPassword").value;
    
    let i = 0;
    let usuarioEncontrado = false;
    let msjError = "";
    //Busca el usuario.
    while(i < usuariosGuardados.length && !usuarioEncontrado) {
        if(nombreUsuario == usuariosGuardados[i].nombreUsuario) {
            if(pass == usuariosGuardados[i].passwordUsuario) {
                usuarioEncontrado = true;
                usuarioSesionIniciada = usuariosGuardados[i];
            }
        }
        i++;
    }
    //Si lo encuentra, dependiendo del tipo de usuario, ingresará al div que le corresponda.
    if(usuarioEncontrado) {
        if(usuarioSesionIniciada.tipoUsuario == "soyProf") {
            mostrarDivSesionIniciadaProfesor();
        } else {
            mostrarDivSesionIniciadaAlumno();
        }
    } else {
        msjError = "Usuario y/o contraseña errónea. Intente nuevamente.";
        document.querySelector("#divMsjErrorAlIniciarSesion").innerHTML = msjError;
    }
    document.querySelector("#txtIniciarSesionUsuario").value = "";
    document.querySelector("#txtIniciarSesionPassword").value = "";
    console.log(usuarioSesionIniciada);


}
//Cierra cualquier sesion iniciada ocultando todos los menúes y borrando los datos de las variables globales.
function cerrarSesion() {
    ocultarTodo();
    mostrarOcultarBotonera("block", "block", "none", "none", "none", "none", "none", "none", "none");
    usuarioSesionIniciada = null;
    variableInfinitaNegativa = Number.NEGATIVE_INFINITY;
}
//Función que permite el cambio de nivel del alumno.
function confirmarNivelDeAlumno() {
    //Llama a todos los botones que tienen el atributo "id-btnCambiarNivel" para darle evento a los botones dinámicos.
    let btnCambiarNivel = this.getAttribute("id-btnCambiarNivel");   
    let nivelSeleccionado = document.querySelector(`#slctCambiarNivelDeAlumno_${btnCambiarNivel}`).value;
    let i = 0;
    let bandera = true;
    let msj = "";

    while(i < usuariosGuardados.length && bandera) {
        if(btnCambiarNivel == usuariosGuardados[i].id) {
            //Si el nivel seleccionado es intermedio o avanzado, y el usuario pertenece al inicial. 
            if(usuariosGuardados[i].nivelAlumno == "Inicial" && (nivelSeleccionado == "Intermedio" || nivelSeleccionado == "Avanzado")) {
                usuariosGuardados[i].nivelAlumno = nivelSeleccionado;
                bandera = false;
                msj = `
                    Al usuario ${usuariosGuardados[i].nombrePersona} se le asignó el nivel ${nivelSeleccionado} correctamente.
                `;

                //Si el usuario es nivel intermedio y seleccion el avanzado, me permite cambiarlo
            } else if(usuariosGuardados[i].nivelAlumno == "Intermedio" && nivelSeleccionado == "Avanzado") {
                usuariosGuardados[i].nivelAlumno = nivelSeleccionado;
                bandera = false;
                msj = `
                    Al usuario ${usuariosGuardados[i].nombrePersona} se le asignó el nivel ${nivelSeleccionado} correctamente.
                `;
            } else {
                //si no se selecciona nivel da error.
                if(nivelSeleccionado == "") {
                    msj = "Debe seleccionar un nivel.";
                    //Si se selecciona el mismo nivel que ya tiene asignado, da otro error.
                } else if(nivelSeleccionado == usuariosGuardados[i].nivelAlumno) {
                    msj = `
                        ${usuariosGuardados[i].nombrePersona} ya está asignado al nivel ${nivelSeleccionado}.
                    `;
                    //Dejamos el else para aquellos cambios de retroceso de nivel.
                } else {
                    msj = `
                    No es posible cambiar a ${usuariosGuardados[i].nombrePersona} del nivel ${usuariosGuardados[i].nivelAlumno} al nivel ${nivelSeleccionado}.
                `;
                }
            }
        }
        i++;
    }
    //acutaliza la tabla de alumnos y su nivel correspondiente.
    mostrarDivAsignarNivelDeAlumnos();   
    document.querySelector("#msjCambioNivel").innerHTML = msj;
}
//Funcion para guardar nuevas tareas en el array de tareas.
function guardarNuevaTareaPendiente() {
    let tituloTarea = document.querySelector("#tituloDelNuevoEjercicio").value;
    let descripcionTarea = document.querySelector("#descripcionNuevoEjercicio").value;
    let nivelTarea = document.querySelector("#slctNivelDelEjercicio").value;
    let imgTarea = document.querySelector("#imgNuevaTarea").value;
    let profesorResp = usuarioSesionIniciada.nombreUsuario;

    let mensaje = "";
    //Si los datos ingresados en el HTML son válidos, pushea la tarea en el array.
    if(validarGuardandoTareaPendiente(tituloTarea, descripcionTarea, nivelTarea, imgTarea, profesorResp)) {
        mensaje = `
            Tarea guardada al nivel ${nivelTarea} exitosamente.
        `;

        //Se vacían los campos.
        document.querySelector("#tituloDelNuevoEjercicio").value = "";
        document.querySelector("#descripcionNuevoEjercicio").value = "";
        document.querySelector("#imgNuevaTarea").value = "";
        document.querySelector("#slctNivelDelEjercicio").value = "";
    
    } else {
        //Por si la tarea no cumple con los requisitos de titulo y descripcion.
        if(!limiteCaracteres(tituloTarea, descripcionTarea)) {
            mensaje = 
                "Para guardar la tarea, al menos debe haber 20 caracteres entre título y descripción, y no más de 200. Además no pueden quedar vacíos.";
        } else if(imgTarea == "") {
            mensaje = "Debe seleccionar una imagen para cargar la tarea.";
        } else if(nivelTarea == "") {
            mensaje = "Debe seleccionar un nivel para asignar.";
        } else {
            mensaje = `Ya existe la tarea para el nivel ${nivelTarea}.`;
        }
        
    }
    console.log(crearTarea);

    document.querySelector("#mensajeCrearTarea").innerHTML = mensaje;
}
//Tabla con las tareas finalizadas por alumno para cada profesor, que estén pendientes de calificar.
function generarTablaParaComentarEjercicios() {
    let tabla = `
    <table border="1" cellspacing="0" bordercolor="#ED4028">
        <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th bgcolor="#ED4028"></th>
        </tr>
    `;
    let contadorTareas = 0;
    let tareasEncontradas = false; //variable que usamos como bandera para decir que encontramos tareas para el profesor

    if(tareaEntregada.length != 0) {
        for(let i = 0; i < tareaEntregada.length; i++) {
            if(tareaEntregada[i].profesorResponsable == usuarioSesionIniciada.nombreUsuario && !tareaEntregada[i].comentado) {
                tareasEncontradas = true;
                contadorTareas++;
                tabla += `
                    <tr>
                        <td>${tareaEntregada[i].titulo}</td>
                        <td>${tareaEntregada[i].descripcion}</td>
                        <td>${tareaEntregada[i].usuarioQueEntrega}</td>
                        <td>
                            <input type="button" id-btnVerEjercicio="${i}" class="btnVerEjercicio" value="Ver">
                        </td>    
                    </tr>
                `;
            }
        }
    } 
    
    tabla += "</table>";

    if(contadorTareas == 0 || !tareasEncontradas) { // esta condicion se armó, por si no hay tareas que mostrar, pisamos la tabla que fuimos creando.
        tabla = "No se encuentran tareas para calificar.";
    }
    
    document.querySelector("#tablaEjerciciosParaCalificar").innerHTML = tabla;

    let btnVerEJercicios = document.querySelectorAll(".btnVerEjercicio");
    for(let i = 0; i < btnVerEJercicios.length; i++) {
        btnVerEJercicios[i].addEventListener("click", verEjercicio);
    }
}
//Llama a la función que muestra el ejercicio para comentar.
function verEjercicio() {
    let btnVerEjercicio = this.getAttribute("id-btnVerEjercicio");

    let i = 0;
    let bandera = true;

    while(i < tareaEntregada.length && bandera) {
        if(btnVerEjercicio == i) {
            comentarTarea = tareaEntregada[i];
            divVerEjercicio(); // Llama a la funcion que oculta y muestra pantallas según lo que necesita mostrar, para ir a comentar el ejercicio.
            bandera = false;
        }
        i++;
    }
}
//Muestra en pantalla el ejercicio resuelto para comentar.
function mostrarEjercicioResuelto() {
    let nuevaPantalla = `
    <h3>${comentarTarea.titulo}</h3>
    <p>${comentarTarea.descripcion}</h3>
    <img src="img/${comentarTarea.img}">
    <br>
    <audio controls>
        <source src="audio/${comentarTarea.audio}" type="audio/mp3">
    </audio>
`;

document.querySelector("#divVerEjercicioParaCalificar").innerHTML = nuevaPantalla;
}
//Función que le da evento a a comentar las tareas realizadas por los alumnos.
function calificarTarea() {

    let comentarioProfe = document.querySelector("#txtComentarioProfesor").value;
    let i = 0;
    let bandera = true;
    let msjError = "";
    //Pregunta si el comentario del profesor no es vacío.
    if(comentarioProfe != "") {
        //Cambia el estado de tarea comentada a true, y pisa el comentario "vacio" de esa tarea.
        while(i < tareaEntregada.length && bandera) {
            if(tareaEntregada[i].id == comentarTarea.id && tareaEntregada[i].alumnoQueEntrega == comentarTarea.alumnoQueEntrega && tareaEntregada[i].comentado == false) {
                tareaEntregada[i].comentario = comentarioProfe;
                tareaEntregada[i].comentado = true;
                bandera = false;
                alert("Comentarios guardados.")
                console.log(tareaEntregada[i]);
                mostrarDivParaComentarTareas(); // retorna a la pantalla donde muestra las tareas pendientes de comentar.
            }
            i++;
        }
    }//Muestra mensajes de error según el tipo.
    if(bandera && comentarioProfe != "") {
        mostrarOcultar("msjErrorCalificar", "block");
        msjError = "La tarea ya fue comentada.";
    } else {
        mostrarOcultar("msjErrorCalificar", "block");
        msjError = "Debe ingresar un comentario.";
    }

    document.querySelector("#msjErrorCalificar").innerHTML = msjError;
    document.querySelector("#txtComentarioProfesor").value = "";
}
//Se muestra la tabla de tareas para que el alumno las pueda realizar.
function generarTablaDeTareas() {
    let tabla = `
        <table border="1px" cellspacing="0" bordercolor="#ED4028">    
            <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th bgcolor="#ED4028"></th>
            </tr>
    `;
    let tareaEncontrada = false;

    for(let i = 0; i < crearTarea.length; i++) {
        if(usuarioSesionIniciada.nivelAlumno == crearTarea[i].nivelAlumno && usuarioSesionIniciada.profesorResponsable == crearTarea[i].profesorResponsable) {
            tabla += `
                <tr>
                    <td>${crearTarea[i].titulo}</td>
                    <td>${crearTarea[i].descripcion}</td>
                    <td>
                        <input type="button" id-btnRealizarEjercicio="${i}" class="btnRealizarEjercicio" value="Realizar">
                    </td> 
            `;
            tareaEncontrada = true;
        }
    }
    tabla += "</table>";
    if(!tareaEncontrada) {
        tabla = "No se encontraron tareas asignadas.";
    }
    document.querySelector("#tablaTareasAsignadasPorAlumno").innerHTML = tabla;

    let btnRealizarEjercicios = document.querySelectorAll(".btnRealizarEjercicio");
    for(let i = 0; i < btnRealizarEjercicios.length; i++) {
        btnRealizarEjercicios[i].addEventListener("click", mostrarDivEjercicio);
    }
}
//le da evento a los botones dinamicos de las tareas a realizar.
function mostrarDivEjercicio() {
    let btnRealizarEjercicio = this.getAttribute("id-btnRealizarEjercicio");
    
    let i = 0;
    let bandera = true;

    while(i < crearTarea.length && bandera) {
        if(btnRealizarEjercicio == i) {
            entregarTarea = crearTarea[i];  
            divMostrarRealizarNuevoEjercicio();
            console.log(entregarTarea);
            bandera = false;
        }
        i++;
    }
}
//Valida los datos de la tarea y los guarda en el array
function entregarTareaPendienteDeCalificar() {
    let audio = document.querySelector("#btnAudiosDeAlumno").value;
    let audioSinFP = eliminarFakePath(audio);//elimina el C://fakepath que se agrega al guardar una imagen o audio.
    let msj = "";
    //Exige que haya un audio cargado para poder validar la tarea calificada. 
    if(audio != "") {
        if(!validarGuardandoTareaParaCalificar(audioSinFP)) {
            console.log(tareaEntregada);
            alert("La tarea se entregó con éxito.");
            mostrarDivListadoTareas();
            document.querySelector("#btnAudiosDeAlumno").value = "";
        } else {
            alert("La tarea ya fue entregada.");
            mostrarDivListadoTareas();
            document.querySelector("#btnAudiosDeAlumno").value = "";
        }
        
    } else {
        msj = "Debe cargar un archivo de audio.";
    }
    document.querySelector("#parrafoMsj").innerHTML = msj;
}

//Muestra una tabla con las tareas que entregó el alumno y si fueron comentadas por el profesor responsable.
function tablaDeTareasEntregadas() {
    let tabla = `
        <table border="1" cellspacing="0">
            <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Audio</th>
                <th>Comentarios</th>
            </tr>
    `;
    let alMenosUnaTarea = false; //variable que utilizo para validar mostrar un mensaje u otro.

    for(let i = 0; i < tareaEntregada.length; i++) {
        if(tareaEntregada[i].usuarioQueEntrega == usuarioSesionIniciada.nombreUsuario) {
            tabla += `
                <tr>
                    <td>${tareaEntregada[i].titulo}</td>
                    <td>${tareaEntregada[i].descripcion}</td>  
                    <td>
                        <audio controls>
                            <source src="audio/${tareaEntregada[i].audio}" type="audio/mp3">
                        <audio>
                    </td>  
                    <td>${tareaEntregada[i].comentario}</td>  
                </tr>
            `;
            alMenosUnaTarea = true;
        }    
    }

    tabla += "</table>";
    if(!alMenosUnaTarea) {
        tabla = "No se encontraron tareas entregadas.";
    }
    document.querySelector("#divVerEjerciciosResueltos").innerHTML = tabla;
}
//Busca las tareas o por titulo, o por descripción, no por ambas.
function buscadorDeTareas() {
    let txtSubCadena = document.querySelector("#txtBuscarTareaCargadaPorProfesor").value;
    let mostrarTabla = `
        <table>
            <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th bgcolor="#ED4028"></th>
            </tr>
    `;

    let tituloOk = false; // utilizo para decir si encontré una subcadena en el titulo, y así evitar buscar en la descripcion
    let descripcionOk = false; 
    // busca en los titulos 
    for(let i = 0; i < crearTarea.length; i++) {
        if(buscarSubCadenas(crearTarea[i].titulo, txtSubCadena) && usuarioSesionIniciada.profesorResponsable == crearTarea[i].profesorResponsable && usuarioSesionIniciada.nivelAlumno == crearTarea[i].nivelAlumno) {
            mostrarTabla += `
                <tr>
                    <td>${crearTarea[i].titulo}</td>
                    <td>${crearTarea[i].descripcion}</td>
                    <td><input type="button" id-btnRealizarEjercicio="${i}" class="btnRealizarEjercicio" value="Realizar"></td>
                </tr>
                `;
                tituloOk = true;
        }
    }
    // Si no se encontro subcadena en los titulos, pasa a buscar en los comentarios.
    if(!tituloOk) {
        for(let i = 0; i < crearTarea.length; i++) {
            if(buscarSubCadenas(crearTarea[i].descripcion, txtSubCadena) && usuarioSesionIniciada.profesorResponsable == crearTarea[i].profesorResponsable && usuarioSesionIniciada.nivelAlumno == crearTarea[i].nivelAlumno) {
                mostrarTabla += `
                <tr>
                    <td>${crearTarea[i].titulo}</td>
                    <td>${crearTarea[i].descripcion}</td>
                    <td><input type="button" id-btnRealizarEjercicio="${i}" class="btnRealizarEjercicio" value="Realizar"></td>
                </tr>
                `;
                descripcionOk = true;
            }
        }
    }

    mostrarTabla += `</table>`;
    if(!tituloOk && !descripcionOk) { //si ninguna se encuentra, muestra un mensaje de error.
        mostrarTabla = "No hay resultados que coincidan con su búsqueda.";
    }

    document.querySelector("#tablaTareasAsignadasPorAlumno").innerHTML = mostrarTabla;
    //defino la funcion que le agrega evento a los botones dinámicos.
    let btnRealizarEjercicios = document.querySelectorAll(".btnRealizarEjercicio");
    for(let i = 0; i < btnRealizarEjercicios.length; i++) {
        btnRealizarEjercicios[i].addEventListener("click", mostrarDivEjercicio);
    }
}

//muestra las estadisticas de los alumnos
function mostrarDivEstadisticasAlumno() {
    mostrarOcultar("divEstadisticasAlumno", "block");
    let contadorTareasParaHacer = contarTareas(crearTarea);
    let contadorTareasHechasPorAlumno = contarTareasEntregadasPorAlumnoPorNivel(usuarioSesionIniciada.nombreUsuario);   
    let contadorTareasComentadas = contarTareasComentadas(tareaEntregada);
    let divMsj = "";
    console.log(contadorTareasParaHacer);
    console.log(contadorTareasHechasPorAlumno);

    let porcentajeEjerciciosResueltos = contadorTareasHechasPorAlumno * 100 / contadorTareasParaHacer;
    let totalEjerciciosSinComentar = contadorTareasHechasPorAlumno - contadorTareasComentadas;
    
    divMsj = `
        <ul>
            <li>Ha resuelto el ${porcentajeEjerciciosResueltos}% de los ejercicios planteados para el nivel ${usuarioSesionIniciada.nivelAlumno}.</li>
            <li>Ha recibido ${contadorTareasComentadas} comentarios de ejercicios en el nivel ${usuarioSesionIniciada.nivelAlumno}.</li>
            <li>Restan comentar ${totalEjerciciosSinComentar} ejercicios para el nivel ${usuarioSesionIniciada.nivelAlumno}.</li>
        </ul>
    `;

    if(contadorTareasParaHacer == 0) {
        divMsj = "No tienes ejercicios planteados para realizar.";
    }

    document.querySelector("#divEstadisticasAlumno").innerHTML = divMsj;
}

//muestra las estadisticas de los profesores.
function mostrarDivEstadisticasProfesor() {
    mostrarOcultar("divEstadisticasProfesor", "block");
    let profesor = usuarioSesionIniciada.nombreUsuario;
    let alumnoMasTareas = alumnoMasTareasEntregadas(profesor);
    let totalTareasEntregadasPorProf = totalTareasEntregadasPorProfesor(profesor);
    let msjTotalTareas = "";
    let infoAlumnos = slctInfoAlumnos(profesor);

    if(totalTareasEntregadasPorProf == 1) {
        msjTotalTareas = `En total se entregó ${totalTareasEntregadasPorProf} tarea.`;    
    } else if(totalTareasEntregadasPorProf > 1) {
        msjTotalTareas = `En total se entregaron ${totalTareasEntregadasPorProf} tareas.`;
    }

    document.querySelector("#alumnosMasTareasEntregadas").innerHTML = alumnoMasTareas;
    document.querySelector("#totalTareasEntregadas").innerHTML = msjTotalTareas;
    document.querySelector("#slctInfoAlumnos").innerHTML = infoAlumnos;
}
