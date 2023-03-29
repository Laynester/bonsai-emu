import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('room_models')
export class RoomModelEntity extends BaseEntity {
    @Column('varchar', { primary: true, name: 'name', length: 100 })
    public name: string;

    @Column({ name: 'height_map', type: 'text' })
    public heightmap: string;

    @Column({ name: 'door_x', type: 'int', default: 0 })
    public doorX: number;

    @Column({ name: 'door_y', type: 'int', default: 0 })
    public doorY: number;

    @Column({ name: 'door_z', type: 'int', default: 0 })
    public doorZ: number;

    @Column({ name: 'door_direction', type: 'int', default: 0 })
    public doorDir: number;
}
