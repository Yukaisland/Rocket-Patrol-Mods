class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        this.movementSpeed = 5;
        this.isFiring = false;

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        if(this.isFiring) {
            this.y -=this.movementSpeed;
            if(this.y <borderUISize*2){
                this.y =game.config.height -borderUISize-borderPadding;
                this.isFiring = false;
                this.reset();
            }
        } else{
        if(keyLEFT.isDown){
            this.x -= this.movementSpeed;
        }

        mouse.on
        (
            "pointermove", // event
            (pointer) => // callback
            {
                if(!this.isFiring)
                {
                    this.x = Phaser.Math.Clamp(pointer.x, 47, 578);
                }
            },
            this
        );

        // fire button
        if(mouse.activePointer.leftButtonDown() && !this.isFiring) 
        {
          this.isFiring = true;
          this.sfxRocket.play(); // play the rocket sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108) this.y -= 2;
        // reset on miss
        if(this.y <= 108)
        {
            this.isFiring = false;
            this.y = 431;
        }
    

        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if(keyRIGHT.isDown) {
            this.x += this.movementSpeed;
        }

        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }

        this.x = Phaser.Math.Clamp(
            this.x, 
            borderUISize+borderPadding,
            game.config.width-borderUISize-borderPadding);
    }

    }
    reset(){
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}
