class ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.shipSpeed = game.settings.shipSpeed;         // pixels per frame

    }   

    update() {
        this.x -= this.shipSpeed;

        if(this.x < -this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
  }