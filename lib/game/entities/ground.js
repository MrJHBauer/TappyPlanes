ig.module(
    'game.entities.ground'
)
.requires(
    'impact.entity'
)
.defines(function() {
   
    EntityGround = ig.Entity.extend({
       
        size: {x: 808, y: 40},
        
        offset: {x: 0, y: 30},
        
        animSheet: new ig.AnimationSheet('media/groundDirt.png', 808, 71),
        
        gravityFactor: 0,
   
        zIndex: -1,
        
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.addAnim('idle', 1, [0]);
            
        },
        
        update: function() {

            this.parent();
            // If the game has started then move the ground left by 1px. To create the visual effect the player is moving.
            if(ig.game.IsPlayerAlive === true && ig.game.IsStarted === true) {
                this.pos.x -= 1;
            }
            // If the ground has completely moved off screen reset its position.
            if(this.pos.x < -ig.system.width) {
                this.pos.x = ig.system.width + 8;
            }
            
        }   
        
        
    });   
    
});
