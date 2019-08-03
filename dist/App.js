"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = __importDefault(require("jquery"));
var App = (function () {
    function App() {
    }
    App.asignarManejadores = function () {
        jquery_1.default("#btnGetPersonajes").on("click", App.traerPersonajes);
        jquery_1.default("#btnAltaPersonaje").on("click", App.altaPersonaje);
        jquery_1.default("#btnEditarPersonaje").on("click", App.editarPersonaje);
    };
    App.traerPersonajes = function () {
        App.activarMenu(jquery_1.default("#btnGetPersonajes"));
        jquery_1.default("#info").html("");
        var personajes = App.cargarArrayPersonajes();
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
        jquery_1.default("#btnGetPersonajes").css("pointer-events", "auto");
        jquery_1.default("#btnAltaPersonaje").css("pointer-events", "auto");
    };
    App.activarMenu = function (elemento) {
        if (jquery_1.default(".active")[0]) {
            jquery_1.default(".active").removeAttr("class");
        }
        elemento.attr("class", "active");
    };
    App.cargarArrayPersonajes = function () {
        var personajes = [];
        var storage = JSON.parse(localStorage.getItem("personajes"));
        if (storage == null || storage[0] == undefined) {
            personajes[0] = { "id": null, "nombre": null, "apellido": null, "edad": null, "casa": null, "esTraidor": null };
        }
        else {
            personajes = storage;
        }
        return personajes;
    };
    App.altaPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu(jquery_1.default("#btnAltaPersonaje"));
        jquery_1.default("#btnAltaPersonaje").css("pointer-events", "none");
        jquery_1.default("#btnEditarPersonaje").css("pointer-events", "none");
        jquery_1.default("#tablaPersonajes").css("display", "none");
        jquery_1.default("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.activarMenu(jquery_1.default("#btnEditarPersonaje"));
        jquery_1.default("#btnAltaPersonaje").css("pointer-events", "none");
        jquery_1.default("#btnEditarPersonaje").css("pointer-events", "none");
        jquery_1.default("#tablaPersonajes").css("display", "none");
        jquery_1.default("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes, personajeSeleccionado);
    };
    App.crearTabla = function (personajes) {
        var puedeCrearDetalle = true;
        var div = jquery_1.default("#info");
        div.append("<table>");
        var tablaPersonajes = jquery_1.default("#info").children("table");
        tablaPersonajes.attr("id", "tablaPersonajes");
        jquery_1.default("#tablaPersonajes").attr({ "border": "1px", "class": "tablaPersonajes" });
        jquery_1.default("#tablaPersonajes").css("border-collapse", "collapse");
        if (personajes[0].getId() == null) {
            puedeCrearDetalle = false;
        }
        crearCabecera(personajes, jquery_1.default("#tablaPersonajes"));
        if (puedeCrearDetalle) {
            crearDetalle(personajes, tablaPersonajes, personajes);
        }
    };
    App.crearFormulario = function (personajes) {
        var div = jquery_1.default("#info");
        div.append("<form id=formularioPersonajes>");
        var formulario = jquery_1.default("#formularioPersonajes");
        formulario.attr("action", "#");
        formulario.css("display", "none");
        formulario.append("<fieldset id=grupo>");
        var grupo = jquery_1.default("#grupo");
        grupo.append("<legend id=leyenda>");
        var leyenda = jquery_1.default("#leyenda");
        leyenda.text("Personaje");
        for (var atributo in personajes[0]) {
            switch (atributo) {
                case "casa":
                    grupo.append("<fieldset id=grupoCasa>");
                    var grupoCasa = jquery_1.default("#grupoCasa");
                    grupoCasa.append("<legend id=leyendaCasa>");
                    var leyendaCasa = jquery_1.default("#leyendaCasa");
                    grupoCasa.attr("class", "grupoInterno");
                    leyendaCasa.text("Casa");
                    for (var unaCasa in ECasa) {
                        if (isNaN(Number(unaCasa))) {
                            grupoCasa.append("<input id=opt" + unaCasa + ">");
                            var optButton = jquery_1.default("#opt" + unaCasa);
                            grupoCasa.append("<label id=etiqueta" + unaCasa + ">");
                            var etiquetaCasa = jquery_1.default("#etiqueta" + unaCasa);
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
                    var grupoTraidor = jquery_1.default("#grupoTraidor");
                    grupoTraidor.append("<input id=chkTraidor>");
                    var chkTraidor = jquery_1.default("#chkTraidor");
                    grupoTraidor.append("<label id=etiquetaTraidor>");
                    var etiquetaTraidor = jquery_1.default("#etiquetaTraidor");
                    grupoTraidor.attr("class", "grupoInterno");
                    chkTraidor.attr("type", "checkbox");
                    chkTraidor.attr("name", "traidor");
                    chkTraidor.attr("value", "traidor");
                    chkTraidor.text("Es Traidor");
                    etiquetaTraidor.attr("for", "chkTraidor");
                    etiquetaTraidor.text("Es Traidor");
                    break;
                default:
                    var atributoCapitalizado = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase();
                    grupo.append("<label id=etiqueta" + atributo + ">");
                    var etiqueta = jquery_1.default("#etiqueta" + atributo);
                    grupo.append("<input id=txt" + atributoCapitalizado + ">");
                    var cuadroTexto = jquery_1.default("#txt" + atributoCapitalizado);
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado + ": ");
                    cuadroTexto.attr("type", "text");
                    if (atributo === "id") {
                        cuadroTexto.attr("readonly", "");
                    }
                    break;
            }
        }
        grupo.append("<input id=btnAgregar>");
        var btnAgregar = jquery_1.default("#btnAgregar");
        grupo.append("<input id=btnModificar>");
        var btnModificar = jquery_1.default("#btnModificar");
        grupo.append("<input id=btnBorrar>");
        var btnBorrar = jquery_1.default("#btnBorrar");
        grupo.append("<input id=btnCancelar>");
        var btnCancelar = jquery_1.default("#btnCancelar");
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
            jquery_1.default("#btnAgregar").css("display", "none");
            jquery_1.default("#btnModificar").css("display", "initial");
            jquery_1.default("#btnBorrar").css("display", "initial");
        }
        else {
            jquery_1.default("#btnAgregar").css("display", "initial");
            jquery_1.default("#btnModificar").css("display", "none");
            jquery_1.default("#btnBorrar").css("display", "none");
        }
        for (var atributo in personajes[0]) {
            var atributoCapitalizado = atributo.charAt(0).toUpperCase() + atributo.slice(1).toLowerCase();
            switch (atributo) {
                case "casa":
                    if (personajeSeleccionado !== undefined) {
                        for (var unaCasa in ECasa) {
                            if (isNaN(Number(unaCasa))) {
                                if (unaCasa == personajeSeleccionado.getCasa()) {
                                    jquery_1.default("#opt" + unaCasa).prop("checked", true);
                                }
                                else {
                                    jquery_1.default("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    else {
                        for (var unaCasa in ECasa) {
                            if (isNaN(Number(unaCasa))) {
                                if (unaCasa == ECasa.stark) {
                                    jquery_1.default("#opt" + unaCasa).prop("checked", true);
                                }
                                else {
                                    jquery_1.default("#opt" + unaCasa).prop("checked", false);
                                }
                            }
                        }
                    }
                    break;
                case "traidor":
                    if (personajeSeleccionado !== undefined) {
                        jquery_1.default("#chkTraidor").prop("checked", personajeSeleccionado.getDinamico(atributo));
                    }
                    else {
                        jquery_1.default("#chkTraidor").prop("checked", false);
                    }
                    break;
                default:
                    if (personajeSeleccionado !== undefined) {
                        jquery_1.default("#txt" + atributoCapitalizado).val(personajeSeleccionado.getDinamico(atributo));
                    }
                    else {
                        if (atributo === "id") {
                            jquery_1.default("#txt" + atributoCapitalizado).val(Personaje.getProximoId());
                        }
                        else {
                            jquery_1.default("#txt" + atributoCapitalizado).val("");
                        }
                    }
                    break;
            }
        }
    };
    return App;
}());
