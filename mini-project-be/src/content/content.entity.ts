import { Room } from "src/room/room.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Content extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    // @Column()
    // room_id: number;

    @ManyToOne(() => Room, room => room.contents)
    @JoinColumn({ name: 'room_id' })  // 이 부분이 room_id와 매핑되도록 지정한다
    room: Room;
}
