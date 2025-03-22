import { Router } from "express";
import {upload_file,download_file} from '../controllers/file.ts';

export const file:Router = Router();

file.post('/upload',upload_file);
file.get('/download/:name',download_file);