import { openDb } from '../configDB.js';

export async function createTables(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS RawMaterial (id integer NOT NULL PRIMARY KEY, name TEXT, quantity INTEGER, unit TEXT, minQuantity INTEGER)')
    })

     openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User (id integer NOT NULL PRIMARY KEY, name TEXT, login TEXT, email TEXT, birthDate TEXT, isAdmin boolean, password TEXT)')
    })
}