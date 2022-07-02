
const R = 1;
const P = 2;
const S = 3;
const P1_WON = 1;
const P2_WON = 2;
const DRAW = 3;


// ROCK PAPER SCISSOR RULES HERE
function whowon(p1,p2) {
    if (p1==R) { // person 1 picked a rock
        if (p2==S) { // rock beats scissor
            return P1_WON;
        }
    }
    if (p1==S) { // person 1 picked scissors
        if (p2==P) { // scissor beats paper
            return P1_WON;
        }
    }
    if (p1==P) { // person 1 picked paper
        if (p2==R) { // paper beats rock
            return P1_WON;
        }
    }
    if (p2==R) {
        if (p1==S) { // rock beats scissor
            return P2_WON;
        }
    }
    if (p2==S) {
        if (p1==P) { // scissor beats paper
            return P2_WON;
        }
    }
    if (p2==P) {
        if (p1==R) { // paper beats rock
            return P2_WON;
        }
    }

    // draw for everything else
    return DRAW;
}

class Person {
    constructor(scene,x,y) {

        // randomly tint
        this.color = Math.random() * 0xffffff;
        
        this.x = x;
        this.y = y;
        this.sprite = scene.add.sprite(this.x,this.y,"b");
        // set the tint
        this.sprite.tint = this.color;
    }

    pick() {
        // 1 is rock
        // 2 is paper
        // 3 is scissor
        return Phaser.Math.Between(1,3);
    }

    fight(other) {
        while (true) {
            // while you have life
            let myChoice = this.pick();
            let otherChoice = other.pick();

            let winner = whowon(myChoice,otherChoice);
            if ((winner==P1_WON) || (winner==P2_WON)) {
                // do something
                if (winner==P1_WON) {
                    // p1 won change other color
                    other.color = this.color;
                    other.sprite.tint = other.color;
                } else {
                    // other won change my color
                    this.color = other.color;
                    this.sprite.tint = this.color;
                }
                break; // stop the loop no matter who won
            } else {
                // draw no change
            }
        } // end of while loop
    }

    update() {

    }
    
    draw() {

    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("game");

        // 10 x 10 board of players
        this.players = [];
        for(let i=0;i<10;i++) {
            this.players[i] = [0,0,0,0,0,0,0,0,0,0];
        }
    }

    preload() {
        // single white png
        this.load.image("b","whitebox_32x32.png");
    }
    
    create() {
        for (let i=0;i<10;i++) {
            for (let j=0;j<10;j++) {
                this.players[i][j] = new Person(this,32+(i*32),32+(j*32));
            }
        }
    }

    update() {
        // 3 fights per cycle
        for (let i=0;i<10;i++) {

            // pick 1 random person
            let r = Phaser.Math.Between(0,9);
            let c = Phaser.Math.Between(0,9);
            let p1 = this.players[r][c];

            // pick another random person
            r = Phaser.Math.Between(0,9);
            c = Phaser.Math.Between(0,9);
            let p2 = this.players[r][c];

            // fight
            p1.fight(p2);
    
        }
    }

}

function main() {

    const gameConfig = {
        width : 600,
        height : 400,
        scene : GameScene
    }
    let game = new Phaser.Game(gameConfig);
}

window.onload = main;