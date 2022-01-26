import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { C_expenses } from "./c_expenses.entity";


@Entity()
export class C_classification {
    @PrimaryGeneratedColumn()
    id_classification: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column()
    TYPE_E: string;

    @Column()
    activo: string;

    @OneToMany(()=> C_expenses, expenses => expenses.classification)
    classification: C_expenses[];

}