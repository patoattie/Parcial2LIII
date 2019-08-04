class Personaje
{
    private id:number;
    private nombre:string;
    private apellido:string;
    private edad:number;
    private casa:ECasa;
    private esTraidor:boolean;

    /*constructor(nombre:string, apellido:string, edad:number, casa:ECasa, esTraidor:boolean)
    {
        this.id = Personaje.getProximoId();
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.casa = casa;
        this.esTraidor = esTraidor;
    }*/

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

    public setId(id:number):void
    {
        this.id = id;
    }

    public getNombre():string
    {
        return this.nombre;
    }

    public setNombre(nombre:string):void
    {
        this.nombre = nombre;
    }

    public getApellido():string
    {
        return this.apellido;
    }

    public setApellido(apellido:string):void
    {
        this.apellido = apellido;
    }

    public getEdad():number
    {
        return this.edad;
    }

    public setEdad(edad:number):void
    {
        this.edad = edad;
    }

    public getCasa():ECasa
    {
        return this.casa;
    }

    public getCasaStr():string
    {
        return this.casa;
    }

    public setCasa(casa:ECasa):void
    {
        this.casa = casa;
    }

    public setCasaStr(casa:string):void
    {
        this.setCasa(ECasa[casa]);
    }

    public getEsTraidor():boolean
    {
        return this.esTraidor;
    }

    public setEsTraidor(esTraidor:boolean):void
    {
        this.esTraidor = esTraidor;
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

    public setEsTraidorStr(esTraidor:string):void
    {
        if(esTraidor == "Si")
        {
            this.setEsTraidor(true);
        }
        else if(esTraidor == "No")
        {
            this.setEsTraidor(false);
        }
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

    public setDinamico(atributo:string, valor:any):void
    {
        switch(atributo)
        {
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
            case "esTraidor":
                this.setEsTraidor(valor);
                break;
        }
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