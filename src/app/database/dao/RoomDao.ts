import { RoomEntity, RoomModelEntity } from '../entities';

export class RoomDao {
    public static async findRoom(id: number): Promise<RoomEntity> {
        return RoomEntity.createQueryBuilder('room')
            .where('room.id = :id', { id: id })
            .getOne();
    }

    public static async getModels(): Promise<RoomModelEntity[]> {
        return RoomModelEntity.createQueryBuilder().getMany();
    }
}
