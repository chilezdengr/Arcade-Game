// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // The image/sprite for our enemies, this uses
    // a helper provided to easily load images
    this.x = x;
    this.y = y + 63; //this arbitrary number seems to perfectly center the bug 
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.edge = this.step * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.edge) {
        this.x += this.speed * dt;
    } else {
        this.x = -this.step; //makes it offset the start poing on the row
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//hero class
 // constructor
        // properties
        // methods
class Hero {
    constructor() {
        this.sprite = 'images/char-pink-girl.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2; //starts 2 blocks away from the first row
        this.startY = (this.jump * 4) + 63;
        this.x = this.startX;
        this.y = this.startY;
        this.success = false;
    }
    // the render method draws the hero sprite using the x and y values
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(input){
        if(input === 'left') {
            this.x > 0 ? this.x -= this.step : this.x = 0;
        } else if(input === 'up') {
            if(this.y > this.jump) {
                this.y -= this.jump;
            }
        } else if(input === 'right') {
            if(this.x < this.step * 4) {
                this.x += this.step;
            }
        } else {
            if(this.y < this.jump * 4) {
                this.y += this.jump;
            }
        } 

    }
    update() {
        // Check for enemy and player collision
        // also check for game success
            //this will be on a conditional if the player reached the final tile up
            for(let enemy of allEnemies) {
                // check for x and y collision with enemy bug
                if(this.y === enemy.y && (enemy.x + (enemy.step/2) > this.x 
                && enemy.x < this.x + this.step/2)) {
                    this.reset();
                }
            }
            // check for game success here
            if(this.y === 63) {
                this.success = true;
            }
    }

    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}
   
// Instantiates a new object from the class Hero
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero();
const firstBug = new Enemy(-101, 0, 100);
const secondBug = new Enemy(-101, 83, 50);
const thirdBug = new Enemy((-101*3.5), 83, 250);
const fourthBug = new Enemy((-101* 0.5), (83*2), 10);

const allEnemies = [];
allEnemies.push(firstBug, secondBug, thirdBug, fourthBug);
console.log(allEnemies);







// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
