import type { Entity } from "./Entity";

export class Square {
    _x : number;
    _y : number;
    _width : number;
    _height : number;
    _entity : Entity | null;


    constructor(x : number, y : number, width : number, height : number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._entity = null;
    }
}