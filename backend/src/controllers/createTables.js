import { openDb } from '../configDB.js';

export async function createTables(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS RawMaterial (id integer NOT NULL PRIMARY KEY, name TEXT, quantity INTEGER, unit TEXT, minQuantity INTEGER)')
    })

    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS User (id integer NOT NULL PRIMARY KEY, name TEXT, email TEXT, phone TEXT, birthDate TEXT, isAdmin boolean, password TEXT)')
        db.all('SELECT * FROM User')
        .then(users=>  {
            if(users.length === 0){
                db.run('INSERT INTO User (name, email, phone, birthDate, isAdmin, password) VALUES (?,?,?,?,?,?)', 
                ['Teste', 'joao.teste@gmail.com', '999999999', '2000-01-01', true, '123']);
            }
        })
    })

    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Batch (id integer NOT NULL PRIMARY KEY, label TEXT, startDate TEXT, endDate TEXT, situation TEXT)')
    })

    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS SamplingResults (id integer NOT NULL PRIMARY KEY, fileName TEXT, date TEXT, creationUserId INTEGER, batchId INTEGER)')
    })

    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS RawMaterialOfBatch (id integer NOT NULL PRIMARY KEY, batchId integer NOT NULL, rawMaterialId integer NOT NULL, quantity INTEGER)');
    })
}