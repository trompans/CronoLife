export class Actividad {
    idActividad : number;
    icono : string;
    nombre : string;
    activo : boolean;
    
    constructor(idActividad : number, icono : string, nombre : string, activo : boolean) {
        this.idActividad = idActividad; 
        this.icono = icono;
        this.nombre = nombre;
        this.activo = activo;
    }
    static getActividadesActivas() : Actividad[] {
       let listaActividadesActivas : Actividad[];

       return listaActividadesActivas;
    }
}