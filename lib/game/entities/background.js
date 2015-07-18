ig.module(
    'game.entities.background'   
)
.requires(
    'impact.entity'   
)
.defines(function() {
   
    EntityBackground = ig.Entity.extend({
       
        size: {x: 800, y: 480},
        
        animSheet: new ig.AnimationSheet('media/background.png', 800, 480),
        
        gravityFactor: 0,
        
        zIndex: -3,
        
        init: function(x, y, settings) {
            
            this.parent(x, y, settings);
            
            this.addAnim('idle', 1, [0]);
            
        }        
        
    }); 
    
});