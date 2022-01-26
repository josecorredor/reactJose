import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { C_expenses } from "./c_expenses.entity";


@Entity()
export class C_week {
    @PrimaryGeneratedColumn()
    id_week: number;

    @Column()
    name: string;

    @Column()
    date_s: string;

    @Column()
    date_f: string;

    @Column()
    month: string;

    @Column()
    year: string;

    @OneToMany(()=> C_expenses, expenses => expenses.week)
    weeks: C_expenses[];

}