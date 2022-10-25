let usuarioSesionIniciada = null;
let usuariosGuardados = [];

let pIdClaseUsuarios = 0;
class ClaseUsuarios {
    //CLASE que utilizamos para formar el objeto de usuario.
    
    constructor(pNombre, pUsuario, pPass, pTipoUsuario, pProfesorResponsable, pNivelAlumno) {
        
        this.id = pIdClaseUsuarios;
        this.nombrePersona = pNombre;
        this.nombreUsuario = pUsuario;
        this.passwordUsuario = pPass;
        this.tipoUsuario = pTipoUsuario;
        this.profesorResponsable = pProfesorResponsable;
        this.nivelAlumno = pNivelAlumno;
        

        pIdClaseUsuarios++;
    }
}

let crearTarea = [];
let entregarTarea = null;

let pIdClaseTarea = 0;
class ClaseTareas {
    //CLASE que utilizaremos para formar distintas etapas de la tarea.

    constructor(pTituloTarea, pDescripcionTarea, pImgTarea, pProfesorResponsable, pNivelAlumno, pUsuarioDeEntrega, pAudioTarea, pEntrega, pComentarios) {
        this.id = pIdClaseTarea;
        this.titulo = pTituloTarea;
        this.descripcion = pDescripcionTarea;
        this.img = pImgTarea;
        this.profesorResponsable = pProfesorResponsable;
        this.nivelAlumno = pNivelAlumno;
        this.usuarioQueEntrega = pUsuarioDeEntrega;
        this.audio = pAudioTarea;
        this.comentado = pEntrega;
        this.comentario = pComentarios;
        pIdClaseTarea++;
    }

}

let tareaEntregada = [];
let comentarTarea = null;

class ClaseTareasEntregadas {
    constructor(pId, pTituloTarea, pDescripcionTarea, pImgTarea, pProfesorResponsable, pNivelAlumno, pUsuarioDeEntrega, pAudioTarea, pEntrega, pComentarios) {
        this.id = pId;
        this.titulo = pTituloTarea;
        this.descripcion = pDescripcionTarea;
        this.img = pImgTarea;
        this.profesorResponsable = pProfesorResponsable;
        this.nivelAlumno = pNivelAlumno;
        this.usuarioQueEntrega = pUsuarioDeEntrega;
        this.audio = pAudioTarea;
        this.comentado = pEntrega;
        this.comentario = pComentarios;
    
    }

    
}

function precargaDatos() {
//Precarga de usuarios para iniciar sistema.
validarGuardandoUsuarioProfesor("Bruno Díaz", "BruceWayne", "Bdiaz1", "soyProf");
validarGuardandoUsuarioProfesor("Alejandro Martinis", "aMartinis", "AleMartinis1", "soyProf");
validarGuardandoUsuarioAlumno("Gonzalo Pérez", "GonzaP", "Gonza28294", "soyAlumno", "BruceWayne", "Inicial");
validarGuardandoUsuarioAlumno("Diego Gagliano", "DiegoG", "Diego123", "soyAlumno", "BruceWayne", "Inicial");
validarGuardandoUsuarioAlumno("Nataly Delfino", "NatyD", "Naty1", "soyAlumno", "aMartinis", "Inicial");
validarGuardandoUsuarioAlumno("Gabriela Brum", "GabiB", "Gabi1", "soyAlumno", "BruceWayne", "Intermedio");
validarGuardandoUsuarioAlumno("Pablo Fernández", "PabloF", "Pablo1", "soyAlumno", "aMartinis", "Avanzado");
validarGuardandoUsuarioAlumno("Bruno da Silva", "BrunoLic", "Bruno1", "soyAlumno", "aMartinis", "Avanzado");
validarGuardandoUsuarioAlumno("Manuel Tolosa", "ManuT", "Manu1", "soyAlumno", "aMartinis", "Intermedio");
validarGuardandoUsuarioAlumno("Daniel Segovia", "ManuS", "Manu1", "soyAlumno", "BruceWayne", "Intermedio");


validarGuardandoTareaPendiente("Ejercicio 1", "Tocar con cualquier instrumento", "Inicial", "ej1.png", "brucewayne");
validarGuardandoTareaPendiente("Ejercicio 2", "Tocar con cualquier instrumento", "Intermedio", "ej2.png", "brucewayne");
validarGuardandoTareaPendiente("Ejercicio 3", "Tocar con cualquier instrumento", "Intermedio", "ej3.png", "brucewayne");
validarGuardandoTareaPendiente("Ejercicio 4", "Tocar con cualquier instrumento", "Avanzado", "ej4.png", "brucewayne");
validarGuardandoTareaPendiente("Ejercicio 5", "Tocar canción con saxo", "Inicial", "ej5.png", "amartinis");
validarGuardandoTareaPendiente("Ejercicio 6", "Tocar canción con bateria", "Intermedio", "ej6.png", "amartinis");
validarGuardandoTareaPendiente("Ejercicio 7", "Tocar canción con bajo", "Avanzado", "ej7.png", "amartinis");
validarGuardandoTareaPendiente("Ejercicio 8", "Tocar canción con guitarra", "Avanzado", "ej8.png", "amartinis");

let nuevaTareaEntregada1 = new ClaseTareasEntregadas(0, "Ejercicio 1", "Tocar con cualquier instrumento", "ej1.png", "brucewayne", "Inicial", "gonzap", "ej1.m4a", false, "");
let nuevaTareaEntregada2 = new ClaseTareasEntregadas(0, "Ejercicio 1", "Tocar con cualquier instrumento", "ej1.png", "brucewayne", "Inicial", "diegog", "ej1.m4a", false, "");
let nuevaTareaEntregada3 = new ClaseTareasEntregadas(5, "Ejercicio 6", "Tocar canción con bateria", "ej6.png", "amartinis", "Intermedio", "manut", "ej6.m4a", false, "");
let nuevaTareaEntregada4 = new ClaseTareasEntregadas(7, "Ejercicio 8", "Tocar canción con guitarra", "ej8.png", "amartinis", "Avanzado", "pablof", "ej2.m4a", false, "");
let nuevaTareaEntregada5 = new ClaseTareasEntregadas(4, "Ejercicio 5", "Tocar canción con saxo", "ej5.png", "amartinis", "Inicial", "natyd", "ej5.m4a", false, "");
let nuevaTareaEntregada6 = new ClaseTareasEntregadas(2, "Ejercicio 3", "Tocar con cualquier instrumento", "ej3.png", "brucewayne", "Intermedio", "gabib", "ej3.m4a", true, "Excelente, continúe.");

tareaEntregada.push(nuevaTareaEntregada1);
tareaEntregada.push(nuevaTareaEntregada2);
tareaEntregada.push(nuevaTareaEntregada3);
tareaEntregada.push(nuevaTareaEntregada4);
tareaEntregada.push(nuevaTareaEntregada5);
tareaEntregada.push(nuevaTareaEntregada6);

}