// DISPLAY MENU HEADING
// DISPLAY MENU
// DISPLAY GAME GRAPHICS

class PauseMenu extends Menu{
    constructor(){
        super([
            new MenuItem('continue',180),
            new MenuItem('retry',205),
            new MenuItem('quit',230)
        ])
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