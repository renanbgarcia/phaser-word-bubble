import Level1 from "./scenes/level1.js";
import Home from "./scenes/home.js";
import GameOver from "./scenes/over.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    antialising: false,
    pixelArt: true,
    // scale: {
    //     mode: Phaser.Scale.FIT,
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    scene: [Home, Level1, GameOver ],
    backgroundColor: 0x9F9060
};

var game = new Phaser.Game(config);