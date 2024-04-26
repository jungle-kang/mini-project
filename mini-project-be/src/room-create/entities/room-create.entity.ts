import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("room", { schema: "mini" })
export class RoomCreate {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "titles", length: 255 })
  titles: string;
}
