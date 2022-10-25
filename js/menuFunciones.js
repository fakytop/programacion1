function ocultarTodo() { // funcion que utilizamos para ocultar todas las pantallas y botones de la aplicacion, para luego mostrar solo lo que necesite.
    //Botones de navegacion principal y auxiliar
    mostrarOcultarBotonera("none", "none", "none", "none", "none", "none", "none", "none", "none")
    //DIVS principales
    mostrarOcultar("divRegistrarse", "none");
    mostrarOcultar("divIniciarSesion", "none");
    //DIVS de profesor
    mostrarOcultar("menuPrincipalProfesor", "none");
    mostrarOcultar("divListaDeAlumnosPorProfesor", "none");
    mostrarOcultar("divCrearNuevoEjercicio", "none");
    mostrarOcultar("divComentar", "none");
    mostrarOcultar("mostrarPantallaEjercicioParaCalificar", "none");
    mostrarOcultar("divEstadisticasProfesor", "none");
    mostrarOcultar("divMsjInfoAlumno", "none");
    mostrarOcultar("msjErrorCalificar", "none");
    //DIVS de alumno
    mostrarOcultar("menuPrincipalAlumno", "none");
    mostrarOcultar("divTareasAsignadasAlAlumno", "none");
    mostrarOcultar("divRealizarNuevoEjercicio", "none");
    mostrarOcultar("divVerEjerciciosResueltos", "none");
    mostrarOcultar("divEstadisticasAlumno", "none");
}
//funcion de parametros, que utilizamos para sustituir al style.display.... le pasamos id y forma de mostrar la pantalla (block, none, inline-block)
function mostrarOcultar(pId, pFormaDeMostrar) { // Funcion que utliziamos para mostrar y ocultar pantallas
    document.querySelector(`#${pId}`).style.display = pFormaDeMostrar;
}//sustituye al addEventListener para dar evento a los botones pasandole id y nombre de la funcion.
function agregarEventoDeBotones(pIdBotones, pNombreFuncion) { // Funcion que utilizamos para agregar evento a los botones
    document.querySelector(`#${pIdBotones}`).addEventListener("click", pNombreFuncion);
}
//En cada parámetro se eligirá entre: "none" / "block" / "inline-block"
function mostrarOcultarBotonera(pIniciarSesion, pRegistro, pCerrarSesion, pListaAlumnos, pCrearEj, pCalificar, pVerTareas, pVerEjerciciosResueltos, pEstadisticas) {
    mostrarOcultar("btnParaIniciarSesion", pIniciarSesion);
    mostrarOcultar("btnParaRegistrarse", pRegistro);
    mostrarOcultar("btnParaCerrarSesion", pCerrarSesion);
    mostrarOcultar("btnListaDeAlumnos", pListaAlumnos);
    mostrarOcultar("btnCrearNuevoEjercicio", pCrearEj);
    mostrarOcultar("btnCalificar", pCalificar);
    mostrarOcultar("btnVerTareas", pVerTareas);
    mostrarOcultar("btnVerEjerciciosResueltos", pVerEjerciciosResueltos);
    mostrarOcultar("btnEstadisticas", pEstadisticas);

}
//Se agregan todos los botones cuyo evento principal sea cambiar pantalla
function botonesCambiosDePantallas() {
    agregarEventoDeBotones("btnParaRegistrarse", mostrarDivRegistro);
    agregarEventoDeBotones("btnParaIniciarSesion", mostrarDivInicioSesion);
    agregarEventoDeBotones("btnListaDeAlumnos", mostrarDivAsignarNivelDeAlumnos);
    agregarEventoDeBotones("btnCrearNuevoEjercicio", mostrarDivCrearNuevaTarea);
    agregarEventoDeBotones("btnCalificar", mostrarDivParaComentarTareas);
    agregarEventoDeBotones("btnVerTareas", mostrarDivListadoTareas);
    agregarEventoDeBotones("btnVerEjerciciosResueltos", mostrarDivTodasLasTareasEntregadasDelAlumno);
    agregarEventoDeBotones("btnEstadisticas", mostrarDivEstadisticas);
}
//botones con funcionalidades varias e importantes
function botonesConFuncionalidades() {
    agregarEventoDeBotones("btnGuardarUsuarioRegistrado", registrarNuevoUsuario);
    agregarEventoDeBotones("btnIniciarSesion", iniciarSesion);
    agregarEventoDeBotones("btnParaCerrarSesion", cerrarSesion);
    agregarEventoDeBotones("btnNuevaTarea", guardarNuevaTareaPendiente);
    agregarEventoDeBotones("btnEntregarTareaRealizada", entregarTareaPendienteDeCalificar);
    agregarEventoDeBotones("btnComentarTarea", calificarTarea);
    agregarEventoDeBotones("btnBuscarTareaParaRealizar", buscadorDeTareas);
}
//Pertenece a funcion con evento change, en el menú de registro. Segun el tipo de usuario muestra o no el selector de profesores. 
function mostrarSelectorDeProfesoresRegistro() {
    let tipoUsuarioAlumno = document.querySelector("#slctTipoDeUsuario").value;
    let mostrarComboProfesores = "";
    if(tipoUsuarioAlumno == "soyAlumno") {
        mostrarComboProfesores += `
            <label for="slctProfesorResponsable">Profesor Responsable:</label>
            <select id="slctProfesorResponsable">
                <option value="" selected>
                    Seleccione...
                </option>
        `
        for(let i = 0; i < usuariosGuardados.length; i++) {
            if(usuariosGuardados[i].tipoUsuario == "soyProf") {
                mostrarComboProfesores += `
                    <option value="${usuariosGuardados[i].nombreUsuario}">
                        ${usuariosGuardados[i].nombrePersona} (${usuariosGuardados[i].nombreUsuario})
                    </option>
                `;
            }
        }

        mostrarComboProfesores += "</select>"
        
    } else {
        mostrarComboProfesores += "";
    }
    document.querySelector("#divSelectorTipoDeUsuario").innerHTML = mostrarComboProfesores;
}
//muestra pantalla de registro de nuevos usuarios.
function mostrarDivRegistro() {
    ocultarTodo();
    mostrarOcultarBotonera("block", "block", "none", "none", "none", "none", "none", "none", "none");
    mostrarOcultar("divRegistrarse", "block");
}
//muestra pantalla de inicio de sesion para todos los usuarios
function mostrarDivInicioSesion() {
    ocultarTodo();
    mostrarOcultarBotonera("block", "block", "none", "none", "none", "none", "none", "none", "none");
    mostrarOcultar("divIniciarSesion", "block");
}
//funcion que utilizamos para ir cambiando las pantallas dentro de la sesion de profesor
function mostrarDivSesionIniciadaProfesor() {
    ocultarTodo();
    mostrarOcultarBotonera("none", "none", "block","inline-block", "inline-block", "inline-block", "none", "none", "inline-block");    
    mostrarOcultar("menuPrincipalProfesor", "block");
}
//funcion que utilizamos para ir cambiando las pantallas dentro de la sesion de alumno
function mostrarDivSesionIniciadaAlumno() {
    ocultarTodo();
    mostrarOcultar("menuPrincipalAlumno", "block");
    mostrarOcultarBotonera("none", "none", "block","none", "none", "none", "inline-block", "inline-block", "inline-block");
}
//muestra la pantalla donde se generará la tabla para asignarles niveles a los alumnos.
function mostrarDivAsignarNivelDeAlumnos() {
    mostrarDivSesionIniciadaProfesor();
    mostrarOcultar("divListaDeAlumnosPorProfesor", "block");
    
    let profesorResponsable = usuarioSesionIniciada.nombreUsuario;
    let tabla = generarTablaAsignarNivelDeAlumnos(profesorResponsable);

    document.querySelector("#tablaAsignacion").innerHTML = tabla;

    let btnCambiarNivelAlumno = document.querySelectorAll(".btnCambiarNivel");
    for(let i = 0; i < btnCambiarNivelAlumno.length; i++) {
        btnCambiarNivelAlumno[i].addEventListener("click", confirmarNivelDeAlumno);
    }
}//Muestra la pantalla para que el profesor pueda crear una nueva tarea.
function mostrarDivCrearNuevaTarea() {
    mostrarDivSesionIniciadaProfesor();
    mostrarOcultar("divCrearNuevoEjercicio", "block");
    document.querySelector("#mensajeCrearTarea").innerHTML = "";
}//muestra la pantalla para que el profesor pueda comentar las tareas entregadas por los alumnos.
function mostrarDivParaComentarTareas() {
    mostrarDivSesionIniciadaProfesor();
    mostrarOcultar("divComentar", "block");
    generarTablaParaComentarEjercicios();
}//muestra pantalla para ver ejercicio seleccionado y poder calificarlo.
function divVerEjercicio() {
    mostrarDivSesionIniciadaProfesor();
    mostrarOcultar("mostrarPantallaEjercicioParaCalificar", "block");
    mostrarEjercicioResuelto();
}
//Muestra el listado de taraeas para que pueda realizar el alumno.
function mostrarDivListadoTareas() {
    mostrarDivSesionIniciadaAlumno();
    mostrarOcultar("divTareasAsignadasAlAlumno", "block");
    document.querySelector("#txtBuscarTareaCargadaPorProfesor").value = "";
    generarTablaDeTareas();
}//abre nueva pantalla donde se genera el ejercicio para entregar
function divMostrarRealizarNuevoEjercicio() {
    mostrarDivSesionIniciadaAlumno();
    mostrarOcultar("divRealizarNuevoEjercicio", "block");
    pantallaEntregarEjercicio();
}//Se genera el ejercicio para entregar.
function pantallaEntregarEjercicio() {
    let pantalla = `
        <h3>${entregarTarea.titulo}</h3>
        <p>${entregarTarea.descripcion}</p>
        <img src="img/${entregarTarea.img}">
        <br>
    `
    document.querySelector("#funcionGenerarNuevoEjercicio").innerHTML = pantalla;
}//Muestra pantalla donde se genera la tabla con todas las tareas entregdas por el alumno y si fueron o no comentadas por el profesor.
function mostrarDivTodasLasTareasEntregadasDelAlumno() {
    mostrarDivSesionIniciadaAlumno();
    mostrarOcultar("divVerEjerciciosResueltos", "block");
    tablaDeTareasEntregadas();
}//muestra la pantalla de estadísticas dependiendo del tipo de usuario que está loggeado.
function mostrarDivEstadisticas() {
    if(usuarioSesionIniciada.tipoUsuario == "soyProf") {
        mostrarDivSesionIniciadaProfesor();
        mostrarDivEstadisticasProfesor();
    } else {
        mostrarDivSesionIniciadaAlumno();
        mostrarDivEstadisticasAlumno();
    }
}//Mensajes de informacion que se muestran segun el metodo change del selector o desplegable de la página.
function mostrarDivInfoAlumnos() {
    let opcionAlumno = document.querySelector("#slctInfoAlumnos").value;
    let msj = "";
    let tareasPropuestasParaSuNivel = tareasPropuestasParaElAlumno(opcionAlumno);
    let tareasEntregadasPorAlumnoEnSuNivel = contarTareasEntregadasPorAlumnoPorNivel(opcionAlumno);    

    if(opcionAlumno != "") {
        mostrarOcultar("divMsjInfoAlumno", "block");
        msj = `El alumno ha entregado ${tareasEntregadasPorAlumnoEnSuNivel} de ${tareasPropuestasParaSuNivel} tareas propuestas en su nivel actual.`;
    } else {
        msj = "";
    }

    document.querySelector("#divMsjInfoAlumno").innerHTML = msj;

}