import HudScene from "./HudScene";

export default class GameScene extends HudScene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    create() {
        super.create();
        this.add.graphics().fillStyle(0xff00ff, 1).fillRect(250, 250, 250, 250);
    }
}