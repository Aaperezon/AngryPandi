var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update, render: render});
var player
var food
var LEFT, RIGHT, UP, DOWN
var movement_x, movement_y
var line1, line2
var minutes_counter = pad(0);
var seconds_counter = pad(0);
var totalSeconds = 0;
var food_eaten = 0
var level = 0
var seconds_left = minutes_left =  pad(10)
setInterval(setTime, 1000);
var timer_text, score_text, level_text

function preload() {
	handleRemoteImagesOnJSFiddle();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#dc7687';
    game.load.image('player','./img/vanelope.png');
    game.load.image('food', './img/helado.png');
    movement_x = 1
    movement_y = 1
}

function create() {
    player = game.add.image(Math.random()*380+50,Math.random()*280+50,'player')
    player.width = 40
    player.height = 67
    // game.physics.enable(player, Phaser.Physics.ARCADE);
    food = game.add.image(game.world.width*0.5, game.world.height*.5, 'food');
    // food.scale = 0.5
    game.physics.enable(food, Phaser.Physics.ARCADE);

    line1 = new Phaser.Line(player.x, player.y, food.x, food.y);
    line2 = new Phaser.Line(player.x+player.width, player.y+player.height, food.x+food.width, food.y+food.height);
    timer_text = game.add.text(0, 0, 'Time left: '+minutes_counter+":"+seconds_counter, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:13 });
    score_text = game.add.text(200, 0, 'Food eaten: '+food_eaten, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:13 });
    level_text = game.add.text(400, 0, 'Level: '+level, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize:13 });
    
    totalSeconds=12;
}

function update() {
    movePlayer()
    // console.log("X:"+movement_x+" Y:"+movement_y);
    line1.setTo(player.x, player.y, food.x, food.y);
    line2.setTo(player.x+player.width, player.y+player.height, food.x+food.width, food.y+food.height);

    timer_text.text = 'Time left: '+minutes_counter+":"+seconds_counter
    level_text.text = 'Level: '+level
    score_text.text = 'Food eaten: '+food_eaten
    //game.physics.arcade.collide(player, food, playerEatFood, null, game);
    collide()
    finishGame()
} 

function collide(){
    if (player.x < food.x + food.width &&
        player.x + player.width > food.x &&
        player.y < food.y + food.height &&
        player.height + player.y > food.y) {
            console.log("COLISION");
            playerEatFood()
     }else{
        console.log("NO HAN CHOCADO");
     }
     
}

function finishGame(){
    if(totalSeconds <= 0)
        location.reload();
    else{
        // Seguir jugando
    }
}

function render(){
    game.debug.geom(line1);
    game.debug.geom(line2);
}

function setTime() {
    --totalSeconds;
    seconds_counter = pad(totalSeconds % 60);
    minutes_counter = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
}

function playerEatFood(ball, brick) {
    food.kill();
    food = game.add.sprite(Math.random()*380+50, Math.random()*280+50, 'food');
    game.physics.enable(food, Phaser.Physics.ARCADE);
    movement_x = Math.abs(movement_x)+1
    movement_y = Math.abs(movement_y)+1
    if(food_eaten % 3 == 0){
        level++
    }
    food_eaten++
    totalSeconds+=2
}

function movePlayer(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        LEFT = true
        RIGHT = false
        UP = false
        DOWN = false
        // console.log("LEFT")
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        LEFT = false
        RIGHT = true
        UP = false
        DOWN = false    
        // console.log("RIGHT")
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        LEFT = false
        RIGHT = false
        UP = true
        DOWN = false    
        // console.log("UP")
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        LEFT = false
        RIGHT = false
        UP = false
        DOWN = true    
        // console.log("DOWN")
    }
    if(LEFT == true){
        if(movement_x > 0){
            movement_x *= -1
        }
        player.x += movement_x;
    }
    else if(RIGHT == true){
        if(movement_x < 0){
            movement_x *= -1
        }
        player.x += movement_x;
    }
    else if(UP == true){
        if(movement_y > 0){
            movement_y *= -1
        }
        player.y += movement_y;
    }
    else if(DOWN == true){
        if(movement_y < 0){
            movement_y *= -1
        }
        player.y += movement_y;
    }

}

function handleRemoteImagesOnJSFiddle() {
	game.load.baseURL = '.';
	game.load.crossOrigin = 'anonymous';
}