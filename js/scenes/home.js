export default class Home extends Phaser.Scene{
    constructor(){
        super("Home");
        this.difficulty = 1;
    }

    preload(){
        this.load.image("backscreen", "assets/home_screen.jpg");
        this.load.image("easy_button", "assets/easy_button.png");
        this.load.image("medium_button", "assets/medium_button.png");
        this.load.image("hard_button", "assets/hard_button.png");
        this.load.image("tito_logo", "assets/tito_logo.png");
        this.load.audio("bgmusic", "assets/sounds/komiku_bicycle.mp3");
    }

    create(){
        this.bgmusic = this.sound.add("bgmusic");
        this.physics.add.staticImage(400, 300, "backscreen")
        this.physics.add.staticImage(720, 520, "tito_logo").setScale(0.8);

        console.log(this.bgmusic);
        if (!this.bgmusic.isPlaying) {
            this.bgmusic.play();
        }

        this.easy_button = this.physics.add.staticImage(415, 330, "easy_button").setScale(0.7);
        this.easy_button.setInteractive({ useHandCursor: true  });
        this.easy_button.on('pointerdown', function() {
            this.difficulty = 1;
            this.scene.start('Level1');
        }, this)

        this.medium_button = this.physics.add.staticImage(415, 430, "medium_button").setScale(0.7);
        this.medium_button.setInteractive({ useHandCursor: true  });
        this.medium_button.on('pointerdown', function() {
            this.difficulty = 2;
            this.scene.start('Level1');
        }, this)

        this.hard_button = this.physics.add.staticImage(415, 530, "hard_button").setScale(0.7);
        this.hard_button.setInteractive({ useHandCursor: true  });
        this.hard_button.on('pointerdown', function() {
            this.difficulty = 3;
            this.scene.start('Level1');
        }, this)
    }

    update(){

    }

}