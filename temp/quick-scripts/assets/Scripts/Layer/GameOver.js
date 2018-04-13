(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Layer/GameOver.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '43fe6qMhdBOk7ozKICwFh3W', 'GameOver', __filename);
// Scripts/Layer/GameOver.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        ScoreNum: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        //平台 1  代表 web 微信  2  代表 手机 app
        this.platform = 2;
    },

    init: function init(game) {
        this.game = game;
        this.addTouchEvent();
    },
    show: function show() {
        this.ScoreNum.getComponent(cc.Label).string = this.game.Score_num;
        this.node.setPosition(cc.winSize.width * 0.5, cc.winSize.height * .5);
    },
    hidden: function hidden() {
        // this.node.setPosition(cc.winSize.width*0.5 + 1000,cc.winSize.height*.5)
        this.node.x = 3000;
    },
    againButton: function againButton() {
        cc.log("再来一局");
        this.hidden();
        this.game.againStart();
    },
    exitButton: function exitButton() {
        cc.log("退出游戏");
        if (this.platform == 2) {
            cc.game.end();
        } else {
            cc.log("=========");
            cc.director.loadScene("LoginScene");
        }
    },
    addTouchEvent: function addTouchEvent() {
        this.node.on("touchstart", function (event) {
            cc.log("禁止下面传递");
            return true;
        });
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
        //# sourceMappingURL=GameOver.js.map
        