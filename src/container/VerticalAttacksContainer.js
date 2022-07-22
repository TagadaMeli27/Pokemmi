export default class VerticalAttacksContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);

        // Initialize sizes of this container
        this.sizes = {
            width: this.scene.sys.game.config.width / 2 - 75,
            height: this.scene.sys.game.config.height - 200
        }
        const gap = this.sizes.height / Math.tan(80 * Math.PI / 180);

        // Create background and add to the container
        this.background = this.scene.add.polygon(0, 0, [0, 0, this.sizes.width, 0, this.sizes.width - gap, this.sizes.height, 0, this.sizes.height], 0x131313);
        this.add([this.background]);
        this.hide();
    }
    
    hide() {
        this.setAlpha(0);
    }

    show() {
        this.setAlpha(1);
    }

    updateInformations(selectedMonster) {
        // Remove old attacks
        this.removeBetween({
            startIndex: 1,
            destroyChild: true
        });
    
        // Add new attacks
        let height = -150;
        for (const attack of selectedMonster.attacks) {
            this.add(this.scene.add.image(-30, height, attack.title).setScale(0.25));
            height += 150;
        }
    }
}