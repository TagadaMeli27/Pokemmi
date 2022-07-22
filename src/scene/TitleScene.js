export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: "TitleScene"
        });
    }

    create() {
        // Add logo image
        const image = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2 - 100, "logo").setScale(0.05);
        // Show this scene to the top
        this.scene.bringToTop();

        // Text who explain how to start the game
        this.pressX = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2 + 120, "Appuyez sur X pour commencer", {
            fontFamily: "Arial",
            align: "center"
        }).setOrigin(0.5);
        this.blink = 1000;

        // Key to press to start the game
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update(time, delta) {
        // Enable blinking
        this.blink -= delta;
        if (this.blink < 0) {
            this.pressX.alpha = this.pressX.alpha === 1 ? 0 : 1;
            this.blink = 500;
        }

        // Start the game if startKey is press
        if (this.startKey.isDown) {
            this.startGame();
        }
    }

    startGame() {
        this.scene.stop("GameScene");
        this.scene.start("GameScene");
    }
}