"use strict";
cc._RF.push(module, 'af1aeoPSrFMSLaUxdghqP4X', 'LoginScene');
// Scripts/Scenes/LoginScene.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        ScoreNum: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {

        var Highest_Score_Num = cc.sys.localStorage.getItem('Highest_Score_Num');
        if (!Highest_Score_Num) {
            Highest_Score_Num = 0;
        }
        this.ScoreNum.getComponent(cc.Label).string = Highest_Score_Num;
    },

    startButton: function startButton() {
        cc.director.loadScene("Gamescene");
    }

    // update (dt) {},
});

cc._RF.pop();