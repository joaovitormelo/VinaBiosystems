import { Router } from "express";
import { createTables } from "./controllers/createTables.js";
import { insertUser, updateUser, selectUserById, selectUsers, deleteUser } from './controllers/UserController.js'
import { selectRawMaterialByName, selectRawMaterialById, insertRawMaterial, selecRawMaterials, updateRawMaterial, isRawMaterialBeingUsedInABatch, deleteRawMaterial } from './controllers/RawMaterialController.js'

createTables();

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
    })
})

router.get('/selectUsers', selectUsers);
router.get('/selectUserById', selectUserById);
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

export default router;