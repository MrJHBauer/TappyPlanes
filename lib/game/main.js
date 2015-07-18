ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.background',
    'game.entities.ground',
    'game.entities.rock',
    'game.entities.tap',
    'game.entities.player'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/UI/KenPixelBlocks.png' ),
	
    gravity: 0,
    
    rockArray: [],
    
    Player: null,
    tap: null,
    PlayerScore: 0,
    highScore: 0,
    IsStarted: false,
    IsPlayerAlive: true,   
    
	init: function() {
		
        //this.highScore = document.cookie;
        
        // Bind input for the game. 
        ig.input.bind(ig.KEY.MOUSE1, 'jump');
        ig.input.bind(ig.KEY.SPACE, 'jump');
        ig.input.bindTouch('#canvas', 'jump');
        
        // Spawn in the different entities.
        this.spawnEntity(EntityBackground, 0, 0);
        
        this.Player = this.spawnEntity(EntityPlayer, 50, ig.system.height / 2 - (73 / 2));
	   
        this.spawnEntity(EntityGround, 0, ig.system.height - 41);
        this.spawnEntity(EntityGround, ig.system.width + 8, ig.system.height - 41);
        
        this.tap = this.spawnEntity(EntityTap, this.Player.pos.x + 100, this.Player.pos.y + 15);
        // Add two rock Up & Down so they is two rocks on screen before the player starts the game.
        this.rockArray.push(this.spawnEntity(EntityRock, 300, ig.system.height - 179, "Up"));
        this.rockArray.push(this.spawnEntity(EntityRock, 700, -60, "Down"));
        
    },
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        // Manually sort the entities in terms of their zIndex
        this.sortEntitiesDeferred();        
        // Check to see if the game has started. If not use the 'jump' input binding to starting the game.
        if(this.IsStarted === true) {
            this.gravity = 1000;
            this.tap.kill();
        } else {
            if(ig.input.pressed('jump')) {
                this.IsStarted = true;
            }
        }
        // Continue to add rocks as the game progresses
        if(this.rockArray.length < 3) {
            this.rockArray.push(this.spawnEntity(EntityRock, 1100, ig.system.height - 179, "Up"));
            this.rockArray.push(this.spawnEntity(EntityRock, 1500, -60, "Down"));
        }
        // When the player dies they can restart the game. 
        if(ig.input.state('jump') && this.IsPlayerAlive === false) {
            ig.system.setGame(MyGame);
        }
        
        /*if(this.IsPlayerAlive === false && this.IsStarted === true) {
            if(document.cookie < this.PlayerScore) {
                this.highScore = this.PlayerScore;
                document.cookie=this.PlayerScore;
            }
        }*/
        
        // Check to see if the player is alive and the game has started to have the rock move across the screen and be removed after moving off the screen. 
        if(this.IsPlayerAlive === true && this.IsStarted === true) {
            for(i = 0; i < this.rockArray.length; i++) {
                this.rockArray[i].pos.x -= 1;
                if(this.rockArray[i].pos.x < -150) {
                    this.rockArray[i].kill();
                    this.rockArray.shift();
                }
            }       
        }
        
	},
                        
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
        // Draw the different peices of text on the screen dependant on gamestate. 
        this.font.draw(this.PlayerScore, ig.system.width / 2, 20, ig.Font.ALIGN.CENTER);
		if(this.IsStarted === false) {
            this.font.draw("Art By Kenny.nl", 20, ig.system.height - 30, ig.Font.ALIGN.LEFT);
            this.font.draw("@Jack_Hodgkiss", ig.system.width - 20, ig.system.height - 30, ig.Font.ALIGN.RIGHT);
        }
        if(this.IsStarted === true && this.IsPlayerAlive === false) {
            this.font.draw("Tap To Restart", ig.system.width / 2, ig.system.height / 2 - 20, ig.Font.ALIGN.CENTER);
            //this.font.draw("Highscore: " + this.highScore, ig.system.width / 2, ig.system.height / 2 - 60, ig.Font.ALIGN.CENTER);
        }

	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 800, 480, 1 );

});
