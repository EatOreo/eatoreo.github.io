const GameSettings = {
    "width": 640,
    "height": 640,
    "rows": 10,
    "columns": 10,
    "entity_size": 64,
    "timeout": 200
}

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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor() {
        this._pos = [-1, -1];
        this.AddKillListerner = (KillListener) => this._KillListeners.push(KillListener);
        this._KillListeners = [];
        this.Kill = () => this._KillListeners.forEach(l => l());
    }
    static Move(pos, dir) {
        return [(pos[0] + dir[0] + GameSettings.rows) % GameSettings.rows, (pos[1] + dir[1] + GameSettings.columns) % GameSettings.columns];
    }
}
exports.Entity = Entity;


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apple = void 0;
class Apple extends Entity {
    Place(entities) {
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
    Update(_) { }
    Draw(ctx) {
        var size = GameSettings.entity_size;
        ctx.fillStyle = "red";
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }
    CollidesWith(pos) {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}
exports.Apple = Apple;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeBody = void 0;
class SnakeBody extends Entity {
    constructor(pos) {
        super();
        this._pos = pos;
    }
    Update(_) { }
    Draw(ctx) {
        var size = GameSettings.entity_size;
        ctx.fillRect(this._pos[0] * size, this._pos[1] * size, size, size);
        ctx.strokeRect(this._pos[0] * size, this._pos[1] * size, size, size);
    }
    CollidesWith(pos) {
        return (this._pos[0] == pos[0] && this._pos[1] == pos[1]);
    }
}
exports.SnakeBody = SnakeBody;


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snake = void 0;
class Snake extends Entity {
    constructor() {
        super(...arguments);
        this._dir = [1, 0];
        this._lastDir = [-1, 0];
        this._body = [];
    }
    Place() {
        this._body = [new SnakeBody([GameSettings.rows / 2, GameSettings.columns / 2])];
        this._pos = this.Head()._pos;
    }
    Head() {
        return this._body[this._body.length - 1];
    }
    Move(dir) {
        if (this._body.length > 1) {
            const back = this._body[this._body.length - 2];
            const nextPos = Entity.Move(this.Head()._pos, dir);
            if (nextPos[0] == back._pos[0] && nextPos[1] == back._pos[1])
                return;
        }
        this._dir = dir;
    }
    Update(entities) {
        const head = this.Head();
        const headPos = Entity.Move(head._pos, this._dir);
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
        if (entity instanceof Apple) {
            this._body.unshift(new SnakeBody(tailPos));
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
        const size = GameSettings.entity_size;
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


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeGame = void 0;
class SnakeGame {
    constructor(canvas) {
        this._entities = new EntityContainer();
        this.Start = () => {
            const snake = new Snake();
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
            const apple = new Apple();
            this._entities.Add(apple);
            apple.Place(this._entities);
            apple.AddKillListerner(() => apple.Place(this._entities));
            this.Loop();
        };
        this.Loop = () => {
            setInterval(() => {
                this.UpdateEntities();
                this.DrawEntities();
            }, GameSettings.timeout);
        };
        this.ClearCanvas = () => { var _a; return (_a = this._ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, GameSettings.width, GameSettings.height); };
        this._ctx = canvas.getContext("2d");
    }
    UpdateEntities() {
        this._entities.ForEach(e => e.Update(this._entities));
    }
    DrawEntities() {
        this.ClearCanvas();
        this._ctx.strokeStyle = "black";
        this._ctx.strokeRect(0, 0, GameSettings.width, GameSettings.height);
        this._entities.ForEach(e => e.Draw(this._ctx));
    }
}
exports.SnakeGame = SnakeGame;
