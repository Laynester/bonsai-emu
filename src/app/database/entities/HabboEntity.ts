import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HabboGenderTypeEnum } from './enum/HabboGenderTypeEnum';

@Entity('habbos')
export class HabboEntity extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    public id: number;

    @Column('varchar', { name: 'name', length: 512 })
    public name: string;

    @Column({ name: 'created', type: 'int' })
    public created: number;

    @Column('varchar', { name: 'machine_id', length: 512 })
    public machineID: string;

    @Column({ name: 'last_online', type: 'int' })
    public lastOnline: number;

    @Column('varchar', { name: 'figure', length: 512 })
    public figure: string;

    @Column('varchar', { name: 'auth_ticket', length: 512 })
    public ticket: string;

    @Column('enum', {
        name: 'gender',
        enum: HabboGenderTypeEnum,
        default: HabboGenderTypeEnum.MALE,
    })
    public gender: HabboGenderTypeEnum;

    @Column({ name: 'credits', type: 'int', default: 3000 })
    public credits: number;

    @Column({ name: 'pixels', type: 'int', default: 0 })
    public pixels: number;

    @Column({ name: 'home_room', type: 'int', default: 0 })
    public homeRoom: number;
}
