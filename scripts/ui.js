// TITLE

const renderTitle = () => {
    const s = getScale();
    // DRAW TITLE
    // SET FONT
    ctx.font = `900 ${72*s}px Axia, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = black;
    ctx.strokeStyle = red;
    // DRAW TEXT
    ctx.fillText('BOMBARDMENT',320*s,110*s);
    ctx.strokeText('BOMBARDMENT',320*s,110*s);

    // DRAW MENU
    // GET CURRENT SELECTION
    // SET FONT
    ctx.font = `400 ${24*s}px carlmarx, sans-serif`;
    ctx.fillStyle = white;
    // DRAW TEXT
    ctx.fillText('START',320*s,180*s);
    ctx.fillText('OPTIONS',320*s,205*s);
}

// HUD

const renderHUD = (score = 0, fuel = 100, missiles = 10) => {
    const s = getScale();

    // Draw Background

    ctx.fillStyle = black;
    ctx.fillRect(0,0,640*s,32*s);

    // Draw Border

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0,32*s);
    ctx.lineTo(640*s,32*s);
    ctx.stroke();

    // Draw Score
    // x:16 y:24

    const scoreText = String(score);
    ctx.textAlign = 'start';
    ctx.font = `400 ${24*s}px carlmarx, sans-serif`;
    ctx.fillStyle = white;
    ctx.fillText(scoreText.padStart(6,'0'),16*s,24*s);

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
        ctx.strokeRect(112,8,((fuel*0.01)*240)*s,16*s);
    }

    // width = (fuel * 0.01) * 240?

    // Draw Missiles
}