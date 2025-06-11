import { openDb } from '../configDB.js';

export async function selectRawMaterialByName(req, res){
    let name = req.query.name;
    openDb().then(db=>{
         db.get('SELECT * FROM RawMaterial WHERE name=?', [name])
        .then(rawMaterial=>  res.json(rawMaterial))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function selectRawMaterialById(req, res){
    let id = req.query.id;
    openDb().then(db=>{
         db.get('SELECT * FROM RawMaterial WHERE id=?', [id])
        .then(rawMaterial=>  res.json(rawMaterial))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function insertRawMaterial(req, res){
    let rawMaterial = req.body;
    openDb().then(db=>{
        db.run(
            'INSERT INTO RawMaterial (name, quantity, unit, minQuantity) VALUES (?,?,?,?)', 
            [rawMaterial.name, rawMaterial.quantity, rawMaterial.unit, rawMaterial.minQuantity]
        )
        .then(() => res.json({"statusCode": 200}))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}


export async function selecRawMaterials(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM RawMaterial')
        .then(rawMaterial=>  res.json(rawMaterial))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function updateRawMaterial(req, res){
    let rawMaterial = req.body;
    openDb().then(db=>{
        db.run(
            'UPDATE rawMaterial SET name=?, quantity=?, unit=?, minQuantity=? WHERE id=?', 
            [rawMaterial.name, rawMaterial.quantity, rawMaterial.unit, rawMaterial.minQuantity, rawMaterial.id]
        )
        .then(() => res.json({"statusCode": 200}))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

// TODO: INNER JOIN - boolean return 
export async function isRawMaterialBeingUsedInABatch(req, res){
    let id = req.query.id;
    openDb().then(db=>{
        db.get(
            'SELECT COUNT(*) as count FROM RawMaterialOfBatch WHERE rawMaterialId=?', 
            [id]
        )
        .then(result => {
            if (result.count > 0) {
                res.json({"statusCode": 200, "isUsed": true});
            } else {
                res.json({"statusCode": 200, "isUsed": false});
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function deleteRawMaterial(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM RawMaterial WHERE id=?', [id])
        .then(res=>res)
        .then(() => res.json({"statusCode": 200}))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}

export async function removeRawMaterialQuantityFromInventoy(req, res){
    const quantityToRemove = req.body.quantityToRemove;
    const id = req.body.id;
    openDb().then(db=>{
        db.run(
            'UPDATE RawMaterial SET quantity=quantity-? WHERE id=?', 
            [quantityToRemove, id]
        )
        .then(() => res.json({"statusCode": 200}))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message })
        });
    });
}