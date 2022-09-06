"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const GameSettings_json_1 = __importDefault(require("./GameSettings.json"));
class Entity {
    constructor() {
        this._pos = [-1, -1];
        this.AddKillListerner = (KillListener) => this._KillListeners.push(KillListener);
        this._KillListeners = [];
        this.Kill = () => this._KillListeners.forEach(l => l());
    }
    static Move(pos, dir) {
        return [(pos[0] + dir[0] + GameSettings_json_1.default.rows) % GameSettings_json_1.default.rows, (pos[1] + dir[1] + GameSettings_json_1.default.columns) % GameSettings_json_1.default.columns];
    }
}
exports.Entity = Entity;
