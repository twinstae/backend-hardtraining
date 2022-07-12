import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class TodoTable {
  @PrimaryColumn('varchar', { length: 140 })
  content: string;

  @Column()
  completed: boolean;

  @Column('int')
  createdAt: number;
};
