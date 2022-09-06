import { Entity } from "./Entity";
import type { EntityContainer } from "./EntityContainer";
import GameSettings from "./GameSettings.json";

export class SnakeBody extends Entity {

    constructor(pos : [number, number]) {
        super();
        this._pos = pos;
    }

    Update(_: EntityContainer) {}

    Draw(ctx: CanvasRenderingContext2D): void {
        var size = GameSettings.entity_size;
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
        ctx.strokeRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }

    CollidesWith(pos: [number, number]): boolean {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}