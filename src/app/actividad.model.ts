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
       let listaActividadesActivas : Actividad[] = new Array<Actividad>();

       let actividad : Actividad = new Actividad(1, "alarm", "Dormir", true);
       listaActividadesActivas.push(actividad);
       actividad = new Actividad(2, "walk", " caminar", true);
       listaActividadesActivas.push(actividad);
       actividad = new Actividad(3, "bookmarks", "leer", true);
       listaActividadesActivas.push(actividad);
       actividad= new  Actividad(4,"pizza", "comer", true);
       listaActividadesActivas.push(actividad);

       return listaActividadesActivas;
    }
}