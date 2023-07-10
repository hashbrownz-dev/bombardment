const _Input = trackKeys();

let _Actors = [];
let _Player;
let score = 0, fuel = 100;
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

        renderTitle();
        renderHUD(score, fuel);

        // Update Player

        // Update Actors

        // Clean Up

        _Actors = _Actors.filter((actor) => !actor.clear)

        // Draw

        // Loop
        requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

main();