import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { c_person } from "../entity/user.entity";


export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {


        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY);
    
        if(!payload) {
            return res.status(401).send ({
                message : 'unautenticated'
            });
        }
        const repository = getManager().getRepository(c_person);
    
        req["user"] = await repository.findOne(payload.id_person);

        next();

    }catch (e){
        return res.status(401).send({
            message: 'unauthenticated'
        });
    }
}