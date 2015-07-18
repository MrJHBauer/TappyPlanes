ig.module(
    'game.entities.tap'   
)
.requires(
    'impact.entity'   
)
.defines(function() {
   
    EntityTap = ig.Entity.extend({
       
        size: {x: 59, y: 49},
        
        animSheet: new ig.AnimationSheet('media/UI/tap_spritesheet.png', 59, 59),
        
        gravityFactor: 0,
        
        zIndex: -3,
        
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.addAnim('idle', 0.6, [0, 1]);
            
        }        
        
    }); 
    
});