"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
const Apple_1 = require("./Apple");
const Entity_1 = require("./Entity");
const GameSettings_json_1 = __importDefault(require("./GameSettings.json"));
const SnakeBody_1 = require("./SnakeBody");
class Snake extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._dir = [1, 0];
        this._lastDir = [-1, 0];
        this._body = [];
    }
    Place() {
        this._body = [new SnakeBody_1.SnakeBody([GameSettings_json_1.default.rows / 2, GameSettings_json_1.default.columns / 2])];
        this._pos = this.Head()._pos;
    }
    Head() {
        return this._body[this._body.length - 1];
    }
    Move(dir) {
        if (this._body.length > 1) {
            const back = this._body[this._body.length - 2];
            const nextPos = Entity_1.Entity.Move(this.Head()._pos, dir);
            if (nextPos[0] == back._pos[0] && nextPos[1] == back._pos[1])
                return;
        }
        this._dir = dir;
    }
    Update(entities) {
        const head = this.Head();
        const headPos = Entity_1.Entity.Move(head._pos, this._dir);
        const tailPos = this._body[0]._pos;
        for (let i = 0; i < this._body.length - 1; i++) {
            const body = this._body[i];
            const next = this._body[i + 1];
            body._pos = next._pos;
            if (body._pos[0] == headPos[0] && body._pos[1] == headPos[1])
                this.Kill();
        }
        head._pos = headPos;
        this._pos = headPos;
        const entity = entities.CollidesWith(headPos);
        if (entity instanceof Apple_1.Apple) {
            this._body.unshift(new SnakeBody_1.SnakeBody(tailPos));
            if (tailPos[0] == headPos[0] && tailPos[1] == headPos[1])
                this.Kill();
            entity.Kill();
        }
    }
    Draw(ctx) {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "brown";
        for (let i = 0; i < this._body.length; i++) {
            this._body[i].Draw(ctx);
        }
        this.DrawEyes(ctx);
    }
    DrawEyes(ctx) {
        const size = GameSettings_json_1.default.entity_size;
        let x1;
        let y1;
        let x2;
        let y2;
        if (this._dir[0] == -1 && this._dir[1] == 0) {
            x1 = this._pos[0] * size + (size / 3);
            y1 = this._pos[1] * size + (size / 3);
            x2 = this._pos[0] * size + (size / 3);
            y2 = this._pos[1] * size + (size / 3) * 2;
        }
        else if (this._dir[0] == 1 && this._dir[1] == 0) {
            x1 = this._pos[0] * size + (size / 3) * 2;
            y1 = this._pos[1] * size + (size / 3);
            x2 = this._pos[0] * size + (size / 3) * 2;
            y2 = this._pos[1] * size + (size / 3) * 2;
        }
        else if (this._dir[0] == 0 && this._dir[1] == -1) {
            x1 = this._pos[0] * size + (size / 3) * 2;
            y1 = this._pos[1] * size + (size / 3);
            x2 = this._pos[0] * size + (size / 3);
            y2 = this._pos[1] * size + (size / 3);
        }
        else {
            x1 = this._pos[0] * size + (size / 3) * 2;
            y1 = this._pos[1] * size + (size / 3) * 2;
            x2 = this._pos[0] * size + (size / 3);
            y2 = this._pos[1] * size + (size / 3) * 2;
        }
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x1, y1, size / 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x2, y2, size / 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(x1, y1, size / 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x2, y2, size / 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    CollidesWith(pos) {
        for (let i = 0; i < this._body.length; i++) {
            const body = this._body[i];
            if (body.CollidesWith(pos))
                return true;
        }
        return false;
    }
}
exports.Snake = Snake;
