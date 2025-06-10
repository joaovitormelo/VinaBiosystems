import { openDb } from '../configDB.js';

export async function updateBatchSituation(req, res){
     let id = req.body.id;
    let situation = req.body.situation;

    openDb().then(db=>{
        db.run('UPDATE Batch SET situation=? WHERE id=?', 
            [situation, id])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}

export async function insertBatch(req, res){
    let batch = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Batch (id, label, startDate, endDate, rawMaterialList, situation) VALUES (?,?,?,?,?,?)', 
            [batch.id, batch.label, batch.startDate, batch.endDate, batch.rawMaterialList, batch.situation])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function selectBatches(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Batch')
        .then(batches=>  res.json(batches))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}