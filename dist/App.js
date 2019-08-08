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
        App.deshabilitarMenu($("#btnEditarPersonaje"));
    };
    App.activarMenu = function (elemento) {
        elemento.parent().addClass("active");
    };
    App.desactivarMenu = function (elemento) {
        elemento.parent().removeClass("active");
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
        App.desactivarMenu($("#btnGetPersonajes"));
        $("#tablaPersonajes").css("display", "none");
        $("#formularioPersonajes").css("display", "initial");
        App.mostrarFormulario(personajes);
    };
    App.editarPersonaje = function () {
        var personajes = App.cargarArrayPersonajes();
        App.deshabilitarMenu($("#btnAltaPersonaje"));
        App.deshabilitarMenu($("#btnEditarPersonaje"));
        App.desactivarMenu($("#btnGetPersonajes"));
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
        div.append("<div id=infoForm>");
        $("#infoForm").addClass("container");
        $("#infoForm").append("<form id=formularioPersonajes>");
        var formulario = $("#formularioPersonajes");
        formulario.attr("action", "#");
        formulario.css("display", "none");
        personajes[0].getAtributos().forEach(function (value) {
            switch (value) {
                case "casa":
                    formulario.append("<fieldset id=grupoCasa>");
                    var grupoCasa = $("#grupoCasa");
                    grupoCasa.addClass("form-group");
                    grupoCasa.append("<div id=grupoCasa2>");
                    var grupoCasa2 = $("#grupoCasa2");
                    grupoCasa2.addClass("row");
                    grupoCasa2.append("<legend id=leyendaCasa>");
                    var leyendaCasa = $("#leyendaCasa");
                    leyendaCasa.addClass("col-form-label col-sm-2 pt-0");
                    leyendaCasa.text("Casa");
                    grupoCasa2.append("<div id=grupoCasa3>");
                    var grupoCasa3 = $("#grupoCasa3");
                    grupoCasa3.addClass("col-sm-10");
                    grupoCasa.addClass("grupoInterno");
                    for (var unaCasa in ECasa) {
                        if (isNaN(Number(unaCasa))) {
                            grupoCasa3.append("<div id=grupoCasa" + unaCasa + ">");
                            var grupoCasa4 = $("#grupoCasa" + unaCasa);
                            grupoCasa4.addClass("form-check");
                            grupoCasa4.append("<input id=opt" + unaCasa + ">");
                            var optButton = $("#opt" + unaCasa);
                            grupoCasa4.append("<label id=etiqueta" + unaCasa + ">");
                            var etiquetaCasa = $("#etiqueta" + unaCasa);
                            etiquetaCasa.attr("for", "opt" + unaCasa);
                            etiquetaCasa.text(unaCasa);
                            etiquetaCasa.addClass("form-check-label");
                            optButton.attr("type", "radio");
                            optButton.attr("name", "casa");
                            optButton.attr("value", unaCasa);
                            optButton.addClass("form-check-input");
                        }
                    }
                    break;
                case "traidor":
                    formulario.append("<div id=grupoTraidor>");
                    var grupoTraidor = $("#grupoTraidor");
                    grupoTraidor.addClass("form-group row");
                    grupoTraidor.append("<div id=grupoTraidor1>");
                    var grupoTraidor1 = $("#grupoTraidor1");
                    grupoTraidor1.addClass("col-sm-2");
                    grupoTraidor1.text("Es traidor");
                    grupoTraidor.append("<div id=grupoTraidor2>");
                    var grupoTraidor2 = $("#grupoTraidor2");
                    grupoTraidor2.addClass("col-sm-10");
                    grupoTraidor2.append("<div id=grupoTraidor3>");
                    var grupoTraidor3 = $("#grupoTraidor3");
                    grupoTraidor3.addClass("form-check");
                    grupoTraidor3.append("<input id=chkTraidor>");
                    var chkTraidor = $("#chkTraidor");
                    grupoTraidor3.append("<label id=etiquetaTraidor>");
                    var etiquetaTraidor = $("#etiquetaTraidor");
                    grupoTraidor.addClass("grupoInterno");
                    chkTraidor.attr("type", "checkbox");
                    chkTraidor.addClass("form-check-input");
                    chkTraidor.text("Es Traidor");
                    etiquetaTraidor.attr("for", "chkTraidor");
                    break;
                default:
                    formulario.append("<div id=grupo" + value + ">");
                    var grupo = $("#grupo" + value);
                    grupo.addClass("form-group row");
                    var atributoCapitalizado = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                    grupo.append("<label id=etiqueta" + value + ">");
                    var etiqueta = $("#etiqueta" + value);
                    etiqueta.addClass("col-sm-2 col-form-label");
                    etiqueta.attr("for", "txt" + atributoCapitalizado);
                    etiqueta.text(atributoCapitalizado);
                    grupo.append("<div id=grupoInput" + value + ">");
                    var grupoInput = $("#grupoInput" + value);
                    grupoInput.addClass("col-sm-10");
                    grupoInput.append("<input id=txt" + atributoCapitalizado + ">");
                    var cuadroTexto = $("#txt" + atributoCapitalizado);
                    cuadroTexto.attr("type", "text");
                    cuadroTexto.attr("placeholder", "Ingrese " + value);
                    cuadroTexto.addClass("form-control");
                    if (value === "id") {
                        cuadroTexto.attr("readonly", "");
                    }
                    break;
            }
        });
        formulario.append("<div id=grupoButton>");
        var grupoButton = $("#grupoButton");
        grupoButton.addClass("form-group row");
        grupoButton.append("<button id=btnAgregar>");
        var btnAgregar = $("#btnAgregar");
        grupoButton.append("<button id=btnModificar>");
        var btnModificar = $("#btnModificar");
        grupoButton.append("<button id=btnBorrar>");
        var btnBorrar = $("#btnBorrar");
        grupoButton.append("<button id=btnCancelar>");
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
            $("#tbody1").append("<tr id=filaDetalle" + datos[i].getId() + ">");
            filaDetalle = $("#filaDetalle" + datos[i].getId());
            filaDetalle.on("click", App.seleccionarFila);
            datos[i].getAtributos().forEach(function (value) {
                if (value == "traidor") {
                    if (datos[i].getEsTraidor()) {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + datos[i].getId() + ">Si");
                    }
                    else {
                        filaDetalle.append("<td id=ColumnaDetalle" + value + datos[i].getId() + ">No");
                    }
                }
                else {
                    filaDetalle.append("<td id=ColumnaDetalle" + value + datos[i].getId() + ">" + datos[i].getDinamico(value));
                }
                $("#ColumnaDetalle" + value + datos[i].getId()).addClass(value);
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
