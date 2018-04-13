
cc.Class({
    extends: cc.Component,

    properties: {
        ScoreNum :cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
        var Highest_Score_Num = cc.sys.localStorage.getItem('Highest_Score_Num');
        if (!Highest_Score_Num) {
            Highest_Score_Num = 0;
        }
        this.ScoreNum.getComponent(cc.Label).string = Highest_Score_Num;
    },
    startButton:function () {
        cc.director.loadScene("Gamescene")
    },

    // update (dt) {},
});
