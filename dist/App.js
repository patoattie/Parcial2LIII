window.onload = function () {
    App.asignarManejadores();
};
var App = (function () {
    function App() {
    }
    App.asignarManejadores = function () {
        $("#btnGetPersonajes").on("click", App.traerPersonajes);
        $("#btnAltaPersonaje").on("click", App.altaPersonaje);
        $("#btnEditarPersonaje").on("click", App.editarPersonaje);
    };
    App.traerPersonajes = function () {
        App.activarMenu($("#btnGetPersonajes"));
        $("#info").html("");
        var personajes = App.cargarArrayPersonajes();
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
        $("#btnGetPersonajes").css("pointer-events", "auto");
        $("#btnAltaPersonaje").css("pointer-events", "auto");
    };
    App.activarMenu = function (elemento) {
        if ($(".active")[0]) {
            $(".active").removeAttr("class");
        }
        elemento.attr("class", "active");
    };
    App.cargarArrayPersonajes = function () {
        var personajes = [];
        var storage = JSON.parse(localStorage.getItem("personajes"));
        if (storage == null || storage[0] == undefined) {
            personajes[0] = new Personaje();
        }
        else {
            personajes = storage;
        }
        return personajes;
    };
    App.cargarPersonajeSeleccionado = function () {
        var personajeSeleccionado = JSON.parse(localStorage.getItem("personajeSeleccionado"));
        return personajeSeleccionado;
    };
    App.altaPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu($("#btnAltaPersonaje"));
        $("#btnAltaPersonaje").css("pointer-events", "none");
        $("#btnEditarPersonaje").css("pointer-events", "none");
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu($("#btnEditarPersonaje"));
        $("#btnAltaPersonaje").css("pointer-events", "none");
        $("#btnEditarPersonaje").css("pointer-events", "none");
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    };
    App.crearTabla = function (personajes) {
        var puedeCrearDetalle = true;
        var div = $("#info");
        div.append("<table>");
        var tablaPersonajes = $("#info").children("table");
        tablaPersonajes.attr("id", "tablaPersonajes");
        $("#tablaPersonajes").attr({ "border": "1px", "class": "tablaPersonajes" });
        $("#tablaPersonajes").css("border-collapse", "collapse");
        if (personajes[0].getId() == null) {
            puedeCrearDetalle = false;
        }
        App.crearCabecera(personajes, $("#tablaPersonajes"));
        if (puedeCrearDetalle) {
            App.crearDetalle(tablaPersonajes, personajes);
        }
    };
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
                        if (isNaN(Number(unaCasa))) {
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
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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
    App.mostrarFormulario = function (personajes, personajeSeleccionado) {
        if (personajeSeleccionado !== undefined) {
            $("#btnAgregar").css("display", "none");
            $("#btnModificar").css("display", "initial");
            $("#btnBorrar").css("display", "initial");
        }
        else {
            $("#btnAgregar").css("display", "initial");
            $("#btnModificar").css("display", "none");
            $("#btnBorrar").css("display", "none");
        }
        personajes[0].getAtributos().forEach(function (value) {
            var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            switch (value) {
                case "casa":
                    if (personajeSeleccionado !== undefined) {
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
                    else {
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
    App.ocultarFormulario = function () {
        App.activarMenu($("#btnGetPersonajes"));
        $("#btnAltaPersonaje").css("pointer-events", "auto");
        $("#btnEditarPersonaje").css("pointer-events", "none");
        App.blanquearFila();
        $("#tablaPersonajes").css("display", "table");
        $("#formularioPersonajes").css("display", "none");
    };
    App.crearCabecera = function (personajes, tablaPersonajes) {
        tablaPersonajes.append("<tr id=filaCabecera>");
        var fila = $("#filaCabecera");
        personajes[0].getAtributos().forEach(function (value) {
            fila.append("<th>" + value);
        });
    };
    App.crearDetalle = function (tablaPersonajes, datos) {
        var filaDetalle;
        var _loop_1 = function (i) {
            tablaPersonajes.append("<tr id=filaDetalle" + i + ">");
            filaDetalle = $("#filaDetalle" + i);
            filaDetalle.on("click", App.seleccionarFila);
            datos[i].getAtributos().forEach(function (value) {
                if (value == "traidor") {
                    if (datos[i][value]) {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">Si");
                    }
                    else {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">No");
                    }
                }
                else {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + i + ">" + datos[i][value]);
                }
                $("#ColumnaDetalle" + value + i).attr("class", value);
            });
        };
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
    };
    App.blanquearFila = function () {
        $("#filaSeleccionada").removeAttr("id");
    };
    App.seleccionarFila = function () {
        var filaActual = $(this);
        var personajeSeleccionado = App.cargarPersonajeSeleccionado();
        $("#btnEditarPersonaje").css("pointer-events", "auto");
        App.blanquearFila();
        filaActual.attr("id", "filaSeleccionada");
        filaActual.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                personajeSeleccionado[$(this).attr("class")] = ($(this).text() == "Si");
            }
            else {
                personajeSeleccionado[$(this).attr("class")] = $(this).text();
            }
        });
    };
    App.opcionAgregarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.agregarPersonaje(personajes, App.personajeEditado(personajes));
    };
    App.opcionBorrarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.borrarPersonaje(personajes, App.cargarPersonajeSeleccionado());
    };
    App.opcionModificarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.modificarPersonaje(personajes, App.cargarPersonajeSeleccionado(), App.personajeEditado(personajes));
    };
    App.agregarPersonaje = function (personajes, personaje) {
        var nuevoPersonaje = [];
        var proximoID = parseInt(localStorage.getItem("ID"));
        if (isNaN(proximoID)) {
            proximoID = 20000;
        }
        personaje.setId(proximoID);
        nuevoPersonaje.push(personaje);
        App.ocultarFormulario();
        App.crearDetalle($("#tablaPersonajes"), nuevoPersonaje);
        if (personajes[0].getId() == null) {
            personajes[0] = personaje;
        }
        else {
            personajes.push(personaje);
        }
        proximoID++;
        localStorage.setItem("personajes", JSON.stringify(personajes));
        localStorage.setItem("ID", proximoID.toString());
    };
    App.borrarPersonaje = function (personajes, personaje) {
        var index = -1;
        personajes.forEach(function (unPersonaje) {
            if (unPersonaje.getId() == personaje.getId()) {
                index = unPersonaje.getId();
            }
        });
        if (index != -1) {
            personajes.splice(index, 1);
            alert("Personaje:\n\n" + personaje.toString() + "\n\nfue borrada de la tabla");
            $("#filaSeleccionada").remove();
        }
        App.ocultarFormulario();
        localStorage.setItem("personajes", JSON.stringify(personajes));
    };
    App.modificarPersonaje = function (personajes, personaPre, personaPost) {
        var index = -1;
        personajes.forEach(function (unPersonaje) {
            if (unPersonaje.getId() == personaPost.getId()) {
                index = unPersonaje.getId();
            }
        });
        if (index != -1) {
            personajes.splice(index, 1);
            personajes.push(personaPost);
            alert("Personaje:\n\n" + personaPre.toString() + "\n\nfue modificada a:\n\n" + personaPost.toString());
            App.modificarFilaSeleccionada(personaPost);
        }
        App.ocultarFormulario();
        localStorage.setItem("personajes", JSON.stringify(personajes));
    };
    App.modificarFilaSeleccionada = function (datos) {
        var filaSeleccionada = $("#filaSeleccionada");
        filaSeleccionada.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                if (datos[$(this).attr("class")]) {
                    $(this).text("Si");
                }
                else {
                    $(this).text("No");
                }
            }
            else {
                $(this).text(datos[$(this).attr("class")]);
            }
        });
    };
    App.personajeEditado = function (personajes) {
        var personaje = new Personaje();
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
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    personaje.setDinamico(value, $("#txt" + atributoCapitalizado).val());
                    break;
            }
        });
        return personaje;
    };
    return App;
}());
