class Game{
    constructor(){}

    getState(){
        var gameStateRef = database.ref("gamestate");
        gameStateRef.on('value',function(data){
            gamestate = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gamestate : state
        })
    }

    start(){
        if(gamestate === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }  
        // create two ground and player sprites.
        player1 = createSprite(150,200,50,50);
        player1.scale = 0.1;
        player2 = createSprite(180,500,50,50);
        player2.scale = 0.1;
        ground1 = createSprite(displayWidth/2,300,displayWidth*10,10);
        ground2 = createSprite(displayWidth/2,600,displayWidth*10,10);
        players = [player1,player2];
        //use for loop to create hurdles.       
        for (var i = 600; i<6000; i = i+ 700){
            var obstacle1 = createSprite(i,225);
            obstacle1.scale = 0.2;
            obstacle1.addImage(hurdlesImage);
            obstacleGroup1.add(obstacle1);
            var obstacle2 = createSprite(i,520);
            obstacle2.scale = 0.2;
            obstacle2.addImage(hurdlesImage);
            obstacleGroup2.add(obstacle2);
        }
        player1.addImage(playerImage);
        player2.addImage(playerImage);
    }

    play(){
        form.hide();
        var getPlayerInfo = database.ref('players');
        getPlayerInfo.on('value',(data)=>{
            allPlayers = data.val();
        })
        player.getRank();
        if(allPlayers !== undefined){
            player1.collide(ground1);
            player2.collide(ground2);
            var index = 0;
            //var y = 100;
            var x = 100;
            for(var p in allPlayers){
                index++;
                //y+=200;
                x = allPlayers[p].score;
                players[index-1].x = x;
                //players[index-1].y = y;
                if(index === player.index){
                    camera.position.x = players[index-1].x;
                    camera.position.y = players[index-1].y;
                    if(keyDown("space")){
                        players[index-1].velocityY = -15;
                    }
                    players[index-1].velocityY = players[index-1].velocityY+0.8;
                }
            }
        }

        if(keyDown(RIGHT_ARROW) && player.index !== null && gamestate !== null){
            player.score+=50;
            player.update();
        }

        if(player.score >= 7500){
            gamestate = 2;
            player.rank++;
            Player.updateRank(player.rank);
            fill("red");
            stroke(10);
            text("Ranking: " + player.rank,7800,150);
        }

        drawSprites();
    }

    end(){
        console.log("Game has ended.");
    }
}