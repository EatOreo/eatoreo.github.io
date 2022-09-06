import type { EntityContainer } from "./EntityContainer";
import GameSettings from "./GameSettings.json";

export abstract class Entity {
    _pos : [number, number] = [-1, -1];
    abstract Update(entities : EntityContainer) : void;
    abstract Draw(ctx : CanvasRenderingContext2D) : void;
    abstract CollidesWith(pos : [number, number]) : boolean;

    AddKillListerner = (KillListener: Function) => this._KillListeners.push(KillListener);
    _KillListeners : Function[] = [];
    Kill = () => this._KillListeners.forEach(l => l());

    static Move(pos : [number, number], dir : [number, number]) : [number, number] {
        return [(pos[0] + dir[0] + GameSettings.rows) % GameSettings.rows, (pos[1] + dir[1] + GameSettings.columns) % GameSettings.columns]
    }
}