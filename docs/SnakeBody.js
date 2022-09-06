"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeBody = void 0;
const Entity_1 = require("./Entity");
const GameSettings_json_1 = __importDefault(require("./GameSettings.json"));
class SnakeBody extends Entity_1.Entity {
    constructor(pos) {
        super();
        this._pos = pos;
    }
    Update(_) { }
    Draw(ctx) {
        var size = GameSettings_json_1.default.entity_size;
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
        ctx.strokeRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }
    CollidesWith(pos) {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}
exports.SnakeBody = SnakeBody;
