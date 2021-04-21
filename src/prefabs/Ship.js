class ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.shipSpeed = game.settings.shipSpeed;         // pixels per frame
        this.anims.play('spaceship');

    }   

    update(speed) 
    {
        // move spaceship left
        this.x -= (speed * game.settings.shipSpeed);

        // wraparound from left to right edge
        if(this.x <= 0 - this.width) this.x = game.config.width; 
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
  }