class OptionMenu{
    constructor(){
        const screenSize = [ '1x','1.5x','fit to window', 'fullscreen' ];
        const sound = ['on','off'];
        const music = ['on','off'];
        this.params = [
            new ConfigSelect(140,'screen size',screenSize),
            new ConfigSelect(200,'sound',sound),
            new ConfigSelect(260,'music',music),
        ];
        this.returnToTitle = new MenuItem('return to title',324);
    }
    update(){
        this.params.forEach( param => param.update() );
        this.returnToTitle.update();
    }
    draw(){
        // SET FONT
        ctx.font = _MenuHeadingFont;
        ctx.fillStyle = red;
        ctx.textAlign = 'center';
        // DRAW
        ctx.fillText('OPTIONS',320,100);
        // DRAW PARAMS
        this.params.forEach( param => param.draw() );
        // DRAW RETURN TO TITLE
        this.returnToTitle.draw();
    }
}