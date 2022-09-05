export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
        this.direction = -300;

    }

    preload(){
        this.load.image("ball", "assets/ball.png");
        this.load.image("bullet", "assets/bullet.png");
    }

    create(){
        this.player = this.physics.add.sprite(400, 500, 'ball');
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (body.gameObject.texture.key === "ball") this.invertDirection();
            
        });
        this.bullets = this.physics.add.group();
        this.bullets.create(this.player.x, this.player.y, "bullet").setVelocityY(-300);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.bullets.create(this.scene.player.x, this.scene.player.y, "bullet").setVelocityY(-200);
        });
    }

    update(){
        this.player.setVelocityX(this.direction);
    }

    invertDirection() {
        this.direction = this.direction * -1;
    }


}