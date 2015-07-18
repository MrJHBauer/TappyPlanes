ig.module(
    'game.entities.rock'
)
.requires(
    'impact.entity'
)
.defines(function() {
   
    EntityRock = ig.Entity.extend({
       
        size: {x: 30, y: 215},
        offset: {x: 50, y: 0},
        animRock: new ig.AnimationSheet('media/rock.png', 108, 239),
        animRockDown: new ig.AnimationSheet('media/rockDown.png', 108, 239),        
        animSheet: null,
        gravityFactor: 0,

        zIndex: -2,
        
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        
        init: function(x, y, RockType) {
            
            this.parent(x, y);
            // Change the animSheet based of the RockType passed in the init function.
            if(RockType === "Up") {
                this.animSheet = this.animRock;
                this.offset.y = 24;
            } else if(RockType === "Down") {
                this.animSheet = this.animRockDown;
            }
            
            this.addAnim('idle', 1, [0]);
            
        },  
        
        update: function() {
            
            this.parent();
            // Everytime the player moves pass a rock increase their score.
            if(this.pos.x === ig.game.Player.pos.x) {
                ig.game.PlayerScore += 1;
            }
            
        }        
        
    });   
    
});
