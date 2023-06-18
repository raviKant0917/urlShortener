import express from 'express';
import { connection } from './databse/connection.js';
import { router } from './routes/routes.js';

const app = express();
const port = 3000 || process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api', router);
connection();



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})