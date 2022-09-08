export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
        this.direction = -300;
        this.words = ["abacaxi", "alga", "lua"];
        this.theWord = this.words[0];
        this.theletter = this.theWord[0];
        this.wcounter = 0;
        this.lcounter = 0;
        this.lives = 3;
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image("ball", "assets/ball.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("a", "assets/A.png");
        this.load.image("b", "assets/B.png");
        this.load.image("c", "assets/C.png");
        this.load.image("d", "assets/D.png");
        this.load.image("e", "assets/E.png");
        this.load.image("f", "assets/F.png");
        this.load.image("g", "assets/G.png");
        this.load.image("h", "assets/H.png");
        this.load.image("i", "assets/I.png");
        this.load.image("j", "assets/J.png");
        this.load.image("k", "assets/K.png");
        this.load.image("l", "assets/L.png");
        this.load.image("m", "assets/M.png");
        this.load.image("n", "assets/N.png");
        this.load.image("o", "assets/O.png");
        this.load.image("p", "assets/P.png");
        this.load.image("q", "assets/Q.png");
        this.load.image("r", "assets/R.png");
        this.load.image("s", "assets/S.png");
        this.load.image("t", "assets/T.png");
        this.load.image("u", "assets/U.png");
        this.load.image("v", "assets/V.png");
        this.load.image("w", "assets/W.png");
        this.load.image("x", "assets/X.png");
        this.load.image("y", "assets/Y.png");
        this.load.image("z", "assets/Z.png");
    }

    create(){

        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint' ]
            },
            active: function ()
            {
                this.displayText = this.add.text(380, 50, this.theWord, { fontFamily: 'Freckle Face' });
                this.displayLives = this.add.text(100, 50, "VIDAS: " + this.lives, { fontFamily: 'Finger Paint' });
            }
        });

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

        // this.displayText = this.add.text(380, 50, this.theWord, { fontFamily: 'Avocado Days' });
        // this.displayLives = this.add.text(100, 50, "VIDAS: " + this.lives, { fontFamily: 'Grobold' });

        this.letter1 = this.physics.add.image(200, 250, this.theletter).setImmovable().setData("isCorrect", true);
        this.letter2 = this.physics.add.image(630, 250, this.chooseRandomLetter()).setImmovable().setData("isCorrect", false);
        this.bomb = this.physics.add.image(415, 250, "bomb").setImmovable();

        this.letter1.setScale(1.2);
        this.letter2.setScale(1.2);
        this.bomb.setScale(0.3);

        this.invertLetterPosition(this.letter1, this.letter2);
    }

    update(){
        this.player.setVelocityX(this.direction);

        this.physics.add.collider(this.bullets, this.letter1, this.colliderCB, null, this);

        this.physics.add.collider(this.bullets, this.letter2, this.colliderCB, null, this);

        this.physics.add.collider(this.bullets, this.bomb, this.colliderCB, null, this);
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
            // this.invertLetterPosition(this.letter1, this.letter2);
        } else {
            this.lessLife();
        }
        theobject2.destroy();
    }

    lessLife() {
        if (this.lives === 1) {
            this.add.text(350, 300, "ACABOU", { font: '"Arial"' });
        } else {
            this.lives -= 1;
            this.displayLives.setText("VIDAS: " + this.lives);
        }
    }

    nextLetter() {
        this.lcounter = this.lcounter + 1;
        console.log(this.lcounter);
        console.log(this.theWord.length);
        if (this.lcounter === this.theWord.length) {
            this.nextWord();
            return
        }
        this.theletter = this.theWord[this.lcounter];

        console.log("novou", this.theletter);
        this.invertLetterPosition(this.letter1, this.letter2);
        this.updateLettersData();
    }

    nextWord() {
        this.wcounter += 1;
        console.log(this.wcounter);
        if (this.wcounter === this.words.length) {
            this.add.text(350, 300, "ACABOU", { font: '"Arial"' });
            return
        }
        this.theWord = this.words[this.wcounter];
        this.displayText.setText(this.theWord);
        this.lcounter = 0; 
        this.theletter = this.theWord[this.lcounter];
        this.updateLettersData();
        this.invertLetterPosition(this.letter1, this.letter2);
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