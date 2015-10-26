// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.ceil(Math.random()*400);
    this.id = new Date() + "_" + Math.random();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
} // completed

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x > 400)
    {   
        deleteBug(this);
        
        if(allEnemies.length < 4)       
        {   
            var state = Math.floor(Math.random()*3);
            if(state == 0)
                allEnemies.push(createBug(55)); 
            if(state == 1)
                allEnemies.push(createBug(140)); 
            if(state == 2)
                allEnemies.push(createBug(230));         
        }
    }
    this.x = this.x + this.speed*dt;
    
    /* add this line this.x == 10 in if to create at the beginning*/

    // this.y = (this.y * this.speed) * dt;
    // console.log(this);
    // still to add handleCollision function!!! by Angad...
} // completed

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // console.log(this);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} // completed

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
} // completed

Player.prototype.update = function(){
    for(var i=0; i<allEnemies.length; i++)
    {
        if((allEnemies[i].x >= this.x - 40) && (allEnemies[i].x <= this.x + 50) && (allEnemies[i].y >= this.y - 30) && (allEnemies[i].y <= this.y + 40))
        { 
           this.x = 202;
           this.y = 400;
        }
    }
} // completed

Player.prototype.render = function(){
    // console.log(this.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
} // completed

Player.prototype.handleInput = function(movement){
    if(movement == "up" && this.y > 10)
        this.y -= 83;
    if(movement == "down" && this.y < 390) 
        this.y += 83;
    if(movement == "left" && this.x > 0)
        this.x -= 101;
    if(movement == "right" && this.x < 360)
        this.x += 101;
    if(this.y < -15)
    { 
       this.x = 202;
       this.y = 400;
    }
} 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var createBug = function(y)
{
    return (new Enemy(10, y));
}

var deleteBug = function(obj)
{   
    for(var i=0; i<allEnemies.length; i++)
    {
        if(allEnemies[i].id == obj.id)
        {
            allEnemies.splice(i,1);
        }
    }
}


var allEnemies = [new Enemy(10, 55), new Enemy(10, 140), new Enemy(10, 230), new Enemy(10, 230)];
var player = new Player(202, 400);

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
