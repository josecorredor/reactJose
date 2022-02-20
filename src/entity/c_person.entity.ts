import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";


@Entity()

export class c_person {

    @PrimaryGeneratedColumn()
    id_person: number;
        
    @Column()
    celuphone: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column()
    person_type: string;

    @Column()
    goal: string;

    @Column()
    active: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column({
        unique:true
    })
    email: string;

    @ManyToOne(() => Role)
    @JoinColumn({name:'id_role'})
    role: Role;
}