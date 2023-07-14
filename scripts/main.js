const _Keyboard = trackKeys();
const _Mouse = trackMouse();

let _InputMode = 'mouse';

const _BG = new Background();
const _Title = new TitleMenu();
const _Pause = new PauseMenu();
let _Game;
// States: title, options, play, pause, gameover
let _State = 'title';

const main = () => {

    let previousTime;

    const update = (timeStamp) => {
        if(!previousTime) previousTime = timeStamp;
        const elapsed = timeStamp - previousTime;
        previousTime = timeStamp;

        // Clear Screen

        ctx.clearRect(0,0,viewport.width,viewport.height);

        // Draw BG

        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,viewport.width,viewport.height);

        // Set Global Scale
        const s = getScale();
        ctx.scale(s,s);

        // Scrolling BG

        _BG.draw();

        // GET STATE (TITLE, PLAY, PAUSE, OPTIONS)

        switch(_State.toLowerCase()){
            case 'title':
                _Title.update(_Mouse,_Keyboard)
                _Title.draw();
                break;
            case 'start':
                _State = 'play';
                break;
            case 'options':
                break;
            case 'play':
                if(!_Game)_Game = new Game();
                _Game.update(_Keyboard);
                _Game.draw();
                break;
            case 'pause':
                _Pause.update(_Mouse,_Keyboard);
                _Game.draw();
                _Pause.draw();
                break;
            case 'continue':
                _State = 'play';
                break;
            case 'retry':
                _Game = new Game();
                _State = 'play';
                break;
            case 'quit':
                _Game = undefined;
                _State = 'title';
                break;
        }

        // Update Player

        // Update Actors

        // Clean Up

        // DRAW HUD

        drawHUD(_Game);
        drawBaseLine();

        // Reset Transformations
        ctx.resetTransform();
        
        // Loop
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();