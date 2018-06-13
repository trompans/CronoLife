import { Time } from "@angular/common";
import { DateTimeData } from "ionic-angular/util/datetime-util";

export class RegTiempoAct {
    idRegTiempo : number;
    idActividad : number;
    inicioAct : Date;
    finAct : Date;
    
    constructor(idRegTiempo : number, idActividad : number, inicioAct : Date, finAct : Date) {
        this.idRegTiempo = idRegTiempo;
        this.idActividad = idActividad; 
        this.inicioAct = inicioAct;
        this.finAct = finAct;
    }

    static 
}