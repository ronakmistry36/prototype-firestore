export interface Repository<Entity> {
    deleteById(id: string): void;

    delete(entity: Entity): void;

    findAll(): Promise<Entity[]>;

    findById(id: string): Promise<Entity>;

    save(entity: Entity): void;
}
