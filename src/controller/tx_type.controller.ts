import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Tx_type } from "../entity/tx_type.entity";

export const Tx_types = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Tx_type);

    res.send(await repository.find());
}