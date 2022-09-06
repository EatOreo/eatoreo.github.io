import type { Entity } from "./Entity";

export class EntityContainer {
    _entities : Set<Entity> = new Set;

    Add = (entity : Entity) => this._entities.add(entity);
    Remove = (entity : Entity) => this._entities.delete(entity);
    Contains = (entity : Entity) => this._entities.has(entity);
    ForEach = (callbackfn: (value: Entity, value2: Entity, set: Set<Entity>) => void) => this._entities.forEach(callbackfn);
    Size = () => this._entities.size;

    CollidesWith(pos : [number, number]) {
        let entity : Entity | undefined;
        this._entities.forEach((e) => {
            if (e.CollidesWith(pos)) entity = e;
        })
        return entity;
    }
}