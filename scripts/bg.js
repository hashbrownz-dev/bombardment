// BACKGROUND

// DRAW GROUND

const drawBaseLine = () => {
    // 344
    // SET COLORS
    ctx.fillStyle = black;
    ctx.fillRect(0,344,640,16);
    ctx.strokeStyle = white;
    ctx.beginPath();
    ctx.moveTo(0,344);
    ctx.lineTo(640,344);
    ctx.stroke();
}

// DRAW BACKGROUND

class Background{
    constructor(){
        this.vert = []; // 8 Bars
        for(let i = 0; i < 8; i++){
            // vert bars move from top to bottom... thus the first element should always be the highest...
            this.vert.push(360-(i * 48));
        }
        this.hor = [];  // 14 Bars
        for(let i = 0; i < 14; i++){
            // hor[0] should have the lowest x value
            // hor bars move from right to left... thus the first element should always be the lowest...
            this.hor.push(i * 48);
        }
    }
    draw(){
        // update hor
        // hor decreases
        this.hor = this.hor.map(bar => bar-0.2);
        if(this.hor[0] < 0){
            // if the first element is below 0
            // remove the first element from the array
            this.hor.shift();
            // add a new element to the end of the array that is 48 more than the last element in the array
            this.hor.push(this.hor[this.hor.length-1]+48);
        }
        // update vert
        // vert increases
        this.vert = this.vert.map(bar => bar+0.1);
        if(this.vert[0] > 360){
            this.vert.shift();
            this.vert.push(this.vert[this.vert.length-1]-48);
        }
        ctx.strokeStyle = '#333333';
        this.hor.forEach( bar => {
            ctx.beginPath();
            ctx.moveTo(bar,0);
            ctx.lineTo(bar,360);
            ctx.stroke();
        })
        this.vert.forEach( bar => {
            ctx.beginPath();
            ctx.moveTo(0,bar);
            ctx.lineTo(640,bar);
            ctx.stroke();
        })
    }
}