import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id_role: number;

    @Column()
    name: string;

    @ManyToMany(()=> Permission)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'id_role', referencedColumnName: 'id_role'},
        inverseJoinColumn: { name: "id_permission", referencedColumnName: 'id_permission'}
    })
    permissions: Permission[];

}