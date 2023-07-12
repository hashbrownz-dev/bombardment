// Here is where we both define our game class...

class Game {
    constructor(){
        this.player;    // the current rocket being controlled by the player
        this.actors = [];   // enemy turrets, enemy bullets
        this.forts = [];    // enemy fortifications
        this.score = 0;
        this.missiles = 10;
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
    }
    draw(){
        // DRAW ACTORS
        // DRAW EFX
        // DRAW PLAYER
        this.player.draw();
    }
}