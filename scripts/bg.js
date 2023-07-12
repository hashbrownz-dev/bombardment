// BACKGROUND

// DRAW GROUND

const drawBaseLine = () => {
    // 344
    // SET COLORS
    ctx.fillStyle = black;
    ctx.fillRect(0,344,640,16);
    ctx.strokeStyle = white;
    ctx.beginPath();
    ctx.moveTo(0,344);
    ctx.lineTo(640,344);
    ctx.stroke();
}

// DRAW BACKGROUND