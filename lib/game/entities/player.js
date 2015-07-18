ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {

    EntityPlayer = ig.Entity.extend({

        size: {x: 88, y: 73},
        
        animSheet: new ig.AnimationSheet('media/Planes/planeRed.png', 88, 73),
        
        maxVel: {x: 0, y: 3000},        

        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.addAnim('idle', 0.25, [0,1,2]);
            
        },
        
        update: function() {
            
            this.parent();
            // Cause the player to jump
            if(ig.input.pressed('jump')) {
                this.vel.y = -450;
            }
            // Stop the player from moving past the top of screen.
            if(this.pos.y < 0) {
                this.pos.y = 0;
                this.vel.y = 0;
            }
            
        },
        // If the player hits the rocks or the ground then kill it.
        check: function(other) {
            ig.game.IsPlayerAlive = false;
            this.kill();            
        }
        
    }); 
    
});