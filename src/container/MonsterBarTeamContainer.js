import Monster from "../helpers/Monster";
import ProgressContainer from "./ProgressContainer";

export default class MonsterBarTeamContainer extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, config.x, config.y);
        this.scene.add.existing(this);

        // Save associate monster
        this.monster = config.monster;
        
        // Save initial height of this container
        this.saveHeight = this.y;

        // Initialize sizes of this container
        const sizes = {
            width: this.scene.sys.game.config.width / 2 - 150,
            height: 80
        }
        const gap = sizes.height / Math.tan(80 * Math.PI / 180);
        const topGap = sizes.width * Math.sin(1 * Math.PI / 180);

        // Create monster name
        let name = this.scene.add.text(-(sizes.width / 2) + 25, -25, this.monster.name, {
            fontFamily: "Arial",
            align: "left"
        }).setOrigin(0);

        // Create monster lvl
        let lvl = this.scene.add.text(sizes.width / 3, -25, "Lv " + this.monster.lvl, {
            fontFamily: "Arial",
            align: "right"
        }).setOrigin(0);
        
        // Create xp bar
        let xpbar = new ProgressContainer({
            scene: this.scene,
            x: 75,
            y: -2,
            color: 0x00ffff,
            value: this.monster.getLvlPourcent()
        });
        
        // Create hp bar
        let hpbar = new ProgressContainer({
            scene: this.scene,
            x: -80,
            y: 13,
            color: this.monster.getHpColor(),
            value: this.monster.getHpPourcent(),
            width: 250,
            height: 20
        });

        // Create the quadri background
        this.background = this.scene.add.polygon(0, 0, [gap, 0, sizes.width, topGap, sizes.width - gap, sizes.height, 0, sizes.height], 0x131313);
        this.background.setInteractive({useHandCursor: true}).on("pointerdown", () => this.enterHoverState());

        // Add background, progressbar and text to this container
        this.add([this.background, name, lvl, xpbar, hpbar]);

        // Create an event emitter
        this.emitter = new Phaser.Events.EventEmitter();
        this.keyEmitter = "enterHoverState";
    }

    enterHoverState() {
        if (this.background.isStroked) return;
        this.background.setStrokeStyle(2, 0x00ffff, 1);
        this.monster.addMonsterSprite(this.scene);
        this.emitter.emit(this.keyEmitter, this);
    }

    exitHoverState() {
        this.background.setStrokeStyle();
        this.monster.removeMonsterSprite();
    }
}