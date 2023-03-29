import { BaseEntity, Column, Entity } from 'typeorm';

@Entity('server_texts')
export class TextsEntity extends BaseEntity {
    @Column('varchar', { primary: true, name: 'key', length: 100 })
    public key: string;

    @Column('varchar', { name: 'value', length: 512 })
    public value: string;
}
