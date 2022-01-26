import { Request, Response } from "express";
import { getManager } from "typeorm";
import { C_classification } from "../entity/classification.entity";

export const Classifications = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(C_classification);

    res.send(await repository.find());
}