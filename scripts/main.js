const _Keyboard = trackKeys();
const _Mouse = trackMouse();

const _BG = new Background();
const _Title = new TitleMenu();
const _Pause = new PauseMenu();
const _Option = new OptionMenu();
const _Config = {
    'screen size' : '1x',
    'sound' : 'on',
    'music' : 'on',
};
const handleConfig = (prop) => {
    if(prop === 'screen size'){
        switch(_Config[prop]){
            case '1x':
                if(document.fullscreenElement)document.exitFullscreen();
                resizeCanvas(640);
                break;
            case '1.5x':
                if(document.fullscreenElement)document.exitFullscreen();
                resizeCanvas(960);
                break;
            case 'fit to window':
                fitToWindow();
                break;
            case 'fullscreen':
                setFullscreen();
                break;
        }
    }
}

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
                _Title.update(_Keyboard)
                _Title.draw();
                break;
            case 'start':
                _State = 'play';
                break;
            case 'options':
                _Option.update();
                _Option.draw();
                break;
            case 'play':
                if(!_Game)_Game = new Game();
                _Game.update(_Keyboard);
                _Game.draw();
                break;
            case 'pause':
                _Pause.update(_Keyboard);
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
            default:
                _State = 'title';
                break;
        }

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