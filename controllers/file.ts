import { type Request,type Response,type NextFunction } from "express";
import fs from 'fs';
import path from "path";

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

export const upload_file = (req:Request,res:Response,next:NextFunction)=>{
    const file_name = `${Date.now()}-img.jpg`
    const file_path = path.join(__dirname,'uploads',file_name);
    try {
        const wstream = fs.createWriteStream(file_path);
        
        req.on('error',(err:Error)=>{
            console.error(err.message);
            res.status(500).json({message:'Request stream error'});
            req.destroy()
            return;
        });
        wstream.on('error',(err:Error)=>{
            console.error(err.message);
            res.status(500).json({message:'Failed to write a file'});
            wstream.destroy();
            return;
        });
        wstream.on('finish',()=>{
            console.log("image saved successfully");
        });
        
        req.pipe(wstream);
        res.status(201).json({message:'uploaded successfully',file_name});
    } catch (error) {
        next(error);
    }
};

export const download_file = (req:Request,res:Response,next:NextFunction)=>{
    const {name} = req.params;
    try {
        res.setHeader('Content-Type','image/jpeg');
        res.setHeader('Content-Disposition','attachment; filename=photo.jpg');
        const file_path = path.join(__dirname,'uploads',`${name}`);
        
        const stat = fs.statSync(file_path);
        let count = 0;

        const rstream = fs.createReadStream(file_path);
        res.on('error',(err:Error)=>{
            res.status(500).json({message:'Response stream error'});
            return;
        });
        rstream.on('error',(err:Error)=>{
            res.status(500).json({message:'Failed to read the file'});
            return;
        });
        rstream.on('data',(chunk:Buffer|string)=>{
            count+=chunk.length
            let result = (count / stat.size )*100;
            console.log('progress:',result);

        });
        rstream.pipe(res);
        res.on('finish',()=>{
            console.log('stream is finished')
        });
    } catch (error) {
        next(error);
    }
};