//npm i @types/jquery
import $ from "jquery";

class App
{
    //Al dispararse el evento load cuando se termina de cargar la página web, 
    //se instancian los manejadores del evento click de los tres botones del menú.
    public static asignarManejadores():void
    {
        $("#btnGetPersonajes").on("click", App.traerPersonajes);
        $("#btnAltaPersonaje").on("click", App.altaPersonaje);
        $("#btnEditarPersonaje").on("click", App.editarPersonaje);
    }

    //Llama a la función traerPersonajes del localStorage, luego con los datos devueltos se crean en el DOM la tabla y el formulario de edición.
    public static traerPersonajes():void
    {
        App.activarMenu($("#btnGetPersonajes"));
        $("#info").html("");
    
        let personajes:Personaje[] = App.cargarArrayPersonajes();
    
        crearTabla(personajes);
        crearFormulario(personajes);
    
        $("#btnGetPersonajes").css("pointer-events", "auto");
        $("#btnAltaPersonaje").css("pointer-events", "auto");
    }
    
    public static activarMenu(elemento:JQuery):void
    {        
        if($(".active")[0])
        {
            $(".active").removeAttr("class");
        }

        elemento.attr("class", "active");
    }

    public static cargarArrayPersonajes():Personaje[]
    {
        let personajes:Personaje[] = [];
        let storage:Personaje[] = JSON.parse(localStorage.getItem("personajes"));
    
        if(storage == null || storage[0] == undefined) //Si el servidor no trae nada creo la estructura vacía.
        {
            personajes[0] = {"id":null,"nombre":null,"apellido":null,"edad":null,"casa":null,"traidor":null};
        }
        else
        {
            personajes = storage; //Respuesta de texto del servidor (JSON), lo convierto a objeto
        }
    
        return personajes;
    }

    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //sin parámetro. Lo invoca la opción de Alta del menú
    public static altaPersonaje():void
    {
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.activarMenu($("#btnAltaPersonaje"));

        $("#btnAltaPersonaje").css("pointer-events", "none");
        $("#btnEditarPersonaje").css("pointer-events", "none");

        $("#tablaPersonajes").css("display","none");
        $("#formularioPersonajes").css("display","initial");

        App.mostrarFormulario(personajes);
    }

    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //pasándole por parámetro la personaje que se quiere editar. Lo invoca la opción de Editar del menú
    public static editarPersonaje():void
    {
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.activarMenu($("#btnEditarPersonaje"));

        $("#btnAltaPersonaje").css("pointer-events", "none");
        $("#btnEditarPersonaje").css("pointer-events", "none");

        $("#tablaPersonajes").css("display","none");
        $("#formularioPersonajes").css("display","initial");

        App.mostrarFormulario(personajes, personajeSeleccionado);
    }
}