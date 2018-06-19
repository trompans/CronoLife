import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http'
import { Actividad } from './actividad.model';


@Injectable()
export class DatabaseService {

    actividad: Actividad;
    edit: boolean;
    private database: SQLiteObject;
    private dbReady = new BehaviorSubject<boolean>(false);

    constructor(private platform: Platform, private sqlite: SQLite, ) {
        // Aprovechamos el constructor para comprobar si la db existe y sino abrir la conexion y crearla
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'Crono.db',
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.database = db;

                    this.createTables().then(() => {
                        //communicate we are ready!
                        this.dbReady.next(true);
                    });
                })

        });
    } 
    /*  idActividad : number;icono : string;nombre : string; activo : boolean;*/

    isReady() {
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
                return this.database.executeSql(`CREATE TABLE IF NOT EXISTS tiempos (idTiempo INTEGER PRIMARY KEY AUTOINCREMENT,
                    tInicio DATETIME, tFinal DATETIME, idActividad INTEGER, FOREIGN KEY(idActividad) REFERENCES actividades(idActividad));`, {})
            }).catch((err) => console.log("error detected creating tables", err));
    }
    añadirActividad(actividad: Actividad): Promise<any> {
        let sql = "INSERT INTO actividades ( icono, nombre,activo ) values (?,?,?)";
        return this.database.executeSql(sql, [actividad.icono,
        actividad.nombre, true]);
    }
    borrarActividad(idActividad: number): Promise<any> {
        let sql = "DELETE FROM actividades WHERE idActividad = ?";
        return this.database.executeSql(sql, [idActividad]);
    }
    modificarActividad(actividad): Promise<any> {
        let sql = "UPDATE actividades SET ( icono = ? , nombre = ? ) WHERE idActividad = ? ";
        return this.database.executeSql(sql, [actividad.icono,
        actividad.nombre, actividad.idActividad]);
    }
    getTodasActividades(): Promise<any> {
        let sql = "SELECT * FROM actividades";
        return this.database.executeSql(sql, {});
    }
    desactivarActividad(idActividad: number): Promise<any> {
        let sql = "UPDATE actividades SET ( activo = 0 ) WHERE idActividad = ? ";
        return this.database.executeSql(sql, { idActividad });
    }
    reactivarActividad(idActividad: number): Promise<any> {

        let sql = "UPDATE actividades SET ( activo = 1 ) WHERE idActividad = ? ";
        return this.database.executeSql(sql, { idActividad });
    }
    iniciarActividad(idActividad: number): Promise<any> {
        let inicio: number = Date.now();
        let sql = "INSERT INTO tiempos ( tInicio, idActividad ) values (?,?) ";
        return this.database.executeSql(sql, { inicio, idActividad });
    }
    finalizarActividad(idTiempo: number): Promise<any> {

        let final: number = Date.now();
        let sql = "UPDATE tiempos SET ( tFinal =  ?) WHERE idTiempo = ? ";
        return this.database.executeSql(sql, { final, idTiempo });
    }
    getActividadesActivas(): Promise<any> {

        let sql = "SELECT * FROM actividades WHERE activo = 1 ";
        return this.database.executeSql(sql, {});
    }
    getActividadesInactivas(): Promise<any> {
        let sql = "SELECT * FROM actividades WHERE activo = 0 ";
        return this.database.executeSql(sql, {});
    }
    getTiemposPorActividad(idActividad: number): Promise<any> {
        let sql = "SELECT * FROM tiempos WHERE idActividad = ? ";
        return this.database.executeSql(sql, { idActividad });

    }


}