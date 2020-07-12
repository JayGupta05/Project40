class Form{
    constructor(){
        this.input = createInput("name");
        this.button = createButton("play");
        this.greeting = createElement('h3');
        this.reset = createButton("Reset");
    }

    hide(){
        this.button.hide();
        this.input.hide();
        this.greeting.hide();
    }

    display(){
        var title = createElement('h2');
        title.html("Horizontal Hurdles");
        title.position(displayWidth/2-50,0);
        this.input.position(displayWidth/2-40,displayHeight/2-80);
        this.button.position(displayWidth/2+30,displayHeight/2);
        this.reset.position(displayWidth-100,20);
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello  "+ player.name);
            this.greeting.position(displayWidth/2,displayHeight/2-100);
        })
        this.reset.mousePressed(()=>{
            game.update(0);
            player.updateCount(0);
            Player.updateRank(0);
            Player.removePlayers();
        })
    }
}