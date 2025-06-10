import { Router } from "express";
import { createTable, insertUser, updateUser, selectUserById, selectUsers, deleteUser } from './controllers/UserController.js'

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

export default router;