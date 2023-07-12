class Actor {
    constructor(sprite){
        this.sprite = sprite;
        this.x = 0;
        this.y = 0;
        this.dir = 0;
        this.speed = 0;
        this.clear = false;
    }
    get drawX(){
        return this.x - (this.drawW / 2);
    }
    get drawY(){
        return this.y - (this.drawH / 2);
    }
    get drawW(){
        return Number(this.sprite.dimensions.drawW);
    }
    get drawH(){
        return Number(this.sprite.dimensions.drawH);
    }
    update(game){

    }
    draw(){
        renderSprite(this.sprite, this.drawX, this.drawY, { dir:this.dir })
    }
}

class Player extends Actor {
    constructor(){
        super(PlayerMissile);
        this.x = 320;
        this.y = 32;
        this.dir = 90;
        this.fuel = 100;
        this.speed = 2;
        this.turnSpeed = 2;
    }
    update(game, keyboard){
        // UPDATE FUEL
        this.fuel --;
        
        // GET INPUT AND UPDATE DIR
        if(keyboard['ArrowLeft']){
            this.dir += this.turnSpeed;
        }
        if(keyboard['ArrowRight']){
            this.dir -= this.turnSpeed;
        }
        if(keyboard[' ']){
            console.log('THRUST!');
        }
        // MOVE
        const newPos = moveActor(this);
        // CHECK FOR COLLISIONS WITH STATIC OBJECTS (game.forts)
    }
}