class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.gif',);
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png',
         {frameWidth: 80, frameHeight: 80, startFrame: 0, endFrame: 10});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        this.p1Rocket = new Rocket(
            this, 
            game.config.width/2,
            game.config.height - borderUISize - borderPadding,
             'rocket'
         );

         this.ship1 = new ship(
             this,
             100,
             200,
             'spaceship'
         );

         this.ship2 = new ship(
            this,
            300,
            240,
            'spaceship'
        );

        this.ship3 = new ship(
            this,
            380,
            300,
            'spaceship'
        );
                

        // UI background
        this.add.rectangle(
             0, 
             borderUISize + borderPadding,
             game.config.width, 
             borderUISize * 2, 
             0x00FFFF
             ).setOrigin(0, 0);
            
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        //explosion animation config 
        this.anims.create({
            key: 'explosion',
            frames:this.anims.generateFrameNumbers('explosion',
            {start:0,end:9, first:0}),
            frameRate:30


        });

        //initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF0000',
            color: '#00FFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
            
        }

        this.scoreLeft = this.add.text(
            borderUISize + borderPadding,
            borderUISize + borderPadding*2, 
            this.p1Score, scoreConfig);
            

        // GAME OVER flag
            this.gameOver = false;

        // clock set
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        

        
        }
        update() {
            // check key input for restart
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }
            if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        
            


            this.starfield.tilePositionX -=4;
            if (!this.gameOver) {               
                this.p1Rocket.update();         // update rocket sprite
                this.ship1.update();           // update spaceships (x3)
                this.ship2.update();
                this.ship3.update();
            } 
        
            // check collisions
            if(this.checkCollision(this.p1Rocket, this.ship3)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship3);   
            }
            if (this.checkCollision(this.p1Rocket, this.ship2)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship2);
            }
            if (this.checkCollision(this.p1Rocket, this.ship1)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship1);
            }
}
               

               checkCollision(rocket,ship){
                if(rocket.x < ship.x + ship.width && 
                    rocket.x + rocket.width > ship.x && 
                    rocket.y < ship.y + ship.height &&
                    rocket.height + rocket.y > ship. y){
                        return true;
                    }else{
                        return false;
                    }
        
                 }
                 shipExplode(ship) {
                    // temporarily hide ship
                    ship.alpha = 0;                         
                    // create explosion sprite at ship's position
                    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
                    boom.anims.play('explosion');             // play explode animation
                    boom.on('animationcomplete', () => {    // callback after anim completes
                        ship.reset();                         // reset ship position
                        ship.alpha = 1;                       // make ship visible again
                        boom.destroy();                       // remove explosion sprite
                    });
                    // score add and repaint
                    this.p1Score += 1;
                    this.scoreLeft.text = this.p1Score;

                    this.sound.play('sfx_explosion');
                    this.sound.play('sfx_explosion1');
                    this.sound.play('sfx_explosion2');
                    this.sound.play('sfx_explosion3');
                }
            

    }