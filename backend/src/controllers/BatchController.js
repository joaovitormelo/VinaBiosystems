import { openDb } from '../configDB.js';

export async function updateBatchSituation(req, res){
     let id = req.body.id;
    let situation = req.body.situation;

    console.log("UPDATING BATCH SITUATION", id, situation);

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
        db.run('INSERT INTO Batch (label, startDate, endDate, situation) VALUES (?,?,?,?)', 
            [batch.label, batch.startDate, batch.endDate, batch.situation])
        .then((value) => {
            res.json({ id: value.lastID, statusCode: 200 })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}

export async function deleteBatchById(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.run('DELETE FROM Batch WHERE id = ?', 
            [id])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}

export async function addRawMaterialToBatch(req, res){
    const batchId = req.body.batchId;
    const rawMaterialId = req.body.rawMaterialId;
    const quantity = req.body.quantity;
    openDb().then(db=>{
        db.run('INSERT INTO RawMaterialOfBatch (batchId, rawMaterialId, quantity) VALUES (?,?,?)',
            [batchId, rawMaterialId, quantity])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}

export async function getRawMaterialListByBatchId(req, res){
    const batchId = req.query.batchId;
    openDb().then(db=>{
        db.all('SELECT * FROM RawMaterialOfBatch WHERE batchId = ?', [batchId])
        .then(rawMaterials => res.json(rawMaterials))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}
export async function selectBatches(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Batch')
        .then(batches=>  res.json(batches))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.message || "Internal Server Error" });
        });
    });
}