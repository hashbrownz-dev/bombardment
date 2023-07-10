// TITLE

const renderTitle = () => {
    const s = getScale();
    ctx.scale(s,s);
    // DRAW TITLE
    // SET FONT
    ctx.font = `900 ${72}px Axia, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = black;
    ctx.strokeStyle = red;
    // DRAW TEXT
    ctx.fillText('BOMBARDMENT',320,120);
    ctx.strokeText('BOMBARDMENT',320,120);

    // DRAW MENU
    // GET CURRENT SELECTION
    // SET FONT
    ctx.font = `400 ${24}px carlmarx, sans-serif`;
    ctx.fillStyle = white;
    // DRAW TEXT
    ctx.fillText('START',320,180);
    ctx.fillText('OPTIONS',320,205);
    // RESET TRANSFORMATION
    ctx.resetTransform();
}

// HUD

const renderHUD = (score = 0, fuel = 100, missiles = 10) => {
    const s = getScale();
    ctx.scale(s,s);

    // Draw Background

    ctx.fillStyle = black;
    ctx.fillRect(0,0,640,32);

    // Draw Border

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0,32);
    ctx.lineTo(640,32);
    ctx.stroke();

    // Draw Score
    // x:16 y:24

    const scoreText = String(score);
    ctx.textAlign = 'start';
    ctx.font = `400 ${24}px carlmarx, sans-serif`;
    ctx.fillStyle = white;
    ctx.fillText(scoreText.padStart(6,'0'),16,24);

    // Draw Fuel
    // x:112 y:8 w:240 h:16
    if(fuel > 0){
        ctx.strokeStyle = red;
    }
    if(fuel > 10){
        ctx.strokeStyle = orange;
    }
    if(fuel > 30){
        ctx.strokeStyle = yellow;
    }
    if(fuel > 60){
        ctx.strokeStyle = lime;
    }

    if(fuel > 0){
        ctx.strokeRect(112,8,((fuel*0.01)*240),16);
    }

    // width = (fuel * 0.01) * 240?

    // Draw Missiles

    // missiles is an integer between 0 and 10...
    // there should be 10 missiles rendered at the top of the screen

    

    // RESET TRANSFORMATION
    ctx.resetTransform();
}