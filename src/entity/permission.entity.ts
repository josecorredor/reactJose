import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id_permission: number;

    @Column()
    name: string;
}