import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { C_classification } from "./classification.entity";
import { C_week } from "./c_week.entity";
import { Tx_type } from "./tx_type.entity";
import { c_person } from "./c_person.entity";


@Entity()

export class C_expenses {

    @PrimaryGeneratedColumn()
    id_expenses: number;

    @ManyToOne(() => C_classification)
    @JoinColumn({name:'id_classification'})
    classification: C_classification;
        
    @Column()
    detail: string;

    @Column()
    value: string;

    @ManyToOne(() => C_week)
    @JoinColumn({name:'id_week'})
    week: C_week;

    @ManyToOne(() => c_person)
    @JoinColumn({name:'id_person'})
    user: c_person;

    @ManyToOne(() => Tx_type)
    @JoinColumn({name:'id_tx_type'})
    tx_type: Tx_type;
}