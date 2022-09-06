import { Entity } from "./Entity";
import type { EntityContainer } from "./EntityContainer";
import GameSettings from "./GameSettings.json";

export class Apple extends Entity {

    Place(entities: EntityContainer) {
        let positionFound = false;
        while (!positionFound) {
            const x = Math.floor(Math.random() * GameSettings.rows);
            const y = Math.floor(Math.random() * GameSettings.columns);
            const entity = entities.CollidesWith([x, y]);
            if (entity == null) {
                positionFound = true;
                this._pos[0] = x;
                this._pos[1] = y;
            }
        }
    }

    Update(_: EntityContainer) {}

    Draw(ctx: CanvasRenderingContext2D): void {
        var size = GameSettings.entity_size;
        ctx.fillStyle = "red";
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }

    CollidesWith(pos: [number, number]): boolean {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}