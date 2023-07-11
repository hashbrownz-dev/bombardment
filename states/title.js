// DISPLAY THE TITLE
// DISPLAY THE MAIN MENU
// DISPLAY GAME GRAPHICS
// MAYBE DISPLAY A DEMO?

const handleTitle = (keyboard,mouse) => {
    // GET INPUT + UPDATE
    // MOUSE
    _Menu.forEach( item => item.update(mouse));

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
    _Menu.forEach( item => item.draw() );
}