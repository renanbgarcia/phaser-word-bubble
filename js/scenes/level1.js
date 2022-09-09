export default class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
        this.direction = -300;
        // this.words = ["uva", "abacaxi", "alga", "lua"];
        this.words = ['abacate','abacaxi','ajuda','alicate','azedo','banana','bala','batata','beleza','bexiga','bife','bigode','bobo','boca','bode','café','cafuné','canela','caneta','canudo','coxa','cubo','dominó','doze','dúvida','dívida','dama','data','dedo','exame','educado','exemplo','época','farofa','fé','fumaça','furo','galo','gama','gola','goma','gorila','gula','guri','guru','hábito','habilidade','hálito','hino','hipopótamo','idade','ídolo','imagem','iluminado','imigrante','janela','jaleco','jabuti','jabá','javali','jiló','jipe','judô','lâmina','lã','laje','leve','lima','lupa','luto','luva','macaco','mala','maluco','menino','moleza','mudo','nada','natureza','nítido','novela','opaco','pato','pepino','perigo','peteca','pomada','puma','rápido','rolo','saco','sacola','sábado','sede','sopa','subida','suco','sujo','tela','tomate','tubo','universo','único','unidade','urina','urubu','vaca','vaso','vara','vela','vizinho','xaveco','xícara','xarope','xerife','xícara','zero'];
        this.theWord = this.words[0];
        this.theletter = this.theWord[0];
        this.wcounter = 0;
        this.lcounter = 0;
        this.lives = 3;
        this.score = 0;
    }

    preload(){
        this.load.image("bubbler", "assets/bubbler.png");
        this.load.image("bubble", "assets/bubble.png");
        this.load.image("drop", "assets/drop.png");
        this.load.image("mine", "assets/mine.png");
        this.load.image("sky", "assets/sky.jpg");
        this.load.image("back_button", "assets/back_button.png");
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

        this.load.audio('wrong', 'assets/sounds/wrong.mp3');
        this.load.audio('right', 'assets/sounds/right.mp3');
    }

    create(){
        this.getVelocity(this.scene.get('Home').difficulty);
        this.physics.add.staticImage(400, 300, 'sky')
        this.back_button = this.physics.add.staticImage(60, 120, 'back_button').setScale(0.4).setOrigin(0,0);
        this.back_button.setInteractive({ useHandCursor: true  });
        this.back_button.on('pointerdown', function() {
            console.log("Hooome");
            this.score = 0;
            this.scene.start('Home');
        }, this)

        this.player = this.physics.add.sprite(400, 500, 'bubbler');
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.physics.world.on('worldbounds', (body, up, down, left, right) => {
            if (body.gameObject.texture.key === "bubbler") this.invertDirection();
        });
        this.bubbles = this.physics.add.group();

        this.input.keyboard.on('keydown-SPACE', function (event) {
            this.scene.bubbles.create(this.scene.player.x, this.scene.player.y, "bubble").setVelocityY(-200). setScale(0.8);
        });

        // this.displayText = this.add.text(320, 50, this.theWord, { fontFamily: 'Avocado Days', fontSize: '50px' });
        this.displayText = this.genereateChars(this.theWord);

        this.displayLives = this.add.text(60, 50, "VIDAS: " + this.lives, { fontFamily: 'Grobold', fontSize: '25px', color: '#0033cc' });
        this.displayScore = this.add.text(60, 90, "PONTOS: " + this.score, { fontFamily: 'Grobold', fontSize: '25px', color: '#0033cc' });

        this.letter1 = this.physics.add.image(200, 250, this.theletter).setImmovable().setData("isCorrect", true);
        this.letter2 = this.physics.add.image(630, 250, this.chooseRandomLetter()).setImmovable().setData("isCorrect", false);
        this.mine = this.physics.add.image(415, 250, "mine").setImmovable();

        this.letter1.setScale(1.2);
        this.letter2.setScale(1.2);
        this.mine.setScale(0.3);

        this.invertLetterPosition(this.letter1, this.letter2);

        this.wrongSound = this.sound.add('wrong');
        this.rightSound = this.sound.add('right');

        this.emitter = this.add.particles('drop').createEmitter({
            speed: { min: -600, max: 600 },
            angle: { min: 0, max: 360 },
            scale: { start: 1.2, end: 0 },
            blendMode: 'NORMAL',
            lifespan: 600,
            gravityY: 400,
            quantity: 20,
            frequency: -1
        });
    }

    update(){
        this.player.setVelocityX(this.direction);

        this.physics.add.collider(this.bubbles, this.letter1, this.colliderCB, null, this);

        this.physics.add.collider(this.bubbles, this.letter2, this.colliderCB, null, this);

        this.physics.add.collider(this.bubbles, this.mine, this.colliderCB, null, this);
    }

    getVelocity(diff) {
        if (diff === 2) {
            this.direction = -550;
        } else if (diff === 3) {
            this.direction = -900;
        } else {
            this.direction = -300;
        }
        
    }

    genereateChars(txt) {
        if (this.displayText) {
            this.displayText.forEach(char => char.setActive(false).setVisible(false));
        }
        
        let res = []
        for (const [i, char] of [...txt].entries()) {
            res.push(this.add.text(320 + (i * 40), 50, char, { fontFamily: 'Avocado Days', fontSize: '50px', color: '#CC0000' }));
        }

        return res;
    }

    changeCharColor(index) {
        this.displayText[index].setColor("#008134");
    }

    invertDirection() {
        this.direction = this.direction * -1;
    }

    invertLetterPosition(A, B) {
        let dice = Phaser.Math.Between(1, 10);
        if (dice % 2 === 0) {
            return;
        }

        let dumpXA = A.x;
        let dumpYA = A.y;

        A.x = B.x;
        A.y = B.y;
        B.x = dumpXA;
        B.y = dumpYA;
    }

    colliderCB(theobject1, theobject2) {
        this.explodeBubble(theobject1);
        if (theobject1.getData("isCorrect") === true) {
            this.rightSound.play();
            this.score += 10;
            this.displayScore.setText("PONTOS: " + this.score);
            this.nextLetter();
        } else {
            this.wrongSound.play();
            this.lessLife();
        }
        theobject2.destroy();
    }

    lessLife() {
        if (this.lives === 1) {
            this.scene.start('GameOver');
            this.resetGame();
        } else {
            this.lives -= 1;
            this.displayLives.setText("VIDAS: " + this.lives);
        }
    }

    nextLetter() {

        this.changeCharColor(this.lcounter);

        this.lcounter = this.lcounter + 1;
        if (this.lcounter === this.theWord.length) {
            this.nextWord();
            return
        }

        this.theletter = this.theWord[this.lcounter];

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
        this.displayText = this.genereateChars(this.theWord);
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
        let alphabet = "abcdefghijklmnopqrstuvwxyz";
        let rletter = alphabet[Phaser.Math.Between(0, this.theWord.length - 1)];
        while (rletter === this.theletter) {
            rletter = this.theWord[Phaser.Math.Between(0, this.theWord.length - 1)];
        }
        return rletter;
    }

    explodeBubble(object) {
        this.emitter.setPosition(object.x, object.y);
        this.emitter.explode();
    }

    resetGame() {
        this.theWord = this.words[0];
        this.theletter = this.theWord[0];
        this.wcounter = 0;
        this.lcounter = 0;
        this.lives = 3;
    }
}