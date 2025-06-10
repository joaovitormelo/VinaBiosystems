import express from 'express';
import cors from 'cors';

// import { createTable } from './controllers/UserController.js'
// createTable()

const app = express();
app.use(express.json());
app.use(cors());

import router from './routes.js'
app.use(router);

app.listen( 3000, ()=>console.log("API running"))

// https.createServer({
//     cert: fs.readFileSync('src/SSL/code.crt'),
//     key: fs.readFileSync('src/SSL/code.key')
// }, app).listen(3001, ()=> console.log("Rodando em https"));