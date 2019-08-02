var Personaje = (function () {
    function Personaje(nombre, apellido, edad, casa, esTraidor) {
        this.id = Personaje.getProximoId();
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.casa = casa;
        this.esTraidor = esTraidor;
    }
    Personaje.getProximoId = function () {
        var proximoID = Number(localStorage.getItem("ID"));
        if (isNaN(proximoID)) {
            proximoID = 20000;
        }
        localStorage.setItem("ID", String(proximoID++));
        return proximoID;
    };
    Personaje.prototype.getId = function () {
        return this.id;
    };
    Personaje.prototype.getNombre = function () {
        return this.nombre;
    };
    Personaje.prototype.getApellido = function () {
        return this.apellido;
    };
    Personaje.prototype.getEdad = function () {
        return this.edad;
    };
    Personaje.prototype.getCasa = function () {
        return this.casa;
    };
    Personaje.prototype.getEsTraidor = function () {
        return this.esTraidor;
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
    return Personaje;
}());
