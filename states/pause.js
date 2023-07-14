// DISPLAY MENU HEADING
// DISPLAY MENU
// DISPLAY GAME GRAPHICS

const handlePause = (mouse) => {

}

class PauseMenu{
    constructor(){
        this.selection = 0;
        this.items = [
            new MenuItem('continue',180),
            new MenuItem('retry',205),
            new MenuItem('quit',230)
        ]
    }
    update(mouse,keyboard){
        // DESELECT ALL
        this.items.forEach( item => item.selected = false );
        // IF INPUT MODE IS KEYBOARD, SELECT THE SELECTED
        if(_InputMode === 'keyboard'){
            const s = this.items[this.selection];
            s.selected = true;
            if(keyboard['z'])_State = s.text;
        } else {
            this.items.forEach( item => item.update(mouse) );
        }
    }
    draw(){
        // DRAW BG
        ctx.fillStyle = 'rgba(0,0,0,0.75';
        ctx.fillRect(0,0,640,360);
        // DRAW HEADING
        drawMenuHeading('paused');
        // DRAW MENU ITEMS
        this.items.forEach( item => item.draw() );
    }
}