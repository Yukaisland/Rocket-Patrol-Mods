/*---------------------------------------------------------------------
Yukai Liu
Rocket Patrol Mods(Attack on UFO)
4/20/2021
Working hours: In 3 days
-----------------------------------------------------------------------
Credit: Background:https://hdwallpaperim.com/space-pixel-art-horizon-stars/
        Explosive: purchased
        Other things else, made by my own
        I also get help from my teammate Kyle Worcester-Moore, and TAs
-----------------------------------------------------------------------
Points breakdown
Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20)
Create a new scrolling tile sprite for the background (5)
Track a high score that persists across scenes and display it in the UI (5)
Implement mouse control for player movement and mouse click to fire (20)
Create a new title screen (e.g., new artwork, typography, layout) (10)
Implement the speed increase that happens after 30 seconds in the original game (5)
Create a new animated sprite for the Spaceship enemies (10) won't happen at the first try...
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
Display the time remaining (in seconds) on the screen (10)

Totol:105
------------------------------------------------------------------------*/


let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
};

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 5;


// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// reserve an inputPlugin binding
let mouse;