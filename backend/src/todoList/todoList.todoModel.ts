import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Todo {
  @PrimaryColumn()
  content: string;

  @Column()
  completed: boolean;

  @Column()
  createdAt: number;
};