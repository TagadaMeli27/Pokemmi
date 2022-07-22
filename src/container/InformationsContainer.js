import ProgressContainer from "./ProgressContainer";

export default class InformationContainer extends Phaser.GameObjects.Container {
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

        // Add potential
        this.trait = this.scene.add.text(20, - this.sizes.height / 2 + 20, "Caractéristique : 36", {
            font: "bold 18px Arial",
            color: "#ffaa00",
            align: "right"
        }).setOrigin(0);
        let potential = this.scene.add.text(20, - this.sizes.height / 2 + 50, "Potentiel : 36", {
            fontFamily: "Arial",
            align: "right"
        }).setOrigin(0);
        let remainingPoints = this.scene.add.text(20, - this.sizes.height / 2 + 80, "Points restants : 0", {
            fontFamily: "Arial",
            color: "#ffaa00",
            align: "right"
        }).setOrigin(0);
        this.add([this.trait, potential, remainingPoints]);

        // Set up height to put informations
        let height = -120;
        let height_gap = 65;
        let titles = [];

        // Create attack informations
        titles.push(this.createTitle("Attaque", height));
        this.attackText = this.createProgressIndicator(height);
        this.attackBar = this.createProgressBar(height);
        this.add([this.attackBar, this.attackText]);
        height += height_gap;

        // Create special attack informations
        titles.push(this.createTitle("Attaque spéciale", height));
        this.specialAttackText = this.createProgressIndicator(height);
        this.specialAttackBar = this.createProgressBar(height);
        this.add([this.specialAttackBar, this.specialAttackText]);
        height += height_gap;

        // Create speed informations
        titles.push(this.createTitle("Vitesse", height));
        this.speedText = this.createProgressIndicator(height);
        this.speedBar = this.createProgressBar(height);
        this.add([this.speedBar, this.speedText]);
        height += height_gap;

        // Create defense informations
        titles.push(this.createTitle("Défense", height));
        this.defenseText = this.createProgressIndicator(height);
        this.defenseBar = this.createProgressBar(height);
        this.add([this.defenseBar, this.defenseText]);
        height += height_gap;

        // Create special defense informations
        titles.push(this.createTitle("Défense spéciale", height));
        this.specialDefenseText = this.createProgressIndicator(height);
        this.specialDefenseBar = this.createProgressBar(height);
        this.add([this.specialDefenseBar, this.specialDefenseText]);
        height += height_gap;

        // Create hp informations
        titles.push(this.createTitle("Points de vie", height));
        this.hpText = this.createProgressIndicator(height);
        this.hpBar = this.createProgressBar(height);
        this.add([this.hpBar, this.hpText]);

        // Add background, progressbar and text to this container
        this.add(titles);
        this.hide();
    }
    
    hide() {
        this.setAlpha(0);
    }

    show() {
        this.setAlpha(1);
    }

    updateInformations(selectedMonster) {
        // Trait
        this.trait.setText(selectedMonster.trait);
        // Attack bar
        this.attackText.setText(selectedMonster.attack);
        this.attackBar.updateProgress(selectedMonster.getStatPourcent(selectedMonster.attack));
        // Special attack bar
        this.specialAttackText.setText(selectedMonster.specialAttack);
        this.specialAttackBar.updateProgress(selectedMonster.getStatPourcent(selectedMonster.specialAttack));
        // Speed
        this.speedText.setText(selectedMonster.speed);
        this.speedBar.updateProgress(selectedMonster.getStatPourcent(selectedMonster.speed));
        // Defense bar
        this.defenseText.setText(selectedMonster.defense);
        this.defenseBar.updateProgress(selectedMonster.getStatPourcent(selectedMonster.defense));
        // Special defense bar
        this.specialDefenseText.setText(selectedMonster.specialDefense);
        this.specialDefenseBar.updateProgress(selectedMonster.getStatPourcent(selectedMonster.specialDefense));
        // Hp bar
        this.hpText.setText(selectedMonster.hp);
        this.hpBar.updateProgress(selectedMonster.getHpPourcent());
        // Update types sprites
        if (this.exists(this.type)) {
            this.type.destroy();
        }
        this.type = selectedMonster.addTypesSprites(this.scene, - this.sizes.width / 2 + 50, - this.sizes.height / 2 + 50);
        this.add([this.type]);
    }

    createTitle(title, height) {
        return this.scene.add.text(-190, height - 30, title, {
            fontFamily: "Arial",
            align: "left"
        }).setOrigin(0);
    }

    createProgressBar(height) {
        return new ProgressContainer({
            scene: this.scene,
            x: -200,
            y: height,
            color: 0x00ffff,
            value: 100,
            width: 300,
            height: 20
        });
    }

    createProgressIndicator(height) {
        return this.scene.add.text(110, height, "100", {
            fontFamily: "Arial",
            align: "right"
        }).setOrigin(0);
    }
}