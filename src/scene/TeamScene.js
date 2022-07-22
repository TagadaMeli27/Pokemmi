import HudScene from "./HudScene";
import TitleContainer from "../container/TitleContainer";
import MonsterBarTeamContainer from "../container/MonsterBarTeamContainer";
import SliderContainer from "../container/SliderContainer";
import teams from "../../assets/json/team.json"
import InformationContainer from "../container/InformationsContainer";
import Monster from "../helpers/Monster";
import VerticalAttacksContainer from "../container/VerticalAttacksContainer";

export default class TeamScene extends HudScene {
    constructor() {
        super({
            key: "TeamScene"
        });
    }

    create() {
        super.create();

        // Informations and attack buttons
        let infos = new TitleContainer({
            scene: this,
            x: this.sys.game.config.width / 2 + 150,
            y: 75,
            text: "Informations"
        });

        let attaques = new TitleContainer({
            scene: this,
            x: this.sys.game.config.width / 2 + 400,
            y: 75,
            text: "Attaques"
        });

        // Check events and handle to the correct callback
        infos.emitter.on(infos.keyEmitterEnter, attaques.exitHoverState, attaques);
        infos.emitter.on(infos.keyEmitterEnter, this.showInformations, this);
        infos.emitter.on(infos.keyEmitterExit, this.hideInformations, this);
        attaques.emitter.on(attaques.keyEmitterEnter, infos.exitHoverState, infos);
        attaques.emitter.on(attaques.keyEmitterEnter, this.showAttacks, this);
        attaques.emitter.on(attaques.keyEmitterExit, this.hideAttacks, this);

        // Create information container
        this.infoContainer = new InformationContainer({
            scene: this,
            x: 325,
            y: 415
        });

        // Create information container
        this.attackContainer = new VerticalAttacksContainer({
            scene: this,
            x: 325,
            y: 415
        });

        // Create teams bar
        let height = 180;
        this.teamBar = [];
        this.team = [];
        for (const monster of teams) {
            // Create Monster Object
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

            // Save monster in table
            this.team.push(monsterObject);

            // Create associate monster bar
            let monsterBar = new MonsterBarTeamContainer({
                scene: this,
                x: 325,
                y: height,
                monster: monsterObject
            });

            // Add event listener
            monsterBar.emitter.on(monsterBar.keyEmitter, this.switchSelectedMonster, this);

            // Save monster bar in table
            this.teamBar.push(monsterBar);

            // Incrément height to display monster bar
            height += 120;
        }

        // Create team slider
        this.slider = new SliderContainer({
            scene: this,
            x: 325,
            y: 80,
            childs: this.teamBar
        });

        // Select the first monster of the team
        this.teamBar[0].enterHoverState();
    }

    showInformations() {
        this.slider.show(this.selectedBar);
        this.infoContainer.show();
    }

    showAttacks() {
        this.slider.show(this.selectedBar);
        this.attackContainer.show();
    }

    hideInformations() {
        this.slider.hide();
        this.infoContainer.hide();
    }

    hideAttacks() {
        this.slider.hide();
        this.attackContainer.hide();
    }

    switchSelectedMonster(selectedBar) {
        if (this.selectedBar != undefined && this.selectedBar != selectedBar) {
            this.selectedBar.exitHoverState();
        }
        this.selectedBar = selectedBar;
        this.selectedBar.enterHoverState();
        this.infoContainer.updateInformations(this.selectedBar.monster);
        this.attackContainer.updateInformations(this.selectedBar.monster);
    }
}