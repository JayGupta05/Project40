class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this .score = 0;
        this.rank = null;
    }

    getCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on('value',function(data){
            playerCount = data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            playerCount : count
        })
    }

    update(){
        var playerIndex = "players/player"+ this.index;
        database.ref(playerIndex).set({
            name : this.name,
            score : this.score
        })
    }

    static getPlayerInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on('value',function(data){
            allPlayers = data.val();
        })
    }

    static removePlayers(){
        database.ref('players').set({
        });
    }

    getRank(){
        database.ref("playerAtEnd").on('value',(data)=>{
            this.rank = data.val();
        })
    }

    static updateRank(x){
        database.ref("/").update({
            playerAtEnd : x
        })
    }
}