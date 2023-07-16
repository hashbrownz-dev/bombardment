// MENU
// Assume all Menu Item's will be center aligned...

const _MenuItemFont = `400 24px carlmarx, sans-serif`;

class Menu{
    constructor(items){
        this.selection = 0;
        this.items = items;
    }
    update(){
        this.items.forEach( item => item.update() );
    }
}

class Selection{
    constructor(text='default',x=0,y=0,align='left'){
        this.text = text;
        this.x = x;
        this.y = y;
        this.align = align;
        this.selected = false;
        ctx.font = _MenuItemFont;
        ctx.textAlign = this.align;
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
}

class MenuItem extends Selection{
    constructor(text,y){
        super(text,320,y,'center');
    }
    update(){
        this.selected = false;
        // CHECK FOR COLLISION
        if(colPointRect(_Mouse, this.boundingRect)) this.selected = true;
        // IF MOUSE IS CLICKED PERFORM ACTION
        if(this.selected && _Mouse.down){
            _State = this.text;
        }
    }
    draw(){
        // SET FONT
        ctx.font = _MenuItemFont;
        ctx.fillStyle = this.selected ? red : white;
        ctx.textAlign = this.align;
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

// CONFIG SELECTION

class ConfigSelect{
    constructor(y,title,selections){
        this.y = y;
        this.title = title;
        const selX = this.getSelectionX(selections);
        this.selections = selections.map( ( selection, i ) => {
            let s = i == 0 ? true : false;
            return new ConfigParam(selection,selX[i],this.y+25,s)
        });
    }
    getSelectionX(selections){
        // return an array (in order) of the x coordinates of each selection
        // first get the total width...
        let totalWidth = 0;
        // Set Font for Text Width
        ctx.font = _MenuItemFont;
        // Add Each Selection's Width to totalWidth
        selections.forEach( selection => {
            totalWidth += ctx.measureText(selection).width;
        });
        // Add margin total to totalWidth
        totalWidth += (selections.length - 1) * 8;
        // Subtract totalWidth from Native Screen Width and divide by 2
        const offset = (640 - totalWidth) / 2;

        const output = [offset];

        for(let i = 1; i < selections.length; i++){
            output.push( output[i-1] + ctx.measureText(selections[i-1]).width + 8 );
        }

        return output;
    }
    update(){
        this.selections.forEach( (selection) => {
            if(colPointRect(_Mouse, selection.boundingRect) && _Mouse.down && !selection.selected ){
                this.selections.forEach( (selection) => selection.selected = false );
                selection.selected = true;
                _Config[this.title] = this.selections.find( selection => selection.selected === true ).text;
                handleConfig(this.title);
            }
        })
    }
    draw(){
        // DRAW TITLE
        ctx.font = _MenuItemFont;
        ctx.fillStyle = red;
        ctx.textAlign = 'center';
        ctx.fillText(this.title.toUpperCase(),320,this.y);
        // DRAW SELECTIONS
        this.selections.forEach(selection => selection.draw());
    }
}

// CONFIG PARAMETER

class ConfigParam extends Selection{
    constructor(text,x,y, selected = false){
        super(text,x,y,'left');
        this.selected = selected;
    }
    draw(){
        // SET FONT
        ctx.font = _MenuItemFont;
        ctx.fillStyle = this.selected ? red : white;
        ctx.textAlign = this.align;
        // DRAW
        ctx.fillText(this.text,this.x,this.y);
        // DBR
        // ctx.strokeStyle = lime;
        // ctx.strokeRect(this.x - this.left, this.y - this.top, this.width, this.top + this.bottom);
    }
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