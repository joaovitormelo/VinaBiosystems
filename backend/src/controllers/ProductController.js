import { openDb } from '../configDB.js';

export async function selectProducts(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Product')
        .then(products=>  res.json(products))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function selectProductById(req, res){
    let id = req.query.id;
    openDb().then(db=>{
         db.get('SELECT * FROM Product WHERE id=?', [id])
        .then(products=>  res.json(products))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function insertProduct(req, res){
    let product = req.body;
    let fields = "name, quantity, unit";
    let placeholders = "?, ?, ?";
    let values = [product.name, product.quantity, product.unit];
    openDb().then(db=>{
        db.run(`INSERT INTO Product(${fields}) VALUES (${placeholders})`, values)
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function updateProduct(req, res){
    let product = req.body;
    let fields = "name=?, quantity=?, unit=?";
    let values = [product.name, product.quantity, product.unit];
    values.push(product.id);
    openDb().then(db=>{
        db.run(`UPDATE Product SET ${fields} WHERE id=?`, values)
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function deleteProduct(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Product WHERE id=?', [id])
        .then(() =>  res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function addToProductQuantity(req, res) {
    const { id, quantity } = req.body;
    console.log(req);
    openDb().then(db => {
        db.run('UPDATE Product SET quantity = quantity + ? WHERE id = ?', [quantity, id])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}