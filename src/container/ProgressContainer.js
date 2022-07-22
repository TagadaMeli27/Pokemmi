export default class ProgressContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);
        
        // Initialize sizes of this container
        const sizes = {
            width: (config.width != undefined ? config.width : 100),
            height: (config.height!= undefined ? config.height : 10)
        }
        const gap = sizes.height / Math.tan(80 * Math.PI / 180);

        if (config.color == undefined || config.color == null) config.color = 0xff00ff;
        this.color = config.color;

        // Create background
        let background = this.scene.add.polygon(0, 0, [gap, 0, sizes.width, 0, sizes.width - gap, sizes.height, 0, sizes.height], 0x222222).setOrigin(0);
        // Create progress
        this.progress = this.scene.add.polygon(0, 0, [gap, 0, sizes.width, 0, sizes.width - gap, sizes.height, 0, sizes.height], this.color).setOrigin(0);

        // Update progress
        this.addTween(config.value);

        // Add to this container
        this.add([background, this.progress]);
    }

    updateProgress(value) {
        this.tween.remove();
        this.addTween(value);
    }

    addTween(value) {
        this.tween = this.scene.tweens.add({
            targets: this.progress,
            scaleX: value/100,
            ease: "Linear",
            duration: 500,
            repeat: 0,
            yoyo: false
        });
    }
}