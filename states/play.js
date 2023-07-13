// Here is where we both define our game class...

class Game {
    constructor(){
        this.player;    // the current rocket being controlled by the player
        this.actors = [
            new Turret(36),
            new Turret(320),
            new Turret(596),
        ];   // enemy turrets, enemy bullets
        this.forts = [
            new FortS(80,296),
            new FortM(152,280),
            new FortS(224,296),
            new FortS(368,296),
            new FortM(440,280),
            new FortS(512,296),
        ];    // enemy fortifications
        this.score = 0;
        this.missiles = 10;
    }
    get clear(){
        return this.forts.length === 0
    }
    nextLevel(){
        // reset player, forts, and missiles
        this.player = undefined;
        this.actors = [
            new Turret(36),
            new Turret(320),
            new Turret(596),
        ]
        this.forts = [
            new FortS(80,296),
            new FortM(152,280),
            new FortS(224,296),
            new FortS(368,296),
            new FortM(440,280),
            new FortS(512,296),
        ];
        this.missiles = 10;
        // adjust difficulty (?)
    }
    update(keyboard){
        // GET INPUT
        // UPDATE PLAYER
        if(this.player) {
            this.player.update(this,keyboard);
        } else if(this.missiles > 0){
            this.missiles--;
            this.player = new Player();
        } else {
            // GAME OVER
        }
        // UPDATE ACTORS
        this.actors.forEach( actor => actor.update(this) );
        // CHECK FOR COLLISIONS
        // CLEAN UP //
        // STRUCTURES
        this.forts = this.forts.filter( fort => !fort.clear );
        // ACTORS
        this.actors = this.actors.filter( actor => !actor.clear );
        // PLAYER
        if(this.player && this.player.clear) this.player = undefined;
        // LEVEL
        if(this.clear) this.nextLevel();
    }
    draw(){
        // DRAW STRUCTURES
        this.forts.forEach( fort => fort.draw() );
        // DRAW ACTORS
        this.actors.forEach( turret => turret.draw() );
        // DRAW EFX
        // DRAW PLAYER
        if(this.player)this.player.draw();
    }
}