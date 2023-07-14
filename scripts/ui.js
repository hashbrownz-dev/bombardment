// MENU
// Assume all Menu Item's will be center aligned...

const _MenuItemFont = `400 24px carlmarx, sans-serif`;

class MenuItem{
    constructor(text,y){
        this.text = text;
        this.x = 320;
        this.y = y;
        this.selected = false;
        ctx.font = _MenuItemFont;
        ctx.textAlign = 'center';
        const { width, actualBoundingBoxAscent:top, actualBoundingBoxDescent:bottom, actualBoundingBoxLeft:left, actualBoundingBoxRight:right } = ctx.measureText(text);
        this.width = width;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
    get boundingRect(){
        const s = getScale()
        return {
            x : s * (this.x - this.left),
            y : s * (this.y - this.top),
            w : s * (this.width),
            h : s * (this.top + this.bottom),
        }
    }
    update(mouse){
        // CHECK FOR COLLISION
        if(colPointRect(mouse, this.boundingRect)) this.selected = true;
        // IF MOUSE IS CLICKED PERFORM ACTION
        if(this.selected && mouse.down){
            _State = this.text;
        }
    }
    draw(){
        // SET FONT
        ctx.font = _MenuItemFont;
        ctx.fillStyle = this.selected ? red : white;
        ctx.textAlign = 'center';
        // DRAW 
        ctx.fillText(this.text.toUpperCase(),this.x,this.y);
        // DBR
        // ctx.strokeStyle = lime;
        // ctx.strokeRect(this.x - this.left, this.y - this.top, this.width, this.top + this.bottom);
    }
}

const _MenuHeadingFont = `900 48px Axia, sans-serif`;
const drawMenuHeading = (text) => {
    // SET FONT
    ctx.font = _MenuHeadingFont;
    ctx.fillStyle = red;
    ctx.textAlign = 'center';
    // DRAW
    ctx.fillText(text.toUpperCase(),320,110);
}

// HUD

const drawHUD = (game) => {
    const score = game ? game.score : 0;
    const missiles = game ? game.missiles : 10;
    const fuel = game ? game.player ? game.player.fuel : 100 : 100;

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

    // Draw Missiles

    let missileX = 608;
    for(let i = 1; i <= 10; i++){
        const mOpt = {
            dir:270,
        }
        if(i>missiles) mOpt.color = [{'#FFFFFF':'#333333'}]
        renderSprite(PlayerMissile,missileX,8,mOpt);
        missileX -= 24;
    } 
}