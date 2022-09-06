"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apple = void 0;
const Entity_1 = require("./Entity");
const GameSettings_json_1 = __importDefault(require("./GameSettings.json"));
class Apple extends Entity_1.Entity {
    Place(entities) {
        let positionFound = false;
        while (!positionFound) {
            const x = Math.floor(Math.random() * GameSettings_json_1.default.rows);
            const y = Math.floor(Math.random() * GameSettings_json_1.default.columns);
            const entity = entities.CollidesWith([x, y]);
            if (entity == null) {
                positionFound = true;
                this._pos[0] = x;
                this._pos[1] = y;
            }
        }
    }
    Update(_) { }
    Draw(ctx) {
        var size = GameSettings_json_1.default.entity_size;
        ctx.fillStyle = "red";
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }
    CollidesWith(pos) {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}
exports.Apple = Apple;
