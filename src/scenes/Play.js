class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png',);
        this.load.image('spaceship fast','./assets/spaceship fast.png',);
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

        this.ship4 = new ship(
            this,
            350,
            260,
            'spaceship fast'
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
        // high score is saved across games played
        this.hScore = parseInt(localStorage.getItem("score")) || 0;
        // scores display configuration
        let scoreConfig =
        {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "left",
            padding: {top: 5, bottom: 5},
            fixedWidth: 150
        };
        this.scoreLeft = this.add.text
        (
            50, // x-coord
            54, // y-coord
            "Score: " + this.p1Score, // initial text
            scoreConfig // config settings
        );
        this.best = this.add.text
        (
            225, // x-coord
            54, // y coord
            "Best: " + this.hScore, // initial text
            scoreConfig // config settings
        );

        // create a game clock that will countdown until game over
        this.clock = game.settings.gameTimer;
        // create an object to populate the text configuration members
        let clockConfig =
        {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "left",
            padding: {top: 5, bottom: 5},
            fixedWidth: 140
        };
        // add the text to the screen
        this.timeLeft = this.add.text
        (
            400, // x-coord
            54, // y-coord
            "Timer: " + this.formatTime(this.clock), // text to display
            clockConfig // text style config object
        );

        // add the event to Reduce the clock
        this.timedEvent = this.time.addEvent
        (
            {
                delay: 1000,
               callback : () =>
                {
                    this.clock -= 1000; 
                    this.timeLeft.text = "Timer: " +
                        this.formatTime(this.clock);
                },
                scope: this,
                loop: true
            }
        );

        // GAME OVER flag
            this.gameOver = false;
        // clock set
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        
        //speed increase after 30 seconds
        this.clock = this.time.delayedCall(game.settings.gameTimer/2, ()=> {
            game.settings.shipSpeed + 2;
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

            // when game is over remove the game clock event
            if(this.gameOver) this.time.removeAllEvents();

            this.starfield.tilePositionX -=4;
            if (!this.gameOver) {               
                this.p1Rocket.update();         // update rocket sprite
                this.ship1.update(this.factor);           // update spaceships (x3)
                this.ship2.update(this.factor);
                this.ship3.update(this.factor);
                this.ship4.update(this.factor); // fast ship
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
            if(this.checkCollision(this.p1Rocket, this.ship4)) {
                this.p1Rocket.reset();
                this.shipExplode(this.ship4);   
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

                    // update the high score
                    if(this.p1Score > this.hScore)
                    {
                        this.hScore = this.p1Score;
                        localStorage.setItem("score", this.hScore);
                        this.best.text = "Best: " + this.hScore;
                    }
                    this.scoreLeft.text = "Score: " + this.p1Score;

                    this.sound.play('sfx_explosion');

                }

                formatTime(ms)
                {
                    let s = ms/1000;
                    let min = Math.floor(s/60);
                    let seconds = s%60;
                    seconds = seconds.toString().padStart(2, "0");
                    return `${min}:${seconds}`;
                }

    }