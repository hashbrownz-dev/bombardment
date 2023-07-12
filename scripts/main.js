const _Keyboard = trackKeys();
const _Mouse = trackMouse();

const _BG = new Background();

let _Actors = [];
let _Player;
let _Menu;
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
                if(!_Menu)_Menu = [new MenuItem('PLAY',320,180), new MenuItem('OPTIONS',320,205)]
                handleTitle(_Keyboard,_Mouse);
                break;
            case 'play':
                if(!_Game)_Game = new Game();
                _Game.update(_Keyboard);
                _Game.draw();
                break;
            case 'pause':
                break;
            case 'options':
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