import { openDb } from '../configDB.js';

export async function selectSamplingResultsByBatchId(req, res){
    let id = req.body.id;
    openDb().then(db=>{
         db.get('SELECT * FROM SamplingResults WHERE batchId=?', [id])
        .then(samplingResults=>  res.json(samplingResults))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function insertSamplingResults(req, res){
    let samplingResults = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO SamplingResults (id, fileName, date, creationUserId, batchId) VALUES (?,?,?,?,?)', 
            [samplingResults.id, samplingResults.fileName, samplingResults.date, samplingResults.creationUserId, samplingResults.batchId])
        .then(() => res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

export async function deleteSamplingResults(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM SamplingResults WHERE id=?', [id])
        .then(res=>  res.json({ statusCode: 200 }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
    });
}

