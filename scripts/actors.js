// ACTORS

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
    get colShapes(){
        return this.sprite.col.map( (shape) => {
            switch(shape.type){
                case 'circ':
                    return new Circ(this.drawX + Number(shape.x),this.drawY + Number(shape.y),Number(shape.r));
                case 'rect':
                    return new Rect(this.drawX + Number(shape.x),this.drawY + Number(shape.y),Number(shape.w),Number(shape.h));
                case 'line':
                    return new Line(this.drawX + Number(shape.x1),this.drawY + Number(shape.y1),this.drawX + Number(shape.x2),this.drawY + Number(shape.y2));
            }
        })
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
        this.fuel -= 0.1;
        if(this.fuel <= 0) this.clear = true;

        if(!this.clear){
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
            moveActor(this);
            // CHECK FOR COLLISIONS WITH STATIC OBJECTS (game.forts + baseline)
            const circ = this.colShapes[0];
            const baseline = { x:0,y:344,w:640,h:16}
            if(colCircRect(circ,baseline)){
                this.clear = true;
                return;
            }
            game.forts.forEach((fort,index,arr) => {
                if(colCircRect(circ,fort)){
                    this.clear = true;
                    fort.clear = true;
                    let points = fort.points;
                    if(this.fuel < 60) points = fort.points * 0.75;
                    if(this.fuel < 30) points = fort.points * 0.5;
                    if(this.fuel < 10) points = fort.points * 2.5;
                    game.score += points;
                }
            })
        }
    }
}

// TURRETS

class Turret extends Actor{
    constructor(x){
        super(EnemyTurret);
        this.x = x;
        this.y = 330;
        this.dir = 0;
        this.i = 1;
        this.points = 1500;
    }
    update(game){
        if(game.player){
            let dir = getDirection(this,game.player);
            if(dir < 225) dir = 225;
            if(dir > 315) dir = 315;
            this.dir = dir - 270;
            // CHECK FOR COLLISIONS
            const player = game.player.colShapes[0];
            for(const shape of this.colShapes){
                switch(shape.type){
                    case 'circ':
                        this.clear = colCirc(player,shape);
                        break;
                    case 'rect':
                        this.clear = colCircRect(player,shape);
                        break;
                }
                if(this.clear){
                    game.player.clear = true;
                    let points = this.points;
                    if(game.player.fuel < 60) points = this.points * 0.75;
                    if(game.player.fuel < 30) points = this.points * 0.5;
                    if(game.player.fuel < 10) points = this.points * 2.5;
                    game.score += points;
                    return;
                }
            }
        }
    }
    draw(){
        renderSprite(this.sprite, this.drawX, this.drawY, { 'Cannon':{dir:this.dir}, 'Energy':{yScale:1} })
    }
}

// STRUCTURES

class FortS{
    constructor(x,y){
        this.sprite = BaseS;
        this.x = x;
        this.y = y;
        this.w = Number(this.sprite.dimensions.drawW);
        this.h = Number(this.sprite.dimensions.drawH);
        this.clear = false;
        this.points = 1000;
    }
    draw(){
        renderSprite(this.sprite,this.x,this.y);
    }
}

class FortM{
    constructor(x,y){
        this.sprite = BaseM;
        this.x = x;
        this.y = y;
        this.w = Number(this.sprite.dimensions.drawW);
        this.h = Number(this.sprite.dimensions.drawH);
        this.clear = false;
        this.points = 1000;
    }
    draw(){
        renderSprite(this.sprite,this.x,this.y);
    }
}