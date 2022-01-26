import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { C_expenses } from "./c_expenses.entity";


@Entity()
export class Tx_type {
    @PrimaryGeneratedColumn()
    id_tx_type: number;

    @Column()
    desc_tx_type: string;

    @Column()
    active: string;

    @OneToMany(()=> C_expenses, expenses => expenses.tx_type)
    tx_types: C_expenses[];
}