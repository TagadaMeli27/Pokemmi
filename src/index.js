import Phaser from "phaser";
import BootScene from "./scene/BootScene";
import TitleScene from "./scene/TitleScene";
import GameScene from "./scene/GameScene";
import TeamScene from "./scene/TeamScene";

const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: 1080,
    height: 720,
    backgroundColor: 0x252525,
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        TeamScene
    ]
};

const game = new Phaser.Game(config);
