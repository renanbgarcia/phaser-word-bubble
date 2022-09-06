export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
        this.direction = -300;
        this.words = ["aba", "bab"];
        this.theWord = this.words[0];
        this.theletter = this.theWord[0];
        this.wcounter = 0;
        this.lcounter = 0;
    }

    preload(){
        this.load.image("ball", "assets/ball.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("a", "assets/A.png");
        this.load.image("b", "assets/B.png");
    }

    create(){
        this.player = this.physics.add.sprite(400, 500, 'ball');
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (body.gameObject.texture.key === "ball") this.invertDirection();
        });
        this.bullets = this.physics.add.group();
        // this.bullets.create(this.player.x, this.player.y, "bullet").setVelocityY(-300);

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.bullets.create(this.scene.player.x, this.scene.player.y, "bullet").setVelocityY(-200);
        });

        this.displayText = this.add.text(380, 50, this.theWord, { font: '"Arial"' });

        this.letter1 = this.physics.add.image(250, 300, this.theletter).setImmovable().setData("isCorrect", true);
        this.letter2 = this.physics.add.image(650, 300, this.chooseRandomLetter()).setImmovable().setData("isCorrect", false);
        this.invertLetterPosition(this.letter1, this.letter2);
    }

    update(){
        this.player.setVelocityX(this.direction);

        this.physics.add.collider(this.bullets, this.letter1, this.colliderCB, null, this);

        this.physics.add.collider(this.bullets, this.letter2, this.colliderCB, null, this);
    }

    invertDirection() {
        this.direction = this.direction * -1;
    }

    invertLetterPosition(A, B) {
        // let dice = Phaser.Math.Between(1, 10);
        // if (dice % 2 === 0) {
        //     return;
        // }
        console.log(A, B)

        let dumpXA = A.x;
        let dumpYA = A.y;

        A.x = B.x;
        A.y = B.y;
        B.x = dumpXA;
        B.y = dumpYA;
    }

    colliderCB(theobject1, theobject2) {
        if (theobject1.getData("isCorrect") === true) {
            this.nextLetter();
            this.invertLetterPosition(this.letter1, this.letter2);
        }
        theobject2.destroy();
    }

    nextLetter() {
        this.lcounter = this.lcounter + 1;
        if (this.lcounter === this.theWord.length - 1) {
            this.nextWord();
            return
        }
        this.theletter = this.theWord[this.lcounter];
        this.updateLettersData();
        console.log("novou", this.theletter);
    }

    nextWord() {
        this.wcounter += 1;
        if (this.wcounter === this.words.length - 1) {
            this.add.text(350, 300, "ACABOU", { font: '"Arial"' });
        }
        this.theWord = this.words[this.wcounter]
    }

    updateLettersData() {
        this.letter1.setTexture(this.theletter);
        this.letter2.setTexture(this.chooseRandomLetter(this.theWord));
    }

    chooseRandomLetter() {
        let rletter = this.theWord[Phaser.Math.Between(0, this.theWord.length - 1)];
        while (rletter === this.theletter) {
            rletter = this.theWord[Phaser.Math.Between(0, this.theWord.length - 1)];
        }
        console.log(rletter)
        return rletter;
    }
}