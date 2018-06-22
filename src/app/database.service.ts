import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Actividad } from './actividad.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class DatabaseService {

    actividad: Actividad;
    edit: boolean;
    private database: SQLiteObject;
    private dbReady = new BehaviorSubject<boolean>(false);

    constructor(private sqlite: SQLite ) {


    } 
    /*  idActividad : number;icono : string;nombre : string; activo : boolean;*/

    prepararBD() {
        console.log("entro en prepararBD");
        
            this.sqlite.create({
                name: 'Crono.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.database = db;
                    console.log("tengo acceso a la bd")
                    this.createTables().then(() => {
                        //communicate we are ready!
                        this.dbReady.next(true);
                        console.log("he creado las tablas");
                    });
                });
    }

    isReady() {
        console.log("estoy en isready");
        return new Promise((resolve, reject) => {
            //if dbReady is true, resolve
            if (this.dbReady.getValue()) {
                resolve();
            }
            //otherwise, wait to resolve until dbReady returns true
            else {
                this.dbReady.subscribe((ready) => {
                    if (ready) {
                        resolve();
                    }
                });
            }
        })
    }
    createTables(): Promise<any> {
        return this.database.executeSql(`CREATE TABLE IF NOT EXISTS actividades (idActividad INTEGER PRIMARY KEY AUTOINCREMENT,
            icono TEXT,nombre TEXT,activo BOOLEAN);`
            , {})
            .then(() => {
                console.log("estoy creando tablas");
                return this.database.executeSql(`CREATE TABLE IF NOT EXISTS tiempos (idTiempo INTEGER PRIMARY KEY AUTOINCREMENT,
                    tInicio DATETIME, tFinal DATETIME, idActividad INTEGER, FOREIGN KEY(idActividad) REFERENCES actividades(idActividad));`, {})
            }).catch((err) => console.log("error detected creating tables", err));
    }
    insertarActividad(actividad: Actividad): Promise<any> {
        console.log("estoy en insertarActividad()");
        let sql = "INSERT INTO actividades ( icono, nombre,activo ) values (?,?,?)";
        return this.database.executeSql(sql, [actividad.icono,
        actividad.nombre, 1]);
    }
    borrarActividad(idActividad: number): Promise<any> {


        // HAY QUE BORRAR LOS TIEMPOS ASOCIADOS A LA ACTIVIDAD SI LOS HUBIERA


        let sql = "DELETE FROM actividades WHERE idActividad = ?";
        return this.database.executeSql(sql, [idActividad]);


    }
    modificarActividad(actividad): Promise<any> {
        let sql = "UPDATE actividades SET icono = ? , nombre = ? WHERE idActividad = ?";
        console.log("icono " + actividad.icono);
        console.log("nombre " + actividad.nombre);
        console.log("idactividad " + actividad.idActividad)
        return this.database.executeSql(sql, [actividad.icono,
        actividad.nombre, actividad.idActividad]);
    }
    getTodasActividades(): Promise<any> {
        let sql = "SELECT * FROM actividades";
        return this.database.executeSql(sql, {});
    }
    desactivarActividad(idActividad: number): Promise<any> {
        console.log("voy a desactivar Actividad en la BD: idActividad="+ idActividad);
        let sql = "UPDATE actividades SET activo = 0 WHERE idActividad = ? ";
        return this.database.executeSql(sql, [ idActividad ]);
    }
    reactivarActividad(idActividad: number): Promise<any> {
        console.log("voy a reactivar Actividad en la BD: idActividad="+ idActividad);
        let sql = "UPDATE actividades SET activo = 1 WHERE idActividad = ? ";
        return this.database.executeSql(sql, [ idActividad ]);
    }
    iniciarActividad(idActividad: number): Promise<any> {
        let inicio: number = Date.now();
        let sql = "INSERT INTO tiempos ( tInicio, idActividad ) values (?,?) ";
        return this.database.executeSql(sql, [ inicio, idActividad ]);
    }
    finalizarActividad(idTiempo: number): Promise<any> {

        let final: number = Date.now();
        let sql = "UPDATE tiempos SET tFinal =  ? WHERE idTiempo = ? ";
        return this.database.executeSql(sql, [ final, idTiempo ]);
    }
    getActividadesActivas(): Promise<any> {
        console.log("estoy en getActividadesActivas");

        return this.isReady()
        .then(()=>{
            console.log("voy a buscar en la BD");
            let sql = "SELECT * FROM actividades WHERE activo = 1 ";
            return this.database.executeSql(sql, [])
            .then((data)=>{
                let lists = [];
                for(let i=0; i<data.rows.length; i++){
                    lists.push(data.rows.item(i));
                }
                return lists;
            })
        })

    }
    getActividadesInactivas(): Promise<any> {
        console.log("voy a buscar las actividades ocultas en la BD");
        let sql = "SELECT * FROM actividades WHERE activo = 0 ";
        return this.database.executeSql(sql, [])
        .then((data)=>{
            let lists = [];
            for(let i=0; i<data.rows.length; i++){
                lists.push(data.rows.item(i));
            }
            return lists;
        })
    }

    getTiemposPorActividad(idActividad: number): Promise<any> {
        let sql = "SELECT * FROM tiempos WHERE idActividad = ? ";
        return this.database.executeSql(sql, [ idActividad ]);

    }


}