// DISPLAY THE TITLE
// DISPLAY THE MAIN MENU
// DISPLAY GAME GRAPHICS
// MAYBE DISPLAY A DEMO?

class TitleMenu extends Menu{
    constructor(){
        super([
            new MenuItem('start',180),
            new MenuItem('options',205),
        ])
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