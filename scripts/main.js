const _Keyboard = trackKeys();
const _Mouse = trackMouse();

let _Actors = [];
let _Player;
let _Menu = [new MenuItem('PLAY',320,180), new MenuItem('OPTIONS',320,205)];
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

        // GET STATE (TITLE, PLAY, PAUSE, OPTIONS)

        switch(_State){
            case 'title':
                handleTitle(_Keyboard,_Mouse);
                break;
            case 'play':
                break;
            case 'pause':
                break;
            case 'options':
                break;
        }

        // Update Player

        // Update Actors

        // Clean Up

        // _Actors = _Actors.filter((actor) => !actor.clear)

        // DRAW HUD

        renderHUD(0,100,5);

        // Reset Transformations
        ctx.resetTransform();
        
        // Loop
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();