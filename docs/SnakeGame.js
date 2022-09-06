"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeGame = void 0;
const Apple_1 = require("./Apple");
const EntityContainer_1 = require("./EntityContainer");
const GameSettings_json_1 = __importDefault(require("./GameSettings.json"));
const Snake_1 = require("./Snake");
class SnakeGame {
    constructor(canvas) {
        this._entities = new EntityContainer_1.EntityContainer();
        this.Start = () => {
            const snake = new Snake_1.Snake();
            this._entities.Add(snake);
            snake.Place();
            snake.AddKillListerner(() => snake.Place());
            snake.AddKillListerner(() => this.ClearCanvas());
            window.addEventListener("keydown", (event) => {
                switch (event.key) {
                    case 'ArrowRight':
                        snake.Move([1, 0]);
                        break;
                    case 'ArrowLeft':
                        snake.Move([-1, 0]);
                        break;
                    case 'ArrowDown':
                        snake.Move([0, 1]);
                        break;
                    case 'ArrowUp':
                        snake.Move([0, -1]);
                        break;
                    default:
                        break;
                }
            });
            const apple = new Apple_1.Apple();
            this._entities.Add(apple);
            apple.Place(this._entities);
            apple.AddKillListerner(() => apple.Place(this._entities));
            this.Loop();
        };
        this.Loop = () => {
            setInterval(() => {
                this.UpdateEntities();
                this.DrawEntities();
            }, GameSettings_json_1.default.timeout);
        };
        this.ClearCanvas = () => { var _a; return (_a = this._ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, GameSettings_json_1.default.width, GameSettings_json_1.default.height); };
        this._ctx = canvas.getContext("2d");
    }
    UpdateEntities() {
        this._entities.ForEach(e => e.Update(this._entities));
    }
    DrawEntities() {
        this.ClearCanvas();
        this._ctx.strokeStyle = "black";
        this._ctx.strokeRect(0, 0, GameSettings_json_1.default.width, GameSettings_json_1.default.height);
        this._entities.ForEach(e => e.Draw(this._ctx));
    }
}
exports.SnakeGame = SnakeGame;
