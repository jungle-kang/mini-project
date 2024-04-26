import { Content } from 'src/content/content.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titles: string;

    @OneToMany(() => Content, content => content.room_id)
    contents: Content[];
}