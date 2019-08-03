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
    
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
    
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
            personajes[0] = {"id":null,"nombre":null,"apellido":null,"edad":null,"casa":null,"esTraidor":null};
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

    //Crea la tabla de personajes en el div info
    public static crearTabla(personajes:Personaje[]):void
    {
        let puedeCrearDetalle:boolean = true; //Si no tengo elementos desde el servidor cambia a false.
        let div:JQuery = $("#info");

        div.append("<table>");
        let tablaPersonajes:JQuery = $("#info").children("table");

        tablaPersonajes.attr("id", "tablaPersonajes");
        $("#tablaPersonajes").attr({"border": "1px", "class": "tablaPersonajes"});
        $("#tablaPersonajes").css("border-collapse", "collapse");

        if(personajes[0].getId() == null) //Si el servidor no trae nada creo la estructura vacía.
        {
            puedeCrearDetalle = false;
        }

        crearCabecera(personajes, $("#tablaPersonajes"));

        if(puedeCrearDetalle)
        {
            crearDetalle(personajes, tablaPersonajes, personajes);
        }
    }

    //Crea el formulario de edición de personajes en el div info.
    //El atributo id lo crea como solo lectura, ya que el servidor en el alta lo deduce,
    //y en la modificación no se altera su valor.
    public static crearFormulario(personajes:Personaje[]):void
    {
        let div:JQuery = $("#info");

        div.append("<form id=formularioPersonajes>");
        let formulario:JQuery = $("#formularioPersonajes")
        formulario.attr("action", "#");
        formulario.css("display", "none");

        formulario.append("<fieldset id=grupo>");
        let grupo:JQuery = $("#grupo");
        
        grupo.append("<legend id=leyenda>");
        let leyenda:JQuery = $("#leyenda");
        leyenda.text("Personaje");

        for(let atributo in personajes[0])
        {
            switch(atributo)
            {
                case "casa":
                    grupo.append("<fieldset id=grupoCasa>");
                    let grupoCasa:JQuery = $("#grupoCasa");
                    grupoCasa.append("<legend id=leyendaCasa>");
                    let leyendaCasa:JQuery = $("#leyendaCasa");

                    grupoCasa.attr("class", "grupoInterno");
                    leyendaCasa.text("Casa");

                    for(let unaCasa in ECasa)
                    {
                        if(isNaN(Number(unaCasa))) //Para que no traiga los índices
                        {
                            grupoCasa.append("<input id=opt" + unaCasa + ">");
                            let optButton:JQuery = $("#opt" + unaCasa);
                            grupoCasa.append("<label id=etiqueta" + unaCasa + ">");
                            let etiquetaCasa:JQuery = $("#etiqueta" + unaCasa);

                            etiquetaCasa.attr("for", "opt" + unaCasa);
                            etiquetaCasa.text(unaCasa);

                            optButton.attr("type", "radio");
                            optButton.attr("name", "casa");
                            optButton.attr("value", unaCasa);
                            optButton.text(" " + unaCasa);

                            grupoCasa.append("<br>");
                        }
                    }

                    break;

                case "traidor":
                    grupo.append("<fieldset id=grupoTraidor>");
                    let grupoTraidor:JQuery = $("#grupoTraidor");
                    grupoTraidor.append("<input id=chkTraidor>");
                    let chkTraidor:JQuery = $("#chkTraidor");
                    grupoTraidor.append("<label id=etiquetaTraidor>");
                    let etiquetaTraidor:JQuery = $("#etiquetaTraidor");

                    grupoTraidor.attr("class", "grupoInterno");

                    chkTraidor.attr("type", "checkbox");
                    chkTraidor.attr("name", "traidor");
                    chkTraidor.attr("value", "traidor");
                    chkTraidor.text("Es Traidor");

                    etiquetaTraidor.attr("for", "chkTraidor");
                    etiquetaTraidor.text("Es Traidor");
        
                    break;

                default:
                    let atributoCapitalizado:string = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    grupo.append("<label id=etiqueta" + atributo + ">");
                    let etiqueta:JQuery = $("#etiqueta" + atributo);
                    grupo.append("<input id=txt" + atributoCapitalizado + ">");
                    let cuadroTexto:JQuery = $("#txt" + atributoCapitalizado);
            
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado + ": ");
                            
                    cuadroTexto.attr("type", "text");

                    if(atributo === "id")
                    {
                        cuadroTexto.attr("readonly", "");
                    }

                    break;
            }
        }

        grupo.append("<input id=btnAgregar>");
        let btnAgregar:JQuery = $("#btnAgregar");
        grupo.append("<input id=btnModificar>");
        let btnModificar:JQuery = $("#btnModificar");
        grupo.append("<input id=btnBorrar>");
        let btnBorrar:JQuery = $("#btnBorrar");
        grupo.append("<input id=btnCancelar>");
        let btnCancelar:JQuery = $("#btnCancelar");

        btnAgregar.attr("type", "button");
        btnAgregar.val("Agregar");
        btnAgregar.on("click", App.opcionAgregarPersonaje);

        btnModificar.attr("type", "button");
        btnModificar.val("Modificar");
        btnModificar.on("click", App.opcionModificarPersonaje);

        btnBorrar.attr("type", "button");
        btnBorrar.val("Borrar");
        btnBorrar.on("click", App.opcionBorrarPersonaje);

        btnCancelar.attr("type", "button");
        btnCancelar.val("Cancelar");
        btnCancelar.on("click", App.ocultarFormulario);
    }

    //Arma el formulario de edición de personajes.
    //Si no se le pasa parámetro asume que se trata de un alta, para ello muestra la opción
    //que invoca la función de alta en el servidor y los cuadros de texto de los parámetros
    //en blanco.
    //Si se invoca con un objeto, la función asume modificación o baja de la personaje que viene
    //por parámetro, mostrando los botones que invocan las funciones respectivas en el servidor,
    //y completa los cuadros de texto con los valores de cada atributo.
    public static mostrarFormulario(personajes:Personaje[], personajeSeleccionado?:Personaje):void
    {
        if(personajeSeleccionado !== undefined) //Es distinto de undefined si vino un argumento en los parámetros formales de la función.
        {
            $("#btnAgregar").css("display","none");
            $("#btnModificar").css("display","initial");
            $("#btnBorrar").css("display","initial");
        }
        else
        {
            $("#btnAgregar").css("display","initial");
            $("#btnModificar").css("display","none");
            $("#btnBorrar").css("display","none");
        }

        for(let atributo in personajes[0])
        {
            let atributoCapitalizado:string = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula

            switch(atributo)
            {
                case "casa":
                    if(personajeSeleccionado !== undefined) //Modificar o Borrar
                    {
                        for(let unaCasa in ECasa)
                        {
                            if(isNaN(Number(unaCasa)))
                            {
                                if(unaCasa == personajeSeleccionado.getCasa())
                                {
                                    $("#opt" + unaCasa).prop("checked", true);
                                }
                                else
                                {
                                    $("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    else //Agregar
                    {
                        for(let unaCasa in ECasa)
                        {
                            if(isNaN(Number(unaCasa)))
                            {
                                if(unaCasa == ECasa.stark)
                                {
                                    $("#opt" + unaCasa).prop("checked", true);
                                }
                                else
                                {
                                    $("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    break;
                    
                    case "traidor":
                        if(personajeSeleccionado !== undefined)
                        {
                            $("#chkTraidor").prop("checked", personajeSeleccionado.getDinamico(atributo));
                        }
                        else
                        {
                            $("#chkTraidor").prop("checked", false);
                        }
                        break;
                        
                    default:
                        if(personajeSeleccionado !== undefined)
                        {
                            $("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(atributo));
                        }
                        else
                        {
                            if(atributo === "id")
                            {
                                $("#txt" + atributoCapitalizado).val(Personaje.getProximoId());
                            }
                            else
                            {
                                $("#txt" + atributoCapitalizado).val("");
                            }
                        }
                        break;
            }
        }
    }
}