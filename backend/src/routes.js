import { Router } from "express";
import { createTables } from "./controllers/createTables.js";
import { insertUser, updateUser, selectUserByEmail, selectUsers, deleteUser } from './controllers/UserController.js'
import { selectRawMaterialByName, selectRawMaterialById, insertRawMaterial, selecRawMaterials, updateRawMaterial, isRawMaterialBeingUsedInABatch, deleteRawMaterial, removeRawMaterialQuantityFromInventoy } from './controllers/RawMaterialController.js'
import { updateBatchSituation, insertBatch, selectBatches, addRawMaterialToBatch, getRawMaterialListByBatchId, deleteBatchById } from './controllers/BatchController.js'
import { selectSamplingResultsByBatchId, insertSamplingResults, deleteSamplingResults} from './controllers/SamplingResultsController.js'

createTables();

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/selectUsers', selectUsers);
router.get('/selectUserByEmail', selectUserByEmail);
router.post('/insertUser', insertUser);
router.put('/updateUser', updateUser);
router.delete('/deleteUser', deleteUser);

router.get('/selectRawMaterialByName', selectRawMaterialByName);
router.get('/selectRawMaterialById', selectRawMaterialById);
router.post('/insertRawMaterial', insertRawMaterial);
router.get('/selectRawMaterials', selecRawMaterials);
router.put('/updateRawMaterial', updateRawMaterial);
router.get('/isRawMaterialBeingUsedInABatch', isRawMaterialBeingUsedInABatch);
router.delete('/deleteRawMaterial', deleteRawMaterial);
router.put('/removeRawMaterialQuantityFromInventory', removeRawMaterialQuantityFromInventoy);

router.put('/updateBatchSituation', updateBatchSituation);
router.post('/insertBatch', insertBatch);
router.get('/selectBatches', selectBatches);
router.put('/addRawMaterialToBatch', addRawMaterialToBatch);
router.get('/getRawMaterialListByBatchId', getRawMaterialListByBatchId);
router.delete('/deleteBatchById', deleteBatchById);

router.get('/selectSamplingResultsByBatchId', selectSamplingResultsByBatchId);
router.post('/insertSamplingResults', insertSamplingResults);
router.delete('/deleteSamplingResults', deleteSamplingResults);

export default router;