import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DatabaseService {

    private database: SQLiteObject;
    private dbReady = new BehaviorSubject<boolean>(false);

    constructor(private platform: Platform, private sqlite: SQLite) {
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: 'todos.db',
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

    private createTables() {
        return this.database.executeSql(
            `CREATE TABLE IF NOT EXISTS list (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );`
            , {})
            .then(() => {
                return this.database.executeSql(
                    `CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        isImportant INTEGER,
        isDone INTEGER,
        listId INTEGER,
        FOREIGN KEY(listId) REFERENCES list(id)
        );`, {})
            }).catch((err) => console.log("error detected creating tables", err));
    }

    private isReady() { }

    getListadoActividad() { }
    addListadoActividad(name: string) { }
    getList(id: number) { }
    deleteListadoActividad(id: number) { }

    getTodosFromListadoActividad(listId: number) { }
    addTodo(description: string, isImportant: boolean, isDone: boolean, listId: number) { }
    modifyTodo(description: string, isImportant: boolean, isDone: boolean, id: number) { }
    removeTodo(id: number) { }
}