var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    database = firebase.database();
    console.log(database);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var databaseRef = database.ref("ball/position");
    databaseRef.on("value",readPositions,errorCreated);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}



function errorCreated(){
    console.log("BigError occured")
}

function writePosition(x,y){
    database.ref("ball/position").set({

        x: ball.x+x,
        y: ball.y+y

    })
}

function readPositions(data){
    position = data.val();
    console.log(position);
    ball.x = position.x;
    ball.y = position.y;

}
