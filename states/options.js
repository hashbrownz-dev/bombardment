class OptionMenu{
    constructor(){
        this.screenSize = [ '1x','1.5x','fit to window', 'fullscreen' ];
        this.sound = ['on','off'];
        this.music = ['on','off'];
        this.params = [
            new ConfigSelect(140,'screen size',this.screenSize),
            new ConfigSelect(200,'sound',this.sound),
            new ConfigSelect(260,'music',this.music),
        ]
    }
    draw(){
        // DRAW MENU HEADING
        drawMenuHeading('options');
        // DRAW PARAMS
        this.params.forEach( param => param.draw() );
    }
}