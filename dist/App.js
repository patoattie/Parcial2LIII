window.onload = function () {
    App.asignarManejadores();
};
var App = (function () {
    function App() {
    }
    App.asignarManejadores = function () {
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
    App.traerPersonajes = function () {
        App.habilitarMenu($("#btnGetPersonajes"));
        App.activarMenu($("#btnGetPersonajes"));
        $("#info").empty();
        var personajes = App.cargarArrayPersonajes();
        App.crearTabla(personajes);
        App.crearFormulario(personajes);
        App.habilitarMenu($("#btnAltaPersonaje"));
    };
    App.activarMenu = function (elemento) {
        if ($(".active")[0]) {
            $(".active").addClass("active");
        }
    };
    App.habilitarMenu = function (elemento) {
        elemento.removeClass("disabled");
        elemento.parent().removeClass("disabled");
        elemento.css("cursor", "");
        elemento.removeAttr("aria-disabled");
    };
    App.deshabilitarMenu = function (elemento) {
        elemento.addClass("disabled");
        elemento.parent().addClass("disabled");
        elemento.css("cursor", "not-allowed");
        elemento.attr("aria-disabled", "true");
    };
    App.cargarArrayPersonajes = function () {
        var personajes = [];
        var storage = JSON.parse(localStorage.getItem("personajes"));
        if (storage == null || storage[0] == undefined) {
            personajes[0] = new Personaje();
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
    App.altaPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes, App.cargarPersonajeSeleccionado());
    };
    App.crearTabla = function (personajes) {
        var puedeCrearDetalle = true;
        var div = $("#info");
        div.append("<div id=divTablaPersonajes>");
        $("#divTablaPersonajes").append("<table id=tablaPersonajes>");
        var tablaPersonajes = $("#tablaPersonajes");
        $("#tablaPersonajes").addClass("tablaPersonajes");
        $("#tablaPersonajes").addClass("table");
        $("#tablaPersonajes").addClass("table-striped");
        $("#tablaPersonajes").addClass("table-bordered");
        $("#tablaPersonajes").addClass("table-hover");
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
        formulario.append("<div id=grupo>");
        var grupo = $("#grupo");
        grupo.addClass("form-group");
        grupo.append("<h5 id=leyenda>");
        var leyenda = $("#leyenda");
        leyenda.text("Personaje");
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "casa":
                    grupo.append("<div id=grupoCasa>");
                    var grupoCasa = $("#grupoCasa");
                    grupoCasa.addClass("form-check-inline");
                    grupoCasa.append("<h5 id=leyendaCasa>");
                    var leyendaCasa = $("#leyendaCasa");
                    grupoCasa.addClass("grupoInterno");
                    leyendaCasa.text("Casa");
                    for (var unaCasa in ECasa) {
                        if (isNaN(Number(unaCasa))) {
                            grupoCasa.append("<label id=etiqueta" + unaCasa + ">");
                            var etiquetaCasa = $("#etiqueta" + unaCasa);
                            etiquetaCasa.attr("for", "opt" + unaCasa);
                            etiquetaCasa.addClass("form-check");
                            etiquetaCasa.addClass("form-check-label");
                            etiquetaCasa.append("<input id=opt" + unaCasa + ">");
                            var optButton = $("#opt" + unaCasa);
                            optButton.attr("type", "radio");
                            optButton.attr("name", "casa");
                            optButton.attr("value", unaCasa);
                            optButton.addClass("form-check-input");
                            optButton.text(" " + unaCasa);
                        }
                    }
                    break;
                case "traidor":
                    grupo.append("<div id=grupoTraidor>");
                    var grupoTraidor = $("#grupoTraidor");
                    grupoTraidor.addClass("form-check");
                    grupoTraidor.addClass("form-check-inline");
                    grupoTraidor.append("<label id=etiquetaTraidor>");
                    var etiquetaTraidor = $("#etiquetaTraidor");
                    etiquetaTraidor.append("<input id=chkTraidor>");
                    var chkTraidor = $("#chkTraidor");
                    grupoTraidor.addClass("grupoInterno");
                    chkTraidor.attr("type", "checkbox");
                    chkTraidor.attr("name", "traidor");
                    chkTraidor.attr("value", "traidor");
                    chkTraidor.addClass("form-check-input");
                    chkTraidor.text("Es Traidor");
                    etiquetaTraidor.attr("for", "chkTraidor");
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
                    cuadroTexto.addClass("form-control");
                    if (value === "id") {
                        cuadroTexto.attr("readonly", "");
                    }
                    break;
            }
        });
        grupo.append("<button id=btnAgregar>");
        var btnAgregar = $("#btnAgregar");
        grupo.append("<button id=btnModificar>");
        var btnModificar = $("#btnModificar");
        grupo.append("<button id=btnBorrar>");
        var btnBorrar = $("#btnBorrar");
        grupo.append("<button id=btnCancelar>");
        var btnCancelar = $("#btnCancelar");
        btnAgregar.attr("type", "button");
        btnAgregar.text("Agregar");
        btnAgregar.addClass("btn btn-primary");
        btnAgregar.on("click", App.opcionAgregarPersonaje);
        btnModificar.attr("type", "button");
        btnModificar.text("Modificar");
        btnModificar.addClass("btn btn-primary");
        btnModificar.on("click", App.opcionModificarPersonaje);
        btnBorrar.attr("type", "button");
        btnBorrar.text("Borrar");
        btnBorrar.addClass("btn btn-danger");
        btnBorrar.on("click", App.opcionBorrarPersonaje);
        btnCancelar.attr("type", "button");
        btnCancelar.text("Cancelar");
        btnCancelar.addClass("btn btn-secondary");
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
        App.habilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        $("#tablaPersonajes").css("display", "table");
        $("#formularioPersonajes").css("display", "none");
        App.activarMenu($("#btnGetPersonajes"));
    };
    App.crearCabecera = function (personajes, tablaPersonajes) {
        tablaPersonajes.append("<thead id=thead1>");
        $("#thead1").append("<tr id=filaCabecera>");
        var fila = $("#filaCabecera");
        personajes[0].getAtributos().forEach(function (value) {
            fila.append("<th id=ColumnaCabecera" + value + ">" + value);
        });
    };
    App.crearDetalle = function (tablaPersonajes, datos) {
        var filaDetalle;
        tablaPersonajes.append("<tbody id=tbody1>");
        var _loop_1 = function (i) {
            $("#tbody1").append("<tr id=filaDetalle" + i + ">");
            filaDetalle = $("#filaDetalle" + i);
            filaDetalle.on("click", App.seleccionarFila);
            datos[i].getAtributos().forEach(function (value) {
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
                $("#ColumnaDetalle" + value + i).addClass(value);
            });
        };
        for (var i = 0; i < datos.length; i++) {
            _loop_1(i);
        }
    };
    App.blanquearFila = function () {
        $("#filaSeleccionada").removeClass("table-primary");
        $("#filaSeleccionada").removeAttr("id");
        localStorage.removeItem("personajeSeleccionado");
    };
    App.seleccionarFila = function () {
        var filaActual = $(this);
        var personajeSeleccionado = new Personaje();
        App.habilitarMenu($("#btnEditarPersonaje"));
        App.blanquearFila();
        filaActual.attr("id", "filaSeleccionada");
        filaActual.addClass("table-primary");
        filaActual.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                personajeSeleccionado.setEsTraidorStr($(this).text());
            }
            else {
                personajeSeleccionado.setDinamico($(this).attr("class"), $(this).text());
            }
        });
        localStorage.setItem("personajeSeleccionado", JSON.stringify(personajeSeleccionado));
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
    App.borrarPersonaje = function (personajes, personaje) {
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
    App.modificarPersonaje = function (personajes, personaPre, personaPost) {
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
    App.modificarFilaSeleccionada = function (datos) {
        var filaSeleccionada = $("#filaSeleccionada");
        filaSeleccionada.children().each(function () {
            if ($(this).attr("class") == "traidor") {
                if (datos.getDinamico($(this).attr("class"))) {
                    $(this).text("Si");
                }
                else {
                    $(this).text("No");
                }
            }
            else {
                $(this).text(datos.getDinamico($(this).attr("class")));
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
