export default class Monster {
    constructor(properties) {
        // Informations
        this.name = properties.name;

        // Stats
        this.baseHp = properties.hp;
        this.hp = this.baseHp;
        this.baseLvl = properties.lvl;
        this.lvl = this.baseLvl;
        this.attack = properties.attack;
        this.specialAttack = properties.specialAttack;
        this.speed = properties.speed;
        this.defense = properties.defense;
        this.specialDefense = properties.specialDefense;

        // Potential
        this.trait = properties.trait;
        this.potential = properties.potential;

        // Attacks
        this.types = properties.types;
        this.attacks = properties.attacks;

        // Assets
        this.spriteKey = this.name;
    }

    getHpPourcent() {
        return this.convertToPourcentage(this.hp, this.baseHp);;
    }

    getLvlPourcent() {
        return this.convertToPourcentage(this.lvl, this.baseLvl);
    }

    getStatPourcent(stat) {
        return this.convertToPourcentage(stat, 150);
    }

    addMonsterSprite(scene) {
        if (this.sprite === undefined) {
            this.sprite = scene.add.image(scene.sys.game.config.width / 2 + 280, scene.sys.game.config.height / 2 + 120, this.spriteKey).setDisplaySize(250, 250);
        }
        else {
            this.sprite.setAlpha(1);
        }
    }

    removeMonsterSprite() {
        if (this.sprite != undefined) {
            this.sprite.setAlpha(0);
        }
    }

    addTypesSprites(scene, x, y) {
        let typeContainer = scene.add.container(x, y);
        let width = 0;
        for (const type of this.types) {
            let sprite = scene.add.image(width, 0, type).setDisplaySize(60, 60);
            width += 70;
            typeContainer.add([sprite]);
        }
        return typeContainer;
    }

    convertToPourcentage(value, base_value) {
        return Math.round(value * 100 / base_value);
    }

    getHpColor() {
        if (this.getHpPourcent() > 80) {
            return 0x0c9a34;
        }
        
        if (this.getHpPourcent() >= 50) {
            return 0x00ffff;
        }

        if (this.getHpPourcent() > 20) {
            return 0xfff200;
        }
        else {
            return 0xec1c24;
        }
    }
}