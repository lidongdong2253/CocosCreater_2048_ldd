(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Scenes/LoginScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'af1aeoPSrFMSLaUxdghqP4X', 'LoginScene', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LoginScene.js.map
        