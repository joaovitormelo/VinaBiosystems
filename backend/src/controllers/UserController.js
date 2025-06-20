import { openDb } from '../configDB.js';

export async function selectUserByEmail(req, res){
    let email = req.query.email;
    openDb().then(db=>{
         db.get('SELECT * FROM User WHERE email=?', [email])
        .then(users=>  res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function selectUsers(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM User')
        .then(users=>  res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function insertUser(req, res){
    let user = req.body;
    let fields = "name, email, phone, birthDate, isAdmin, password";
    let placeholders = "?, ?, ?, ?, ?, ?";
    let values = [user.name, user.email, user.phone, user.birthDate, user.isAdmin, user.password];
    openDb().then(db=>{
        db.run(`INSERT INTO User(${fields}) VALUES (${placeholders})`, values)
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function updateUser(req, res){
    let user = req.body;
    let fields = "name=?, email=?, phone=?, birthDate=?, isAdmin=?";
    let values = [user.name, user.email, user.phone, user.birthDate, user.isAdmin];
    if (user.password) {
        fields += ", password=?";
        values.push(user.password);
    }
    values.push(user.id);
    openDb().then(db=>{
        db.run(`UPDATE User SET ${fields} WHERE id=?`, values)
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function deleteUser(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM User WHERE id=?', [id])
        .then(() =>  res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}