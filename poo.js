const formulario = document.querySelector("#formulario");
const cardsEstudiantes = document.querySelector("#cardsEstudiantes");
const cardsProfesores = document.querySelector("#cardsProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesor = document.querySelector("#templateProfesor").content;
const alert = document.querySelector(".alert");

const estudiantes = [];
const profesores = [];

//delegacion de eventos
document.addEventListener(('click'), (e)=>{
    //capturo los eventos de los botones
    if(e.target.dataset.uid){
        if(e.target.matches(".btn-success")){
            estudiantes.map((item)=>{
                //modificamos en caso de que sea true}
                if(item.uid === e.target.dataset.uid){
                    item.setEstado = true;
                }
                return item;
            });
        }
        if(e.target.matches(".btn-danger")){
            estudiantes.map((item)=>{
                if(item.uid === e.target.dataset.uid){
                    item.setEstado = false;
                }
                return item;
            });
        }
        //como modificamos estudiante tenemos que pintar nuevamente nuestro sitio web
        Persona.pintarPersonaUI(estudiantes, "Estudiante");
    }
});

//POO en Javascript
class Persona {
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad; 
        this.uid = `${Date.now()}`;//Devuelve el numero de milisegundos transcurridos
        //usamos el template string para pintar el uid de numero a string
    }

    //pintamos la instancia de estudiante y el tipo si es estudiante o profesor
    static pintarPersonaUI(personas,tipo){
        if(tipo === "Estudiante"){
            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach((item)=>{
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cardsEstudiantes.appendChild(fragment);
        }

        if(tipo === "Profesor"){
            cardsProfesores.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach((item)=>{
                fragment.appendChild(item.agregarNuevoProfesor());
            });
            cardsProfesores.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona{
    #estado = false; //el estado parte desactivado
    #estudiante = "Estudiante";

    //metodo setter
    set setEstado(estado){
        this.#estado = estado;
    }

    //metodo getter
    get getEstudiante(){
        return this.#estudiante;
    }

    agregarNuevoEstudiante(){//modificamos las propiedades de nuestro template estudiante
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector(".text-primary").textContent = this.nombre;
        clone.querySelector(".lead").textContent = this.edad;
        clone.querySelector("h6").textContent = this.getEstudiante;
        //accedemos a un get que se encuentra dentro de un metodo

        if(this.#estado){
            //agregamos una nueva clase en el badge con className
            //className reemplaza todas las clases que estan adentro y agrega nuevas
            clone.querySelector(".badge").className = "badge bg-success"
            clone.querySelector(".btn-success").disabled = true;
            clone.querySelector(".btn-danger").disabled = false;

        }else{
            clone.querySelector(".badge").className = "badge bg-danger"
            clone.querySelector(".btn-danger").disabled = true;
            clone.querySelector(".btn-success").disabled = false;

        }
        clone.querySelector(".badge").textContent = this.#estado ? "Aprobado" : "Reprobado"

        clone.querySelector(".btn-success").dataset.uid = this.uid;
        clone.querySelector(".btn-danger").dataset.uid = this.uid;

        return clone
    }
}

class Profesor extends Persona{
    #profesor = "Profesor";

    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.#profesor;
        clone.querySelector('.lead').textContent = this.edad;

        return clone;
    }
}



formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const datos = new FormData(formulario);
    const [nombre,edad,opcion] = [...datos.values()];

    //validacion de campos vacios
    if(!nombre.trim() || !edad.trim() || !opcion.trim()){
        console.log("Elemento vacio");
        alert.classList.remove("d-none");
        return;
    }


    if(opcion === "Estudiante"){    
        const estudiante = new Estudiante(nombre,edad);
        estudiantes.push(estudiante);
        Persona.pintarPersonaUI(estudiantes, opcion);
    }

    if(opcion === "Profesor"){
        const profesor = new Profesor(nombre,edad);
        profesores.push(profesor);
        Persona.pintarPersonaUI(profesores, opcion);
    }
});