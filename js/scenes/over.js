export default class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }

    preload(){
        this.load.image("nightsky", "assets/nightsky.jpg");
        this.load.image("play_button", "assets/play_button.png");
    }

    create(){

        this.nightsky = this.physics.add.staticImage(0, 0, "nightsky").setOrigin(0, 0);
        this.add.text(500, 80, "PONTOS: " + this.scene.get('Level1').score, { fontFamily: 'Grobold', fontSize: '25px', color: '#fff' });
        this.play_button = this.physics.add.staticImage(415, 350, "play_button").setScale(0.7);
        this.play_button.setInteractive({ useHandCursor: true  });
        this.play_button.on('pointerdown', function() {
            this.scene.get('Level1').score = 0;
            this.scene.start('Level1');
        }, this)
    }

    update(){

    }

}