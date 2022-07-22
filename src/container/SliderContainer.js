export default class SliderContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);

        // Save childs of this slider
        this.childs = config.childs;
        
        // Create arrows
        this.rightArrow = this.scene.add.image(225, 0, "arrow").setAngle(45);
        this.rightArrow.setInteractive({useHandCursor: true}).on("pointerdown", () => this.slideNext());
        this.leftArrow = this.scene.add.image(-220, 0, "arrow").setAngle(-135);
        this.leftArrow.setInteractive({useHandCursor: true}).on("pointerdown", () => this.slidePrevious());

        this.add([this.leftArrow, this.rightArrow]);
        this.hide();
    }

    hide() {
        this.setAlpha(0);
        for (const teamBar of this.childs) {
            teamBar.setY(teamBar.saveHeight);
            teamBar.setAlpha(1);
        }
    }

    show(selectedChild) {
        for (const teamBar of this.childs) {
            // Hide unselected team bar
            if (teamBar != selectedChild) {
                teamBar.setAlpha(0);
            }
            teamBar.setY(this.y);
        }
        this.selectedChild = selectedChild;
        this.updateSelectedChild(selectedChild);
        this.setAlpha(1);
    }

    isShowing() {
        return this.alpha == 1;
    }

    updateSelectedChild(selectedChild) {
        this.selectedChild.setAlpha(0);
        this.selectedChild = selectedChild;
        this.scene.switchSelectedMonster(this.selectedChild);
        this.selectedChild.setAlpha(1);
    }

    slideNext() {
        let index = this.childs.indexOf(this.selectedChild);
        if (index == this.childs.length - 1) {
            this.updateSelectedChild(this.childs[0]);
        }
        else {
            this.updateSelectedChild(this.childs[index + 1]);
        }
    }

    slidePrevious() {
        let index = this.childs.indexOf(this.selectedChild);
        if (index == 0) {
            this.updateSelectedChild(this.childs[this.childs.length - 1]);
        }
        else {
            this.updateSelectedChild(this.childs[index - 1]);
        }
    }
}