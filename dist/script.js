$("document").ready(asignarManejadores);

var personajeSeleccionado = {};
var casas = ["Stark", "Targaryen", "Lannister"];

//Al dispararse el evento load cuando se termina de cargar la página web, 
//se instancian los manejadores del evento click de los tres botones del menú.
function asignarManejadores()
{
    $("#btnGetPersonajes").on("click", traerPersonajes);
    $("#btnAltaPersonaje").on("click", altaPersonaje);
    $("#btnEditarPersonaje").on("click", editarPersonaje);
}

function activarMenu(elemento)
{
    if($(".active")[0])
    {
        $(".active").removeAttr("class");
    }
    elemento.attr("class", "active");
}

function cargarArrayPersonajes()
{
    var personajes = [];
    var storage = JSON.parse(localStorage.getItem("personajes"));

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

//Llama a la función traerPersonajes del servidor, luego con los datos devueltos se crean en el DOM la tabla y el formulario de edición.
function traerPersonajes()
{
    activarMenu($("#btnGetPersonajes"));
    $("#info").html("");

    var personajes = cargarArrayPersonajes();

    crearTabla(personajes);
    crearFormulario(personajes);

    $("#btnGetPersonajes").css("pointer-events", "auto");
    $("#btnAltaPersonaje").css("pointer-events", "auto");
}

//Llamador usado por el evento dla opción de Agregar del formulario
function opcionAgregarPersonaje()
{
    var personajes = cargarArrayPersonajes();

    agregarPersonaje(personajes, personajeEditado(personajes));
}

//Crea un objeto JSON a partir de los datos del formulario
function personajeEditado(personajes)
{
    var personaje = {};

    for(var atributo in personajes[0])
    {
        switch(atributo)
        {
            case "casa":
                personaje["casa"] = $("input[name=casa]:checked", '#grupoCasa').val();
                break;
            case "traidor":
                personaje["traidor"] = $("#chkTraidor").prop("checked");
                break;
            default:
                var atributoCapitalizado = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                personaje[atributo] = $("#txt" + atributoCapitalizado).val();
                break;
        }
    }

    return personaje;
}

//Llama a la función altaPersonaje del servidor, pasándole el objeto que se quiere agregar por parámetro.
function agregarPersonaje(personajes, personaje)
{
    var nuevoPersonaje = [];
    var proximoID = parseInt(localStorage.getItem("ID"));

    if(isNaN(proximoID))
    {
        proximoID = 20000;
    }

    personaje.id = proximoID;

    nuevoPersonaje.push(personaje);
    ocultarFormulario();
    crearDetalle($("#tablaPersonajes"), nuevoPersonaje);

    if(personajes[0].id == null)
    {
        personajes[0] = personaje;
    }
    else
    {
        personajes.push(personaje);
    }

    proximoID++;

    localStorage.setItem("personajes", JSON.stringify(personajes));
    localStorage.setItem("ID", proximoID.toString());
}

//Llamador usado por el evento dla opción de Borrar del formulario
function opcionBorrarPersonaje()
{
    var personajes = cargarArrayPersonajes();

    borrarPersonaje(personajes, personajeSeleccionado);
}

//Llama a la función bajaPersonaje del servidor, pasándole el objeto que se quiere eliminar por parámetro.
function borrarPersonaje(personajes, personaje)
{
    var index = personajes.findIndex((per) => 
    {
        return per.id == personaje.id;
    });
  
    if (index != -1)
    {
        personajes.splice(index, 1);

        alert("Personaje:\n\n" + personajeToString(personaje) + "\n\nfue borrada de la tabla");

        $("#filaSeleccionada").remove();
    }
  
    ocultarFormulario();

    localStorage.setItem("personajes", JSON.stringify(personajes));
}

//Llamador usado por el evento dla opción de Modificar del formulario
function opcionModificarPersonaje()
{
    var personajes = cargarArrayPersonajes();

    modificarPersonaje(personajes, personajeSeleccionado, personajeEditado(personajes));
}

//Llama a la función modificarPersonaje del servidor, pasándole el objeto que se quiere modificar por parámetro.
function modificarPersonaje(personajes, personaPre, personaPost)
{
    var index = personajes.findIndex((per) => 
    {
        return per.id == personaPost.id;
    });
  
    if (index != -1)
    {
        personajes.splice(index, 1);
        personajes.push(personaPost);

        alert("Personaje:\n\n" + personajeToString(personaPre) + "\n\nfue modificada a:\n\n" + personajeToString(personaPost));
        modificarFilaSeleccionada(personaPost);
    }
  
    ocultarFormulario();

    localStorage.setItem("personajes", JSON.stringify(personajes));
}

//Devuelve un string con la descripción de atributos y valores del objeto pasado por parámetro.
function personajeToString(personaje)
{
    var texto = "";
    var retornoCarro = false;

    for(var atributo in personaje)
    {
        if(retornoCarro) //Para que no haga retorno de carro en la primera línea
        {
            texto += "\n";
        }
        else
        {
            retornoCarro = true;
        }

        if(atributo == "traidor" && personaje[atributo])
        {
            texto += atributo.toUpperCase() + ": Si";
        }
        else if(atributo == "traidor" && !personaje[atributo])
        {
            texto += atributo.toUpperCase() + ": No";
        }
        else
        {
            texto += atributo.toUpperCase() + ": " + personaje[atributo];
        }
    }

    return texto;
}

//Crea la tabla de personajes en el div info
function crearTabla(personajes)
{
    var puedeCrearDetalle = true; //Si no tengo elementos desde el servidor cambia a false.
    var div = $("#info");
    //var tablaPersonajes = div.append("<table>");

    div.append("<table>");
    var tablaPersonajes = $("#info").children("table");

    tablaPersonajes.attr("id", "tablaPersonajes");
    $("#tablaPersonajes").attr({"border": "1px", "class": "tablaPersonajes"});
    $("#tablaPersonajes").css("border-collapse", "collapse");
    //tablaPersonajes.attr("border", "1px");
    //tablaPersonajes.css("border-collapse", "collapse");
    //$("#info table").attr("id", "tablaPersonajes");
    //tablaPersonajes.attr("class", "tablaPersonajes");

    if(personajes.id == null) //Si el servidor no trae nada creo la estructura vacía.
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
function crearFormulario(personajes)
{
    var div = $("#info");

    div.append("<form id=formularioPersonajes>");
    var formulario = $("#formularioPersonajes")
    formulario.attr("action", "#");
    formulario.css("display", "none");

    formulario.append("<fieldset id=grupo>");
    var grupo = $("#grupo");
    
    grupo.append("<legend id=leyenda>");
    var leyenda = $("#leyenda");
    leyenda.text("Personaje");

    for(var atributo in personajes[0])
    {
        switch(atributo)
        {
            case "casa":
                grupo.append("<fieldset id=grupoCasa>");
                var grupoCasa = $("#grupoCasa");
                grupoCasa.append("<legend id=leyendaCasa>");
                var leyendaCasa = $("#leyendaCasa");

                grupoCasa.attr("class", "grupoInterno");
                leyendaCasa.text("Casa");

                for(var i = 0; i < casas.length; i++)
                {
                    grupoCasa.append("<input id=opt" + casas[i] + ">");
                    var optButton = $("#opt" + casas[i]);
                    grupoCasa.append("<label id=etiqueta" + casas[i] + ">");
                    var etiquetaCasa = $("#etiqueta" + casas[i]);

                    etiquetaCasa.attr("for", "opt" + casas[i]);
                    etiquetaCasa.text(casas[i]);

                    optButton.attr("type", "radio");
                    optButton.attr("name", "casa");
                    optButton.attr("value", casas[i]);
                    optButton.text(" " + casas[i]);

                    grupoCasa.append("<br>");
                }

                break;

            case "traidor":
                grupo.append("<fieldset id=grupoTraidor>");
                var grupoTraidor = $("#grupoTraidor");
                grupoTraidor.append("<input id=chkTraidor>");
                var chkTraidor = $("#chkTraidor");
                grupoTraidor.append("<label id=etiquetaTraidor>");
                var etiquetaTraidor = $("#etiquetaTraidor");

                grupoTraidor.attr("class", "grupoInterno");

                chkTraidor.attr("type", "checkbox");
                chkTraidor.attr("name", "traidor");
                chkTraidor.attr("value", "traidor");
                chkTraidor.text("Es Traidor");

                etiquetaTraidor.attr("for", "chkTraidor");
                etiquetaTraidor.text("Es Traidor");
    
                break;

            default:
                var atributoCapitalizado = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                grupo.append("<label id=etiqueta" + atributo + ">");
                var etiqueta = $("#etiqueta" + atributo);
                grupo.append("<input id=txt" + atributoCapitalizado + ">");
                var cuadroTexto = $("#txt" + atributoCapitalizado);
        
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
    var btnAgregar = $("#btnAgregar");
    grupo.append("<input id=btnModificar>");
    var btnModificar = $("#btnModificar");
    grupo.append("<input id=btnBorrar>");
    var btnBorrar = $("#btnBorrar");
    grupo.append("<input id=btnCancelar>");
    var btnCancelar = $("#btnCancelar");

    btnAgregar.attr("type", "button");
    btnAgregar.val("Agregar");
    btnAgregar.on("click", opcionAgregarPersonaje);

    btnModificar.attr("type", "button");
    btnModificar.val("Modificar");
    btnModificar.on("click", opcionModificarPersonaje);

    btnBorrar.attr("type", "button");
    btnBorrar.val("Borrar");
    btnBorrar.on("click", opcionBorrarPersonaje);

    btnCancelar.attr("type", "button");
    btnCancelar.val("Cancelar");
    btnCancelar.on("click", ocultarFormulario);
}

//Crea la fila de cabecera, con tantas columnas como atributos posea la personaje, en la tabla de personajes.
function crearCabecera(personajes, tablaPersonajes)
{
    tablaPersonajes.append("<tr id=filaCabecera>");
    var fila = $("#filaCabecera");

    for(var atributo in personajes[0])
    {
        fila.append("<th>" + atributo);
    }
}

//Crea tantas fila de detalle en la tabla de personajes como personajes haya cargadas.
function crearDetalle(tablaPersonajes, datos)
{
    var filaDetalle;
    for(var i = 0; i < datos.length; i++)
    {
        tablaPersonajes.append("<tr id=filaDetalle" + i + ">");
        filaDetalle = $("#filaDetalle" + i);
        var columna;
        filaDetalle.on("click", seleccionarFila);

        for(atributo in datos[i])
        {
            //filaDetalle.append("<td>");
            //columna = filaDetalle.children("td");
            //columna.attr("class", atributo);

            if(atributo == "traidor")
            {
                if(datos[i][atributo])
                {
                    filaDetalle.append("<td id=ColumnaDetalle" + atributo + i + ">Si");
                }
                else
                {
                    filaDetalle.append("<td id=ColumnaDetalle" + atributo + i + ">No");
                }
            }
            else
            {
                filaDetalle.append("<td id=ColumnaDetalle" + atributo + i + ">" + datos[i][atributo]);
            }
            //columna = filaDetalle.children("td");
            $("#ColumnaDetalle" + atributo + i).attr("class", atributo);
        }
    }
}

//Cuando el usuario hace click en una fila de detalle de la tabla de personajes,
//la función le setea, previo a blanquear si hay otra fila antes seleccionada, 
//el atributo id a la fila y carga la personaje en el array de personaje seleccionada.
function seleccionarFila()
{
    var filaActual = $(this);
    //$("#btnEditarPersonaje").removeAttr("disabled");
    $("#btnEditarPersonaje").css("pointer-events", "auto");
    blanquearFila();
    
    filaActual.attr("id", "filaSeleccionada");

    //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
    filaActual.children().each(function()
    {
        if($(this).attr("class") == "traidor")
        {
            personajeSeleccionado[$(this).attr("class")] = ($(this).text() == "Si");
        }
        else
        {
            personajeSeleccionado[$(this).attr("class")] = $(this).text();
        }
    });
}

//Quita el atributo id de la fila seleccionada.
function blanquearFila()
{
    $("#filaSeleccionada").removeAttr("id");
}

//Modifica los datos de la fila seleccionada con los datos de la personaje pasada por parámetro.
//Esta función la invoca la opción de modificar una personaje del servidor,
//una vez devuelto el ok del mismo.
function modificarFilaSeleccionada(datos)
{
    var filaSeleccionada = $("#filaSeleccionada");

    //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
    //for(var i = 0; i < filaSeleccionada.children().length; i++)
    filaSeleccionada.children().each(function()
    {
        if($(this).attr("class") == "traidor")
        {
            if(datos[$(this).attr("class")])
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
            $(this).text(datos[$(this).attr("class")]);
        }
    });
}

//Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
//sin parámetro. Lo invoca la opción de Alta del menú
function altaPersonaje()
{
    var personajes = cargarArrayPersonajes();

    activarMenu($("#btnAltaPersonaje"));

    $("#btnAltaPersonaje").css("pointer-events", "none");
    $("#btnEditarPersonaje").css("pointer-events", "none");

    $("#tablaPersonajes").css("display","none");
    $("#formularioPersonajes").css("display","initial");

    mostrarFormulario(personajes);
}

//Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
//pasándole por parámetro la personaje que se quiere editar. Lo invoca la opción de Editar del menú
function editarPersonaje()
{
    var personajes = cargarArrayPersonajes();

    activarMenu($("#btnEditarPersonaje"));

    $("#btnAltaPersonaje").css("pointer-events", "none");
    $("#btnEditarPersonaje").css("pointer-events", "none");

    $("#tablaPersonajes").css("display","none");
    $("#formularioPersonajes").css("display","initial");

    mostrarFormulario(personajes, personajeSeleccionado);
}

//Arma el formulario de edición de personajes.
//Si no se le pasa parámetro asume que se trata de un alta, para ello muestra la opción
//que invoca la función de alta en el servidor y los cuadros de texto de los parámetros
//en blanco.
//Si se invoca con un objeto, la función asume modificación o baja de la personaje que viene
//por parámetro, mostrando los botones que invocan las funciones respectivas en el servidor,
//y completa los cuadros de texto con los valores de cada atributo.
function mostrarFormulario(personajes)
{
    var datos;

    if(typeof arguments[1] == "object") //Es de tipo object si vino un argumento en los parámetros formales de la función.
    {
        datos = arguments[1];

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

    for(var atributo in personajes[0])
    {
        var atributoCapitalizado = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula

        switch(atributo)
        {
            case "casa":
                if(typeof datos == "object") //Modificar o Borrar
                {
                    for(var i = 0; i < casas.length; i++)
                    {
                        if(casas[i] == datos[atributo])
                        {
                            $("#opt" + casas[i]).prop("checked", true);
                        }
                        else
                        {
                            $("#opt" + casas[i]).prop("checked", false);
                        }
                    }
                }
                else //Agregar
                {
                    for(var i = 0; i < casas.length; i++)
                    {
                        if(i == 0)
                        {
                            $("#opt" + casas[i]).prop("checked", true);
                        }
                        else
                        {
                            $("#opt" + casas[i]).prop("checked", false);
                        }
                    }
                }
                break;
                
                case "traidor":
                    if(typeof datos == "object")
                    {
                        $("#chkTraidor").prop("checked", datos[atributo]);
                    }
                    else
                    {
                        $("#chkTraidor").prop("checked", false);
                    }
                    break;
                    
                default:
                    if(typeof datos == "object")
                    {
                        $("#txt" + atributoCapitalizado).val(datos[atributo]);
                    }
                    else
                    {
                        if(atributo === "id")
                        {
                            var proximoID = parseInt(localStorage.getItem("ID"));

                            if(isNaN(proximoID))
                            {
                                proximoID = 20000;
                            }

                            $("#txt" + atributoCapitalizado).val(proximoID);
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

//Oculta el formulario de edición y muestra la tabla de personajes.
//Se blanquea cualquier fila que se haya previamente seleccionado.
function ocultarFormulario()
{
    activarMenu($("#btnGetPersonajes"));

    $("#btnAltaPersonaje").css("pointer-events", "auto");
    $("#btnEditarPersonaje").css("pointer-events", "none");

    blanquearFila();

    $("#tablaPersonajes").css("display","table");
    $("#formularioPersonajes").css("display","none");
}