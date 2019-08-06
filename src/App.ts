//npm i @types/jquery
//import $ from "jquery";

window.onload = () => 
{
    App.asignarManejadores();
};
//$("document").ready(App.asignarManejadores);

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
        //$("#info").html("");
        $("#info").empty();
    
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.crearTabla(personajes);
        App.crearFormulario(personajes);
    
        $("#btnGetPersonajes").css("pointer-events", "auto");
        $("#btnAltaPersonaje").css("pointer-events", "auto");
    }
    
    public static activarMenu(elemento:JQuery<HTMLElement>):void
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
            personajes[0] = new Personaje(); //{"id":null,"nombre":null,"apellido":null,"edad":null,"casa":null,"esTraidor":null};
        }
        else
        {
            for(let i:number = 0; i < storage.length; i++)
            {
                personajes[i] = new Personaje(storage[i]["id"], storage[i]["nombre"], storage[i]["apellido"], storage[i]["edad"], storage[i]["casa"], storage[i]["esTraidor"]);
            }
        }
    
        return personajes;
    }

    public static cargarPersonajeSeleccionado():Personaje
    {
        let storage:Personaje = JSON.parse(localStorage.getItem("personajeSeleccionado"));
        let personajeSeleccionado:Personaje = new Personaje(storage["id"], storage["nombre"], storage["apellido"], storage["edad"], storage["casa"], storage["esTraidor"]);
    
        return personajeSeleccionado;
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

        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    }

    //Crea la tabla de personajes en el div info
    public static crearTabla(personajes:Personaje[]):void
    {
        let puedeCrearDetalle:boolean = true; //Si no tengo elementos desde el servidor cambia a false.
        let div:JQuery<HTMLElement> = $("#info");

        div.append("<table>");
        let tablaPersonajes:JQuery<HTMLElement> = $("#info").children("table");

        tablaPersonajes.attr("id", "tablaPersonajes");
        $("#tablaPersonajes").attr({"border": "1px", "class": "tablaPersonajes"});
        $("#tablaPersonajes").css("border-collapse", "collapse");

        if(personajes[0].getId() == null) //Si el servidor no trae nada creo la estructura vacía.
        {
            puedeCrearDetalle = false;
        }

        App.crearCabecera(personajes, $("#tablaPersonajes"));

        if(puedeCrearDetalle)
        {
            App.crearDetalle(tablaPersonajes, personajes);
        }
    }

    //Crea el formulario de edición de personajes en el div info.
    //El atributo id lo crea como solo lectura, ya que el servidor en el alta lo deduce,
    //y en la modificación no se altera su valor.
    public static crearFormulario(personajes:Personaje[]):void
    {
        let div:JQuery<HTMLElement> = $("#info");

        div.append("<form id=formularioPersonajes>");
        let formulario:JQuery<HTMLElement> = $("#formularioPersonajes")
        formulario.attr("action", "#");
        formulario.css("display", "none");

        formulario.append("<fieldset id=grupo>");
        let grupo:JQuery<HTMLElement> = $("#grupo");
        
        grupo.append("<legend id=leyenda>");
        let leyenda:JQuery<HTMLElement> = $("#leyenda");
        leyenda.text("Personaje");

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            switch(value)
            {
                case "casa":
                    grupo.append("<fieldset id=grupoCasa>");
                    let grupoCasa:JQuery<HTMLElement> = $("#grupoCasa");
                    grupoCasa.append("<legend id=leyendaCasa>");
                    let leyendaCasa:JQuery<HTMLElement> = $("#leyendaCasa");

                    grupoCasa.attr("class", "grupoInterno");
                    leyendaCasa.text("Casa");

                    for(let unaCasa in ECasa)
                    {
                        if(isNaN(Number(unaCasa))) //Para que no traiga los índices
                        {
                            grupoCasa.append("<input id=opt" + unaCasa + ">");
                            let optButton:JQuery<HTMLElement> = $("#opt" + unaCasa);
                            grupoCasa.append("<label id=etiqueta" + unaCasa + ">");
                            let etiquetaCasa:JQuery<HTMLElement> = $("#etiqueta" + unaCasa);

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
                    let grupoTraidor:JQuery<HTMLElement> = $("#grupoTraidor");
                    grupoTraidor.append("<input id=chkTraidor>");
                    let chkTraidor:JQuery<HTMLElement> = $("#chkTraidor");
                    grupoTraidor.append("<label id=etiquetaTraidor>");
                    let etiquetaTraidor:JQuery<HTMLElement> = $("#etiquetaTraidor");

                    grupoTraidor.attr("class", "grupoInterno");

                    chkTraidor.attr("type", "checkbox");
                    chkTraidor.attr("name", "traidor");
                    chkTraidor.attr("value", "traidor");
                    chkTraidor.text("Es Traidor");

                    etiquetaTraidor.attr("for", "chkTraidor");
                    etiquetaTraidor.text("Es Traidor");
        
                    break;

                default:
                    let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    grupo.append("<label id=etiqueta" + value + ">");
                    let etiqueta:JQuery<HTMLElement> = $("#etiqueta" + value);
                    grupo.append("<input id=txt" + atributoCapitalizado + ">");
                    let cuadroTexto:JQuery<HTMLElement> = $("#txt" + atributoCapitalizado);
            
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado + ": ");
                            
                    cuadroTexto.attr("type", "text");

                    if(value === "id")
                    {
                        cuadroTexto.attr("readonly", "");
                    }

                    break;
            }
        });

        grupo.append("<input id=btnAgregar>");
        let btnAgregar:JQuery<HTMLElement> = $("#btnAgregar");
        grupo.append("<input id=btnModificar>");
        let btnModificar:JQuery<HTMLElement> = $("#btnModificar");
        grupo.append("<input id=btnBorrar>");
        let btnBorrar:JQuery<HTMLElement> = $("#btnBorrar");
        grupo.append("<input id=btnCancelar>");
        let btnCancelar:JQuery<HTMLElement> = $("#btnCancelar");

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

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula

            switch(value)
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
                                if(unaCasa == ECasa.Stark)
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
                            $("#chkTraidor").prop("checked", personajeSeleccionado.getDinamico(value));
                        }
                        else
                        {
                            $("#chkTraidor").prop("checked", false);
                        }
                        break;
                        
                    default:
                        if(personajeSeleccionado !== undefined)
                        {
                            $("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(value));
                        }
                        else
                        {
                            if(value === "id")
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
        });
    }

    //Oculta el formulario de edición y muestra la tabla de personajes.
    //Se blanquea cualquier fila que se haya previamente seleccionado.
    public static ocultarFormulario():void
    {
        App.activarMenu($("#btnGetPersonajes"));

        $("#btnAltaPersonaje").css("pointer-events", "auto");
        $("#btnEditarPersonaje").css("pointer-events", "none");

        App.blanquearFila();

        $("#tablaPersonajes").css("display","table");
        $("#formularioPersonajes").css("display","none");
    }

    //Crea la fila de cabecera, con tantas columnas como atributos posea la personaje, en la tabla de personajes.
    public static crearCabecera(personajes:Personaje[], tablaPersonajes:JQuery<HTMLElement>):void
    {
        tablaPersonajes.append("<tr id=filaCabecera>");
        let fila:JQuery<HTMLElement> = $("#filaCabecera");

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            fila.append("<th>" + value);
        });
    }

    //Crea tantas fila de detalle en la tabla de personajes como personajes haya cargadas.
    public static crearDetalle(tablaPersonajes:JQuery<HTMLElement>, datos:Personaje[]):void
    {
        let filaDetalle:JQuery<HTMLElement>;
        for(let i:number = 0; i < datos.length; i++)
        {
            tablaPersonajes.append("<tr id=filaDetalle" + i + ">");
            filaDetalle = $("#filaDetalle" + i);
            //let columna;
            filaDetalle.on("click", App.seleccionarFila);

            //for(let atributo in datos[i].getAtributos())
            datos[i].getAtributos().forEach(function(value:string):void
            {
                //filaDetalle.append("<td>");
                //columna = filaDetalle.children("td");
                //columna.attr("class", value);
                if(value == "traidor")
                {
                    if(datos[i].getEsTraidor())
                    {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">Si");
                    }
                    else
                    {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">No");
                    }
                }
                else
                {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">" + datos[i].getDinamico(value));
                }
                //columna = filaDetalle.children("td");
                $("#ColumnaDetalle" + value + i).attr("class", value);
            });
        }
    }

    //Quita el atributo id de la fila seleccionada.
    public static blanquearFila():void
    {
        $("#filaSeleccionada").removeAttr("id");
    }

    //Cuando el usuario hace click en una fila de detalle de la tabla de personajes,
    //la función le setea, previo a blanquear si hay otra fila antes seleccionada, 
    //el atributo id a la fila y carga la personaje en el array de personaje seleccionada.
    public static seleccionarFila():void
    {
        let filaActual:JQuery<App> = $(this);
        //let personajeSeleccionado:Personaje = App.cargarPersonajeSeleccionado();
        let personajeSeleccionado:Personaje = new Personaje();
        //$("#btnEditarPersonaje").removeAttr("disabled");
        $("#btnEditarPersonaje").css("pointer-events", "auto");
        App.blanquearFila();
        
        filaActual.attr("id", "filaSeleccionada");

        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        filaActual.children().each(function()
        {
            if($(this).attr("class") == "traidor")
            {
                //personajeSeleccionado[$(this).attr("class")] = ($(this).text() == "Si");
                personajeSeleccionado.setEsTraidorStr($(this).text());
            }
            else
            {
                //personajeSeleccionado[$(this).attr("class")] = $(this).text();
                personajeSeleccionado.setDinamico($(this).attr("class"), $(this).text());
            }
        });

        localStorage.setItem("personajeSeleccionado", JSON.stringify(personajeSeleccionado));
    }

    //Llamador usado por el evento dla opción de Agregar del formulario
    public static opcionAgregarPersonaje():void
    {
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.agregarPersonaje(personajes, App.personajeEditado(personajes));
    }

    //Llamador usado por el evento dla opción de Borrar del formulario
    public static opcionBorrarPersonaje():void
    {
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.borrarPersonaje(personajes, App.cargarPersonajeSeleccionado());
    }

    //Llamador usado por el evento dla opción de Modificar del formulario
    public static opcionModificarPersonaje():void
    {
        let personajes:Personaje[] = App.cargarArrayPersonajes();

        App.modificarPersonaje(personajes, App.cargarPersonajeSeleccionado(), App.personajeEditado(personajes));
    }

    //Llama a la función altaPersonaje del servidor, pasándole el objeto que se quiere agregar por parámetro.
    public static agregarPersonaje(personajes:Personaje[], personaje:Personaje):void
    {
        let nuevoPersonaje:Personaje[] = [];

        personaje.setId(Personaje.getProximoId());

        nuevoPersonaje.push(personaje);
        App.ocultarFormulario();
        App.crearDetalle($("#tablaPersonajes"), nuevoPersonaje);

        if(personajes[0].getId() == null)
        {
            personajes[0] = personaje;
        }
        else
        {
            personajes.push(personaje);
        }

        localStorage.setItem("personajes", JSON.stringify(personajes));
        Personaje.setProximoId();
    }

    //Llama a la función bajaPersonaje del servidor, pasándole el objeto que se quiere eliminar por parámetro.
    public static borrarPersonaje(personajes:Personaje[], personaje:Personaje):void
    {
        /*let index:number = personajes.findIndex((per) => 
        {
            return per.id == personaje.getId();
        });*/

        let posicion:number = -1;

        personajes.forEach(function(value:Personaje, index:number)
        {
            if(value.getId() == personaje.getId())
            {
                posicion = index;
            }
        });
    
        if (posicion != -1)
        {
            personajes.splice(posicion, 1);

            alert("Personaje:\n\n" + personaje.toString() + "\n\nfue borrada de la tabla");

            $("#filaSeleccionada").remove();
        }
    
        App.ocultarFormulario();

        localStorage.setItem("personajes", JSON.stringify(personajes));
    }

    //Llama a la función modificarPersonaje del servidor, pasándole el objeto que se quiere modificar por parámetro.
    public static modificarPersonaje(personajes:Personaje[], personaPre:Personaje, personaPost:Personaje):void
    {
        /*let index:number = personajes.findIndex((per) => 
        {
            return per.id == personaPost.getId();
        });*/
    
        let posicion:number = -1;

        personajes.forEach(function(value:Personaje, index:number)
        {
            if(value.getId() == personaPost.getId())
            {
                posicion = index;
            }
        });

        if (posicion != -1)
        {
            personajes.splice(posicion, 1);
            personajes.push(personaPost);

            alert("Personaje:\n\n" + personaPre.toString() + "\n\nfue modificada a:\n\n" + personaPost.toString());
            App.modificarFilaSeleccionada(personaPost);
        }
    
        App.ocultarFormulario();

        localStorage.setItem("personajes", JSON.stringify(personajes));
    }

    //Modifica los datos de la fila seleccionada con los datos de la personaje pasada por parámetro.
    //Esta función la invoca la opción de modificar una personaje del servidor,
    //una vez devuelto el ok del mismo.
    public static modificarFilaSeleccionada(datos:Personaje):void
    {
        let filaSeleccionada:JQuery<HTMLElement> = $("#filaSeleccionada");

        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        //for(var i = 0; i < filaSeleccionada.children().length; i++)
        filaSeleccionada.children().each(function()
        {
            if($(this).attr("class") == "traidor")
            {
                //if(datos[$(this).attr("class")])
                if(datos.getDinamico($(this).attr("class")))
                {
                    $(this).text("Si");
                }
                else
                {
                    $(this).text("No");
                }
            }
            else
            {
                //$(this).text(datos[$(this).attr("class")]);
                $(this).text(datos.getDinamico($(this).attr("class")));
            }
        });
    }

    //Crea un objeto JSON a partir de los datos del formulario
    public static personajeEditado(personajes:Personaje[]):Personaje
    {
        let personaje:Personaje = new Personaje();

        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function(value:string):void
        {
            switch(value)
            {
                case "casa":
                    let valor:string = String($('input[name="casa"]:checked').val());
                    personaje.setCasaStr(valor);
                    break;
                case "traidor":
                    personaje.setEsTraidor($("#chkTraidor").prop("checked"));
                    break;
                default:
                    let atributoCapitalizado:string = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    personaje.setDinamico(value, $("#txt" + atributoCapitalizado).val());
                    break;
            }
        });

        return personaje;
    }
}