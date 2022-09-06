import { Apple } from "./Apple";
import { EntityContainer } from "./EntityContainer";
import GameSettings from "./GameSettings.json";
import { Snake } from "./Snake";

export class SnakeGame {
    _ctx : CanvasRenderingContext2D;
    _entities : EntityContainer = new EntityContainer();
    
    constructor(canvas : HTMLCanvasElement) {
        this._ctx = canvas.getContext("2d")!;
    }
    
    Start = () => {
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
    }
    
    Loop = () => {
        setInterval(() => {
            this.UpdateEntities();
            this.DrawEntities();
        }, GameSettings.timeout)
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
    
    ClearCanvas = () => this._ctx?.clearRect(0, 0, GameSettings.width, GameSettings.height);
}