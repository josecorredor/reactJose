import { Request, Response } from "express";
import multer from "multer";
import { extname } from "path";

export const Upload = async (req:Request, res:Response) => {
    const storage = multer.diskStorage({
        destination: './uploads',
        filename(_, file, callback){
            const randomName = Math.random().toString(20).substring(2,12);
            return callback(null,`${randomName}${extname(file.originalname)}`)
        }
    })

    const upload = multer({storage}).single('image');

    upload(req, res, (err: any)=>{

        if (err){
            return res.send(400).send(err);
        }
        res.send({
            url: `http://3.26.18.43:8000/api/uploads/${req.file.filename}`
        })

    })    
    

}
