var ECasa;
(function (ECasa) {
    ECasa["Stark"] = "Stark";
    ECasa["Targaryen"] = "Targaryen";
    ECasa["Lannister"] = "Lannister";
})(ECasa || (ECasa = {}));
var Personaje = /** @class */ (function () {
    function Personaje(id, nombre, apellido, edad, casa, esTraidor) {
        this.id = id; //Personaje.getProximoId();
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.casa = ECasa[casa];
        this.esTraidor = esTraidor;
    }
    Personaje.getProximoId = function () {
        var proximoID = Number(localStorage.getItem("ID"));
        if (isNaN(proximoID) || proximoID == 0) {
            proximoID = 20000;
        }
        //localStorage.setItem("ID", String(proximoID++));
        return proximoID;
    };
    Personaje.setProximoId = function () {
        var proximoID = this.getProximoId();
        proximoID++;
        localStorage.setItem("ID", String(proximoID));
    };
    Personaje.prototype.getId = function () {
        return this.id;
    };
    Personaje.prototype.setId = function (id) {
        this.id = id;
    };
    Personaje.prototype.getNombre = function () {
        return this.nombre;
    };
    Personaje.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Personaje.prototype.getApellido = function () {
        return this.apellido;
    };
    Personaje.prototype.setApellido = function (apellido) {
        this.apellido = apellido;
    };
    Personaje.prototype.getEdad = function () {
        return this.edad;
    };
    Personaje.prototype.setEdad = function (edad) {
        this.edad = edad;
    };
    Personaje.prototype.getCasa = function () {
        return this.casa;
    };
    Personaje.prototype.getCasaStr = function () {
        return this.casa;
    };
    Personaje.prototype.setCasa = function (casa) {
        this.casa = casa;
    };
    Personaje.prototype.setCasaStr = function (casa) {
        this.setCasa(ECasa[casa]);
    };
    Personaje.prototype.getEsTraidor = function () {
        return this.esTraidor;
    };
    Personaje.prototype.setEsTraidor = function (esTraidor) {
        this.esTraidor = esTraidor;
    };
    Personaje.prototype.getEsTraidorStr = function () {
        var retorno;
        if (this.getEsTraidor()) {
            retorno = "Si";
        }
        else {
            retorno = "No";
        }
        return retorno;
    };
    Personaje.prototype.setEsTraidorStr = function (esTraidor) {
        if (esTraidor == "Si") {
            this.setEsTraidor(true);
        }
        else if (esTraidor == "No") {
            this.setEsTraidor(false);
        }
    };
    Personaje.prototype.getDinamico = function (atributo) {
        var valor;
        switch (atributo) {
            case "id":
                valor = this.getId();
                break;
            case "nombre":
                valor = this.getNombre();
                break;
            case "apellido":
                valor = this.getApellido();
                break;
            case "edad":
                valor = this.getEdad();
                break;
            case "casa":
                valor = this.getCasa();
                break;
            case "traidor":
                valor = this.getEsTraidor();
                break;
            default:
                valor = null;
                break;
        }
        return valor;
    };
    Personaje.prototype.setDinamico = function (atributo, valor) {
        switch (atributo) {
            case "id":
                this.setId(valor);
                break;
            case "nombre":
                this.setNombre(valor);
                break;
            case "apellido":
                this.setApellido(valor);
                break;
            case "edad":
                this.setEdad(valor);
                break;
            case "casa":
                this.setCasa(valor);
                break;
            case "traidor":
                this.setEsTraidor(valor);
                break;
        }
    };
    Personaje.prototype.toString = function () {
        var texto = "";
        texto += "ID: " + this.getId() + "\n";
        texto += "NOMBRE: " + this.getNombre() + "\n";
        texto += "APELLIDO: " + this.getApellido() + "\n";
        texto += "EDAD: " + this.getEdad() + "\n";
        texto += "CASA: " + this.getCasa() + "\n";
        texto += "ES TRAIDOR: " + this.getEsTraidorStr();
        return texto;
    };
    Personaje.prototype.getAtributos = function () {
        return ["id", "nombre", "apellido", "edad", "casa", "traidor"];
    };
    return Personaje;
}());
//npm i @types/jquery
//import $ from "jquery";
window.onload = function () {
    App.asignarManejadores();
};
//$("document").ready(App.asignarManejadores);
var App = /** @class */ (function () {
    function App() {
    }
    //Al dispararse el evento load cuando se termina de cargar la página web, 
    //se instancian los manejadores del evento click de los tres botones del menú.
    App.asignarManejadores = function () {
        /*$("#btnGetPersonajes").on("click", App.traerPersonajes);
        $("#btnAltaPersonaje").on("click", App.altaPersonaje);
        $("#btnEditarPersonaje").on("click", App.editarPersonaje);*/
        $("#btnGetPersonajes").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.traerPersonajes();
            }
        });
        $("#btnAltaPersonaje").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.altaPersonaje();
            }
        });
        $("#btnEditarPersonaje").on("click", function (event) {
            if (event.target.getAttribute("aria-disabled")) {
                event.preventDefault();
            }
            else {
                App.editarPersonaje();
            }
        });
    };
    //Llama a la función traerPersonajes del localStorage, luego con los datos devueltos se crean en el DOM la tabla y el formulario de edición.
    App.traerPersonajes = function () {
        App.habilitarMenu($("#btnGetPersonajes"));
        App.activarMenu($("#btnGetPersonajes"));
        //$("#info").html("");
        $("#info").empty();
        var personajes = App.cargarArrayPersonajes();
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
        //$("#btnGetPersonajes").css("pointer-events", "auto");
        //$("#btnAltaPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnAltaPersonaje"));
    };
    App.activarMenu = function (elemento) {
        if ($(".active")[0]) {
            $(".active").attr("class", "nav-link");
        }
        elemento.parent().attr("class", "nav-link active");
    };
    App.habilitarMenu = function (elemento) {
        elemento.removeClass("disabled");
        elemento.parent().removeClass("disabled");
        elemento.css("cursor", "");
        elemento.removeAttr("aria-disabled");
    };
    //https://css-tricks.com/how-to-disable-links/
    App.deshabilitarMenu = function (elemento) {
        elemento.addClass("disabled");
        elemento.parent().addClass("disabled");
        elemento.css("cursor", "not-allowed");
        elemento.attr("aria-disabled", "true");
    };
    App.cargarArrayPersonajes = function () {
        var personajes = [];
        var storage = JSON.parse(localStorage.getItem("personajes"));
        if (storage == null || storage[0] == undefined) //Si el servidor no trae nada creo la estructura vacía.
         {
            personajes[0] = new Personaje(); //{"id":null,"nombre":null,"apellido":null,"edad":null,"casa":null,"esTraidor":null};
        }
        else {
            for (var i = 0; i < storage.length; i++) {
                personajes[i] = new Personaje(storage[i]["id"], storage[i]["nombre"], storage[i]["apellido"], storage[i]["edad"], storage[i]["casa"], storage[i]["esTraidor"]);
            }
        }
        return personajes;
    };
    App.cargarPersonajeSeleccionado = function () {
        var storage = JSON.parse(localStorage.getItem("personajeSeleccionado"));
        var personajeSeleccionado = new Personaje(storage["id"], storage["nombre"], storage["apellido"], storage["edad"], storage["casa"], storage["esTraidor"]);
        return personajeSeleccionado;
    };
    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //sin parámetro. Lo invoca la opción de Alta del menú
    App.altaPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu($("#btnAltaPersonaje"));
        //$("#btnAltaPersonaje").css("pointer-events", "none");
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    //Oculta la tabla de personajes, y muestra el formulario invocando la función pertinente
    //pasándole por parámetro la personaje que se quiere editar. Lo invoca la opción de Editar del menú
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu($("#btnEditarPersonaje"));
        //$("#btnAltaPersonaje").css("pointer-events", "none");
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    };
    //Crea la tabla de personajes en el div info
    App.crearTabla = function (personajes) {
        var puedeCrearDetalle = true; //Si no tengo elementos desde el servidor cambia a false.
        var div = $("#info");
        div.append("<table>");
        var tablaPersonajes = $("#info").children("table");
        tablaPersonajes.attr("id", "tablaPersonajes");
        $("#tablaPersonajes").attr({ "border": "1px", "class": "tablaPersonajes" });
        $("#tablaPersonajes").css("border-collapse", "collapse");
        if (personajes[0].getId() == null) //Si el servidor no trae nada creo la estructura vacía.
         {
            puedeCrearDetalle = false;
        }
        App.crearCabecera(personajes, $("#tablaPersonajes"));
        if (puedeCrearDetalle) {
            App.crearDetalle(tablaPersonajes, personajes);
        }
    };
    //Crea el formulario de edición de personajes en el div info.
    //El atributo id lo crea como solo lectura, ya que el servidor en el alta lo deduce,
    //y en la modificación no se altera su valor.
    App.crearFormulario = function (personajes) {
        var div = $("#info");
        div.append("<form id=formularioPersonajes>");
        var formulario = $("#formularioPersonajes");
        formulario.attr("action", "#");
        formulario.css("display", "none");
        formulario.append("<fieldset id=grupo>");
        var grupo = $("#grupo");
        grupo.append("<legend id=leyenda>");
        var leyenda = $("#leyenda");
        leyenda.text("Personaje");
        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "casa":
                    grupo.append("<fieldset id=grupoCasa>");
                    var grupoCasa = $("#grupoCasa");
                    grupoCasa.append("<legend id=leyendaCasa>");
                    var leyendaCasa = $("#leyendaCasa");
                    grupoCasa.attr("class", "grupoInterno");
                    leyendaCasa.text("Casa");
                    for (var unaCasa in ECasa) {
                        if (isNaN(Number(unaCasa))) //Para que no traiga los índices
                         {
                            grupoCasa.append("<input id=opt" + unaCasa + ">");
                            var optButton = $("#opt" + unaCasa);
                            grupoCasa.append("<label id=etiqueta" + unaCasa + ">");
                            var etiquetaCasa = $("#etiqueta" + unaCasa);
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
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    grupo.append("<label id=etiqueta" + value + ">");
                    var etiqueta = $("#etiqueta" + value);
                    grupo.append("<input id=txt" + atributoCapitalizado + ">");
                    var cuadroTexto = $("#txt" + atributoCapitalizado);
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado + ": ");
                    cuadroTexto.attr("type", "text");
                    if (value === "id") {
                        cuadroTexto.attr("readonly", "");
                    }
                    break;
            }
        });
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
    };
    //Arma el formulario de edición de personajes.
    //Si no se le pasa parámetro asume que se trata de un alta, para ello muestra la opción
    //que invoca la función de alta en el servidor y los cuadros de texto de los parámetros
    //en blanco.
    //Si se invoca con un objeto, la función asume modificación o baja de la personaje que viene
    //por parámetro, mostrando los botones que invocan las funciones respectivas en el servidor,
    //y completa los cuadros de texto con los valores de cada atributo.
    App.mostrarFormulario = function (personajes, personajeSeleccionado) {
        if (personajeSeleccionado !== undefined) //Es distinto de undefined si vino un argumento en los parámetros formales de la función.
         {
            $("#btnAgregar").css("display", "none");
            $("#btnModificar").css("display", "initial");
            $("#btnBorrar").css("display", "initial");
        }
        else {
            $("#btnAgregar").css("display", "initial");
            $("#btnModificar").css("display", "none");
            $("#btnBorrar").css("display", "none");
        }
        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function (value) {
            var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
            switch (value) {
                case "casa":
                    if (personajeSeleccionado !== undefined) //Modificar o Borrar
                     {
                        for (var unaCasa in ECasa) {
                            if (isNaN(Number(unaCasa))) {
                                if (unaCasa == personajeSeleccionado.getCasa()) {
                                    $("#opt" + unaCasa).prop("checked", true);
                                }
                                else {
                                    $("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    else //Agregar
                     {
                        for (var unaCasa in ECasa) {
                            if (isNaN(Number(unaCasa))) {
                                if (unaCasa == ECasa.Stark) {
                                    $("#opt" + unaCasa).prop("checked", true);
                                }
                                else {
                                    $("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    break;
                case "traidor":
                    if (personajeSeleccionado !== undefined) {
                        $("#chkTraidor").prop("checked", personajeSeleccionado.getDinamico(value));
                    }
                    else {
                        $("#chkTraidor").prop("checked", false);
                    }
                    break;
                default:
                    if (personajeSeleccionado !== undefined) {
                        $("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(value));
                    }
                    else {
                        if (value === "id") {
                            $("#txt" + atributoCapitalizado).val(Personaje.getProximoId());
                        }
                        else {
                            $("#txt" + atributoCapitalizado).val("");
                        }
                    }
                    break;
            }
        });
    };
    //Oculta el formulario de edición y muestra la tabla de personajes.
    //Se blanquea cualquier fila que se haya previamente seleccionado.
    App.ocultarFormulario = function () {
        App.activarMenu($("#btnGetPersonajes"));
        //$("#btnAltaPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnAltaPersonaje"));
        //$("#btnEditarPersonaje").css("pointer-events", "none");
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        $("#tablaPersonajes").css("display", "table");
        $("#formularioPersonajes").css("display", "none");
    };
    //Crea la fila de cabecera, con tantas columnas como atributos posea la personaje, en la tabla de personajes.
    App.crearCabecera = function (personajes, tablaPersonajes) {
        tablaPersonajes.append("<tr id=filaCabecera>");
        var fila = $("#filaCabecera");
        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function (value) {
            fila.append("<th>" + value);
        });
    };
    //Crea tantas fila de detalle en la tabla de personajes como personajes haya cargadas.
    App.crearDetalle = function (tablaPersonajes, datos) {
        var filaDetalle;
        var _loop_1 = function (i) {
            tablaPersonajes.append("<tr id=filaDetalle" + i + ">");
            filaDetalle = $("#filaDetalle" + i);
            //let columna;
            filaDetalle.on("click", App.seleccionarFila);
            //for(let atributo in datos[i].getAtributos())
            datos[i].getAtributos().forEach(function (value) {
                //filaDetalle.append("<td>");
                //columna = filaDetalle.children("td");
                //columna.attr("class", value);
                if (value == "traidor") {
                    if (datos[i].getEsTraidor()) {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">Si");
                    }
                    else {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">No");
                    }
                }
                else {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">" + datos[i].getDinamico(value));
                }
                //columna = filaDetalle.children("td");
                $("#ColumnaDetalle" + value + i).attr("class", value);
            });
        };
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
    };
    //Quita el atributo id de la fila seleccionada.
    App.blanquearFila = function () {
        $("#filaSeleccionada").removeAttr("id");
    };
    //Cuando el usuario hace click en una fila de detalle de la tabla de personajes,
    //la función le setea, previo a blanquear si hay otra fila antes seleccionada, 
    //el atributo id a la fila y carga la personaje en el array de personaje seleccionada.
    App.seleccionarFila = function () {
        var filaActual = $(this);
        //let personajeSeleccionado:Personaje = App.cargarPersonajeSeleccionado();
        var personajeSeleccionado = new Personaje();
        //$("#btnEditarPersonaje").removeAttr("disabled");
        //$("#btnEditarPersonaje").css("pointer-events", "auto");
        App.habilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        filaActual.attr("id", "filaSeleccionada");
        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        filaActual.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                //personajeSeleccionado[$(this).attr("class")] = ($(this).text() == "Si");
                personajeSeleccionado.setEsTraidorStr($(this).text());
            }
            else {
                //personajeSeleccionado[$(this).attr("class")] = $(this).text();
                personajeSeleccionado.setDinamico($(this).attr("class"), $(this).text());
            }
        });
        localStorage.setItem("personajeSeleccionado", JSON.stringify(personajeSeleccionado));
    };
    //Llamador usado por el evento dla opción de Agregar del formulario
    App.opcionAgregarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.agregarPersonaje(personajes, App.personajeEditado(personajes));
    };
    //Llamador usado por el evento dla opción de Borrar del formulario
    App.opcionBorrarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.borrarPersonaje(personajes, App.cargarPersonajeSeleccionado());
    };
    //Llamador usado por el evento dla opción de Modificar del formulario
    App.opcionModificarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.modificarPersonaje(personajes, App.cargarPersonajeSeleccionado(), App.personajeEditado(personajes));
    };
    //Llama a la función altaPersonaje del servidor, pasándole el objeto que se quiere agregar por parámetro.
    App.agregarPersonaje = function (personajes, personaje) {
        var nuevoPersonaje = [];
        personaje.setId(Personaje.getProximoId());
        nuevoPersonaje.push(personaje);
        App.ocultarFormulario();
        App.crearDetalle($("#tablaPersonajes"), nuevoPersonaje);
        if (personajes[0].getId() == null) {
            personajes[0] = personaje;
        }
        else {
            personajes.push(personaje);
        }
        localStorage.setItem("personajes", JSON.stringify(personajes));
        Personaje.setProximoId();
    };
    //Llama a la función bajaPersonaje del servidor, pasándole el objeto que se quiere eliminar por parámetro.
    App.borrarPersonaje = function (personajes, personaje) {
        /*let index:number = personajes.findIndex((per) =>
        {
            return per.id == personaje.getId();
        });*/
        var posicion = -1;
        personajes.forEach(function (value, index) {
            if (value.getId() == personaje.getId()) {
                posicion = index;
            }
        });
        if (posicion != -1) {
            personajes.splice(posicion, 1);
            alert("Personaje:\n\n" + personaje.toString() + "\n\nfue borrada de la tabla");
            $("#filaSeleccionada").remove();
        }
        App.ocultarFormulario();
        localStorage.setItem("personajes", JSON.stringify(personajes));
    };
    //Llama a la función modificarPersonaje del servidor, pasándole el objeto que se quiere modificar por parámetro.
    App.modificarPersonaje = function (personajes, personaPre, personaPost) {
        /*let index:number = personajes.findIndex((per) =>
        {
            return per.id == personaPost.getId();
        });*/
        var posicion = -1;
        personajes.forEach(function (value, index) {
            if (value.getId() == personaPost.getId()) {
                posicion = index;
            }
        });
        if (posicion != -1) {
            personajes.splice(posicion, 1);
            personajes.push(personaPost);
            alert("Personaje:\n\n" + personaPre.toString() + "\n\nfue modificada a:\n\n" + personaPost.toString());
            App.modificarFilaSeleccionada(personaPost);
        }
        App.ocultarFormulario();
        localStorage.setItem("personajes", JSON.stringify(personajes));
    };
    //Modifica los datos de la fila seleccionada con los datos de la personaje pasada por parámetro.
    //Esta función la invoca la opción de modificar una personaje del servidor,
    //una vez devuelto el ok del mismo.
    App.modificarFilaSeleccionada = function (datos) {
        var filaSeleccionada = $("#filaSeleccionada");
        //Recorro las columnas de la fila seleccionada, guardando un atributo por columna en personajeSeleccionado.
        //for(var i = 0; i < filaSeleccionada.children().length; i++)
        filaSeleccionada.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                //if(datos[$(this).attr("class")])
                if (datos.getDinamico($(this).attr("class"))) {
                    $(this).text("Si");
                }
                else {
                    $(this).text("No");
                }
            }
            else {
                //$(this).text(datos[$(this).attr("class")]);
                $(this).text(datos.getDinamico($(this).attr("class")));
            }
        });
    };
    //Crea un objeto JSON a partir de los datos del formulario
    App.personajeEditado = function (personajes) {
        var personaje = new Personaje();
        //for(let atributo in personajes[0].getAtributos())
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "casa":
                    var valor = String($('input[name="casa"]:checked').val());
                    personaje.setCasaStr(valor);
                    break;
                case "traidor":
                    personaje.setEsTraidor($("#chkTraidor").prop("checked"));
                    break;
                default:
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Primer letra en mayuscula, resto minuscula
                    personaje.setDinamico(value, $("#txt" + atributoCapitalizado).val());
                    break;
            }
        });
        return personaje;
    };
    return App;
}());
