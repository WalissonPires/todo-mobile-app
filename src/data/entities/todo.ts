import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IModel } from "../repositories/repository-base";


@Entity("todos")
export class Todo implements IModel {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    title: string;

    @Column()
    completed: boolean;

    @Column()
    createdAt: Date;
}