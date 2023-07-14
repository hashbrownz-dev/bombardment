// DISPLAY THE TITLE
// DISPLAY THE MAIN MENU
// DISPLAY GAME GRAPHICS
// MAYBE DISPLAY A DEMO?

class TitleMenu{
    constructor(){
        this.selection = 0;
        this.items = [
            new MenuItem('start',180),
            new MenuItem('options',205),
        ]
    }
    update(mouse,keyboard){
        // DESELECT ALL
        this.items.forEach( item => item.selected = false );
        if(_InputMode === 'keyboard'){
            const s = this.items[this.selection];
            s.selected = true;
            if(keyboard['z'])_State = s.text;
        } else {
            this.items.forEach( item => item.update(mouse) );
        }
    }
    draw(){
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
        this.items.forEach( item => item.draw() );
    }
}