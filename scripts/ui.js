// MENU
// Assume all Menu Item's will be center aligned...

const _MenuItemFont = `400 24px carlmarx, sans-serif`;

class MenuItem{
    constructor(text,x,y){
        this.text = text;
        this.x = x;
        this.y = y;
        ctx.font = _MenuItemFont;
        const { width, actualBoundingBoxAscent:top, actualBoundingBoxDescent:bottom, actualBoundingBoxLeft:left, actualBoundingBoxRight:right } = ctx.measureText(text);
        this.width = width;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.boundingRect = {
            x : this.x - this.left,
            y : this.y - this.top,
            w : this.width,
            h : this.top + this.bottom,
        }
    }
    update(){
        // GET MOUSE POS
        // CHECK FOR COLLISION
        // IF YES CHANGE COLOR
        // IF MOUSE IS CLICKED PERFORM ACTION
    }
    draw(){
        // SET FONT
        ctx.font = _MenuItemFont;
        ctx.fillStyle = white;
        // DRAW 
        ctx.fillText(this.text,this.x,this.y);
    }
}

// TITLE

const renderTitle = () => {
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
    const { width:startWidth, actualBoundingBoxAscent:startTop, actualBoundingBoxDescent:startBottom, actualBoundingBoxLeft:startLeft } = ctx.measureText('START');
    const { width:optionsWidth, actualBoundingBoxAscent:optionsTop, actualBoundingBoxDescent:optionsBottom, actualBoundingBoxLeft:optionsLeft } = ctx.measureText('OPTIONS');
    ctx.strokeStyle = lime;
    ctx.strokeRect(320 - startLeft, 180 - startTop, startWidth, startTop + startBottom);
    ctx.strokeRect(320 - optionsLeft, 205 - optionsTop, optionsWidth, optionsTop + optionsBottom);
}

// HUD

const renderHUD = (score = 0, fuel = 100, missiles = 5) => {
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

const getBoundingRectText = (textMetric) => {

}