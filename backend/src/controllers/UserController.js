import { openDb } from '../configDB.js';

export async function selectUserById(req, res){
    let id = req.body.id;
    openDb().then(db=>{
         db.get('SELECT * FROM User WHERE id=?', [id])
        .then(users=>  res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function selectUsers(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM User')
        .then(users=>  res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function insertUser(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO User (id, name, login, email, birthDate, isAdmin, password) VALUES (?,?,?,?,?,?,?)', 
            [user.id, user.name, user.login, user.email, user.birthDate, user.isAdmin, user.password])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function updateUser(req, res){
    let user = req.body;
    openDb().then(db=>{
        db.run('UPDATE User SET name=?, login=?, email=?, birthDate=?, isAdmin=?, password=? WHERE id=?', 
            [user.name, user.login, user.email, user.birthDate, user.isAdmin, user.password, user.id])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}

export async function deleteUser(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM User WHERE id=?', [id])
        .then(res=>  res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}