import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    public id: number;

    @Column('varchar', { name: 'type', length: 512, default: 'private' })
    public type: string;

    @Column({ name: 'owner_id', type: 'int', default: -1 })
    public ownerId: string;

    @Column('varchar', { name: 'name', length: 100, default: 'Placeholder' })
    public name: string;

    @Column('varchar', { name: 'description', length: 125, nullable: true })
    public description: string;

    @Column({ name: 'category', type: 'int', default: 0 })
    public category: number;

    @Column({ name: 'users_now', type: 'int', default: 0 })
    public usersNow: number;

    @Column({ name: 'users_max', type: 'int', default: 25 })
    public usersMax: number;

    @Column('varchar', { name: 'model', length: 25 })
    public model: string;

    @Column('varchar', { name: 'password', length: 25 })
    public password: string;

    @Column('varchar', {
        name: 'wallpaper',
        length: 10,
        nullable: false,
        default: '0.0',
    })
    public wallpaper: string;

    @Column('varchar', {
        name: 'flooring',
        length: 10,
        nullable: false,
        default: '0.0',
    })
    public flooring: string;
}
