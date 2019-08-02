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
        crearTabla(personajes);
        crearFormulario(personajes);
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
            personajes[0] = { "id": null, "nombre": null, "apellido": null, "edad": null, "casa": null, "traidor": null };
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
    return App;
}());
