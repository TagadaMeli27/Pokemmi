import sidebar from "../../assets/json/sidebar.json";

export default class HudScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    create() {
        // === Create sidebar menu ===
        // Sizes of one cell
        const sidebarCell = {
            with: 60,
            height: 60
        };
        
        // Background of sidebar
        this.add.graphics().fillStyle(0x131313, 1).fillRect(0, 0, sidebarCell.with, this.sys.game.config.height);

        // Create a cell container
        let newTopCellObject = (scene, cell) => {
            return scene.createCellContainer(scene, cell, sidebarCell, sidebar.top);
        };

        // Set cell container
        let onTopCellVisible = (cell) => cell.setContainer(newTopCellObject(this, cell));

        // Create top table
        this.topTable = this.add.rexGridTable(sidebarCell.with / 2, this.sys.game.config.height / 2, sidebarCell.with, this.sys.game.config.height, {
            cellWidth: sidebarCell.with,
            cellHeight: sidebarCell.height,
            cellsCount: sidebar.top.length,
            columns: 1,
            cellVisibleCallback: onTopCellVisible.bind(this),
        });

        let newBottomCellObject = function (scene, cell) {
            return scene.createCellContainer(scene, cell, sidebarCell, sidebar.bottom);
        }

        let onBottomCellVisible = (cell) => cell.setContainer(newBottomCellObject(this, cell));

        this.bottomTable = this.add.rexGridTable(sidebarCell.with / 2, this.sys.game.config.height / 2 + (this.sys.game.config.height - sidebar.bottom.length*sidebarCell.height), sidebarCell.with, this.sys.game.config.height, {
            cellWidth: sidebarCell.with,
            cellHeight: sidebarCell.height,
            cellsCount: sidebar.bottom.length,
            columns: 1,
            cellVisibleCallback: onBottomCellVisible.bind(this),
        });
    }

    switchMenu(title) {
        // Prevent switch to uncreated scene
        if (!title.includes("Scene"))
            return;

        if (this.scene.key != title) {
            this.scene.stop(title);
            this.scene.start(title);   
        }
    }

    color(icon, background, title) {
        if (this.scene.key == title) {
            icon.setTint(0x131313);
            background.setAlpha(1);
        }
        else {
            icon.setTint(0xffffff);
            background.setAlpha(0);
        }
    }

    createCellContainer(scene, cell, sidebarCell, sidebarTab) {
        // Create icon and his background
        let background = scene.add.graphics().fillStyle(0xffffff, 1).fillRect(0, 0, sidebarCell.with, sidebarCell.height);
        let icon = scene.add.image(sidebarCell.with / 2, sidebarCell.height / 2, sidebarTab[cell.index].key).setOrigin(0.5);
        scene.color(icon, background, sidebarTab[cell.index].title);
        // Add click callback
        icon.setInteractive({useHandCursor: true}).on('pointerdown', () => scene.switchMenu(sidebarTab[cell.index].title));
        // Create container to return
        return scene.add.container(0, 0, [background, icon]);
    }
}