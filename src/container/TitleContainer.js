export default class TitleContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);
        this.name = config.text;

        // Initialize sizes of this container
        const sizes = {
            width: 200,
            height: 50
        }
        const gap = sizes.height / Math.tan(80 * Math.PI / 180);
        const topGap = sizes.width * Math.sin(1 * Math.PI / 180);
        
        // Create text
        let text = config.scene.add.text(0, 0, config.text, {
            fontFamily: "Arial",
            align: "center"
        }).setOrigin(0.5);

        // Create the quadri background
        this.background = this.scene.add.polygon(0, 0, [gap, 0, sizes.width, topGap, sizes.width - gap, sizes.height, 0, sizes.height], 0x131313);
        this.background.setInteractive({useHandCursor: true}).on("pointerdown", () => this.enterHoverState());

        // Add background and text to this container
        this.add([this.background, text]);

        // Create an event emitter
        this.emitter = new Phaser.Events.EventEmitter();
        this.keyEmitterEnter = "enterHoverState";
        this.keyEmitterExit = "exitHoverState";
    }

    enterHoverState() {
        if (this.background.isStroked)
            this.exitHoverState();
        else {
            this.background.setStrokeStyle(2, 0x00ffff, 1);
            this.emitter.emit(this.keyEmitterEnter);
        }
    }

    exitHoverState() {
        if (this.background.isStroked) {
            this.background.setStrokeStyle();
            this.emitter.emit(this.keyEmitterExit);
        }
    }
}