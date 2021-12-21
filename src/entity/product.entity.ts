import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class Product {
    @PrimaryGeneratedColumn()
    id_product: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;
}