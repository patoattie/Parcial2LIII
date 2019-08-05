var Personaje = (function () {
    function Personaje(id, nombre, apellido, edad, casa, esTraidor) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.casa = ECasa[casa];
        this.esTraidor = esTraidor;
    }
    Personaje.getProximoId = function () {
        var proximoID = Number(localStorage.getItem("ID"));
        if (isNaN(proximoID)) {
            proximoID = 20000;
        }
        return proximoID;
    };
    Personaje.setProximoId = function () {
        var proximoID = this.getProximoId();
        localStorage.setItem("ID", String());
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
