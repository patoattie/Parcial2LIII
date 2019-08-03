class Personaje
{
    private id:number;
    private nombre:string;
    private apellido:string;
    private edad:number;
    private casa:ECasa;
    private esTraidor:boolean;

    constructor(nombre:string, apellido:string, edad:number, casa:ECasa, esTraidor:boolean)
    {
        this.id = Personaje.getProximoId();
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.casa = casa;
        this.esTraidor = esTraidor;
    }

    public static getProximoId():number
    {
        let proximoID:number = Number(localStorage.getItem("ID"));

        if(isNaN(proximoID))
        {
            proximoID = 20000;
        }
    
        localStorage.setItem("ID", String(proximoID++));

        return proximoID;
    }

    public getId():number
    {
        return this.id;
    }

    public getNombre():string
    {
        return this.nombre;
    }

    public getApellido():string
    {
        return this.apellido;
    }

    public getEdad():number
    {
        return this.edad;
    }

    public getCasa():ECasa
    {
        return this.casa;
    }

    public getEsTraidor():boolean
    {
        return this.esTraidor;
    }

    public getEsTraidorStr():string
    {
        let retorno:string;

        if(this.getEsTraidor())
        {
            retorno = "Si";
        }
        else
        {
            retorno = "No";
        }

        return retorno;
    }

    public getDinamico(atributo:string):any
    {
        let valor:any;

        switch(atributo)
        {
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
            case "esTraidor":
                valor = this.getEsTraidor();
                break;
            default:
                valor = null;
                break;
        }

        return valor;
    }

    public toString():string
    {
        let texto:string = "";

        texto += "ID: " + this.getId() + "\n";
        texto += "NOMBRE: " + this.getNombre() + "\n";
        texto += "APELLIDO: " + this.getApellido() + "\n";
        texto += "EDAD: " + this.getEdad() + "\n";
        texto += "CASA: " + this.getCasa() + "\n";
        texto += "ES TRAIDOR: " + this.getEsTraidorStr();
    
        return texto;
    }
}