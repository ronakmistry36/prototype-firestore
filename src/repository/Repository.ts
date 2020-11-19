export interface Repository<Entity, EntityName> {
    deleteById(id: string): void;
    delete(entity: Entity): void;
    findAll(): Entity[];
    findById(id: string): Entity;
    save(entity: Entity): Entity;
}
