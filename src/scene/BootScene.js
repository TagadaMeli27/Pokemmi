// Json configuration files
import sidebar from "../../assets/json/sidebar.json";
import team from "../../assets/json/team.json";
import Monster from "../helpers/Monster";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload() {
        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on("progress", (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60)
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on("complete", () => {
            progress.destroy();
            this.scene.start("TitleScene");
        });

        // Plugin grid table
        let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgridtableplugin.min.js';
        this.load.plugin('rexgridtableplugin', url, true);

        // HUD icons
        sidebar.top.forEach(element => {
            this.load.svg(element.key, element.assets, { width: 40, height: 40 });
        });

        sidebar.bottom.forEach(element => {
            this.load.svg(element.key, element.assets, { width: 40, height: 40 });
        });

        // Arrow and logo sprites
        this.load.svg("arrow", "assets/images/arrow-solid.svg", { width: 40, height: 40 });
        this.load.image('logo', "assets/images/logo.png");

        // All types sprites
        this.load.image('air', "assets/images/types/air.png");
        this.load.image('darkness', "assets/images/types/darkness.png");
        this.load.image('earth', "assets/images/types/earth.png");
        this.load.image('fire', "assets/images/types/fire.png");
        this.load.image('light', "assets/images/types/light.png");
        this.load.image('metal', "assets/images/types/metal.png");
        this.load.image('nature', "assets/images/types/nature.png");
        this.load.image('water', "assets/images/types/water.png");
        this.load.image('dragon', "assets/images/types/dragon.png");

        // Preload all team sprites and attacks
        this.teams = [];
        for (const monster of team) {
            this.load.image(monster.name, monster.sprite);
            for (const attack of monster.attacks) {
                this.load.image(attack.title, attack.path);
            }
            let monsterObject = new Monster({
                name: monster.name,
                trait: monster.trait,
                hp: monster.hp,
                lvl: monster.lvl,
                attack: monster.attack,
                specialAttack: monster.specialAttack,
                speed: monster.speed,
                defense: monster.defense,
                specialDefense: monster.specialDefense,
                types: monster.types,
                attacks: monster.attacks
            });

            this.teams.push(monsterObject);
        }

        // Construct data for player monster team

    }
}