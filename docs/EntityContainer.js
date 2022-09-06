"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityContainer = void 0;
class EntityContainer {
    constructor() {
        this._entities = new Set;
        this.Add = (entity) => this._entities.add(entity);
        this.Remove = (entity) => this._entities.delete(entity);
        this.Contains = (entity) => this._entities.has(entity);
        this.ForEach = (callbackfn) => this._entities.forEach(callbackfn);
        this.Size = () => this._entities.size;
    }
    CollidesWith(pos) {
        let entity;
        this._entities.forEach((e) => {
            if (e.CollidesWith(pos))
                entity = e;
        });
        return entity;
    }
}
exports.EntityContainer = EntityContainer;
