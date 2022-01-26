import { Request, Response } from "express";
import { getManager } from "typeorm";
import { C_week } from "../entity/c_week.entity";

export const C_weeks = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(C_week);

    res.send(await repository.find());
}