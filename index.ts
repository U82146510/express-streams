import express,{type Application} from 'express';
import {file} from './routes/file.ts';

const app:Application = express();
const port:number = 3000;


app.use('/',file);

const start = async()=>{
    try {
        app.listen(port,()=>console.log('on'));
    } catch (error) {
        console.error(error);
    }
}

start()