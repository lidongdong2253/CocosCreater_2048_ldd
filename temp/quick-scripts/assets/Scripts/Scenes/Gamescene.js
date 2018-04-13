(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Scenes/Gamescene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e7148DxNJAqbjILVnTNlKp', 'Gamescene', __filename);
// Scripts/Scenes/Gamescene.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        Block: cc.Prefab,
        TouchNode: cc.Prefab,
        Score: cc.Label,
        Highest_Score: cc.Label,
        GameBg: cc.Sprite,
        Score_num: 0,
        Highest_Score_Num: 0,
        Moveing: false,
        AgainStart: cc.Button,
        GameOver: cc.Node

    },
    onLoad: function onLoad() {
        //创建初始化方块的背景 小方块
        this.createrBgBlock();
        //添加触摸事件
        this.addTouchEvent();
        //初始化颜色
        this.initColor();
        //初始化gameOver
        this.GameOver.getComponent('GameOver').init(this);
    },
    start: function start() {
        //初始化数据
        this.initData();
        // this.GameOver = cc.find("GameOver")
        //获取本地存储的最高分
        this.Highest_Score_Num = cc.sys.localStorage.getItem('Highest_Score_Num');
        if (!this.Highest_Score_Num) {
            this.Highest_Score_Num = 0;
        }
        this.Highest_Score.getComponent(cc.Label).string = this.Highest_Score_Num;
        this.Score_num = 0;
        this.updateSocreScore();
    },

    //创建初始化方块的背景 小方块
    createrBgBlock: function createrBgBlock() {
        //大背景的宽和高 
        var bgSize = cc.winSize.width;
        // 方块之间的距离
        var betweenWith = 20;
        // 获取方块的大小
        var size = (bgSize - 5 * betweenWith) / 4;
        this.blockSize = size;
        //第一个方块的位置x，y
        var x = -bgSize * .5 + size * .5 + betweenWith;
        // var y = -cc.winSize.height*.5+ size*.5 + betweenWith;
        var y = -bgSize * .5 + size * .5 + betweenWith;
        //存储方块的位置
        this.blockPosition = [];
        //for循环 是为了初始化方块背景界面（16）个 
        //并且把他们的位置存储到this.blockPosition数组种
        /*
        s 代表y轴
        h 代表x轴
        */
        this.bgTouch = cc.instantiate(this.TouchNode);
        this.bgTouch.setContentSize(bgSize, bgSize);
        this.bgTouch.setPosition(0, -cc.winSize.height * .5 + bgSize * .5 + 100);
        // this.bgTouch.setColor(cc.color(255,255,255,255))
        this.node.addChild(this.bgTouch);
        for (var s = 0; s < 4; s++) {
            //push 就是添加到数组中
            this.blockPosition.push([]);
            for (var h = 0; h < 4; h++) {
                var a = cc.instantiate(this.Block);
                a.setContentSize(size, size);
                a.getChildByName("Num").active = false;
                this.blockPosition[s].push(cc.p(x, y));
                a.setPosition(cc.p(x, y));
                a.setOpacity(111);
                x += size + betweenWith;
                this.bgTouch.addChild(a);
            }
            y += size + betweenWith;
            x = -bgSize * .5 + size * .5 + betweenWith;
        }
        // cc.log(this.blockPosition)        
    },

    /// 颜色数据
    initColor: function initColor() {
        this.colors = [];
        this.colors[2] = cc.color(4, 222, 173, 255);
        this.colors[4] = cc.color(255, 87, 34, 255);
        this.colors[8] = cc.color(255, 146, 205, 255);
        this.colors[16] = cc.color(194, 56, 181, 255);
        this.colors[32] = cc.color(255, 166, 106, 255);
        this.colors[64] = cc.color(124, 189, 30, 255);
        this.colors[128] = cc.color(0, 153, 4, 255);
        this.colors[256] = cc.color(0, 160, 233, 255);
        this.colors[512] = cc.color(299, 0, 79, 255);
        this.colors[1024] = cc.color(214, 215, 98, 255);
        this.colors[2048] = cc.color(219, 0, 139, 255);
    },
    //初始化数据
    initData: function initData() {
        if (this.block) {
            for (var s = 0; s < this.block.length; s++) {
                for (var h = 0; h < this.block[s].length; h++) {
                    if (this.block[s][h]) {
                        this.block[s][h].destroy();
                    }
                }
            }
        }
        /*
        s 代表y轴
        h 代表x轴
        */
        this.data = [];
        this.block = [];
        for (var s = 0; s < 4; s++) {
            this.data.push([]);
            this.block.push([]);
            for (var h = 0; h < 4; h++) {
                this.data[s].push(0);
                this.block[s].push(null);
            }
        }
        cc.log(this.data);
        //添加小方块
        this.addBlock();
        this.addBlock();
        this.addBlock();
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
        // this.addBlock()
    },

    updateSocreScore: function updateSocreScore() {
        this.Score.getComponent(cc.Label).string = this.Score_num;
    },
    /**
     * 更新最高分数
     */
    updateHighestScore: function updateHighestScore() {
        if (this.Score_num > this.Highest_Score_Num) {
            this.Highest_Score_Num = this.Score_num;
            this.Highest_Score.getComponent(cc.Label).string = this.Highest_Score_Num;
            cc.sys.localStorage.setItem('Highest_Score_Num', this.Highest_Score_Num);
        }
    },
    // 获取空闲的位置
    getIdlePosition: function getIdlePosition() {
        var IdlePosition = [];
        cc.log("data=====" + this.data.length);
        for (var s = 0; s < this.data.length; s++) {
            for (var h = 0; h < this.data[s].length; h++) {
                if (this.data[s][h] == 0) {
                    IdlePosition.push(s * 4 + h);
                }
            }
        }
        cc.log("IdlePosition...." + IdlePosition);
        return IdlePosition;
    },
    //判断游戏结束
    isGameOver: function isGameOver() {
        for (var s = 0; s < 4; s++) {
            for (var h = 0; h < 4; h++) {
                var n = this.data[s][h];
                //上面的比较
                if (this.data[s][h] == 0) {
                    return false;
                }
                if (s + 1 <= 3) {
                    if (n == this.data[s + 1][h]) {
                        return false;
                    }
                }
                //右边的比较
                if (h + 1 <= 3) {
                    if (n == this.data[s][h + 1]) {
                        return false;
                    }
                }
                //下面的比较
                if (s - 1 >= 0) {
                    if (n == this.data[s - 1][h]) {
                        return false;
                    }
                }
                //左边的比较
                if (h - 1 >= 0) {
                    if (n == this.data[s][h - 1]) {
                        return false;
                    }
                }
            }
        }
        return true;
    },
    //添加小方块
    /*
       s1 代表y轴
       h1 代表x轴
       num {0,1}代表 2，4
       */
    addBlock: function addBlock(s1, h1, num) {
        var IdlePosition = this.getIdlePosition();
        if (IdlePosition.length == 0) {
            cc.log("没有位置了");
            return false;
        }
        //获取 0 ——IdlePosition.length 的随机数
        var p = Math.floor(Math.random() * IdlePosition.length);
        p = IdlePosition[p];
        //Math.floor(n)获取小于等于n的整数
        var s = Math.floor(p / 4);
        var h = Math.floor(p % 4);
        s = s1 || s;
        h = h1 || h;
        cc.log("随机 --位置" + p);
        cc.log("随机 --s位置" + s);
        cc.log("随机 --h位置" + h);
        var Number = [2, 2, 2, 2, 2, 2, 4, 2, 2, 2];
        var n = Math.floor(Math.random() * Number.length);
        if (num != undefined) {
            n = num;
        }
        var b = cc.instantiate(this.Block);
        b.setPosition(this.blockPosition[s][h]);
        b.setColor(this.colors[Number[n]]);
        b.setContentSize(this.blockSize, this.blockSize);
        b.getChildByName("Num").getComponent(cc.Label).string = Number[n];
        this.bgTouch.addChild(b);
        this.data[s][h] = Number[n];
        this.block[s][h] = b;
        b.scaleX = 0;
        b.scaleY = 0;
        var scale = cc.scaleTo(0.1, 1, 1);
        b.runAction(scale);

        return true;
    },
    addTouchEvent: function addTouchEvent() {
        //必须用self = this  不然下面的函数没有办法调用
        var self = this;
        //触摸事件 --开始
        this.bgTouch.on("touchstart", function (event) {
            cc.log("strart---->" + event.getLocation().x);
            //获取开始点击点
            this.startLocation = event.getLocation();
            //获取开始触摸的时间
            this.touchStartTime = Date.now();
            return true;
        });
        //触摸事件 --移动
        this.bgTouch.on("touchmove", function (event) {
            cc.log("move--->" + event.getLocation().x);
        });
        var eventTouchCallbacke = function eventTouchCallbacke(event) {
            cc.log("end---->" + event.getLocation().x);
            cc.log(self.Moveing);
            var Time = Date.now() - this.touchStartTime;
            if (Time < 600) {
                if (self.Moveing) {
                    return;
                }
                var endLocation = event.getLocation();
                var distanceLocation = cc.p(endLocation.x - this.startLocation.x, endLocation.y - this.startLocation.y);
                var moveXY = 50; //最小移动50
                cc.log("x===" + distanceLocation.x);
                cc.log("y===" + distanceLocation.y);
                if (Math.abs(distanceLocation.x) > Math.abs(distanceLocation.y)) {
                    cc.log("x 左右移动");
                    if (distanceLocation.x < -moveXY) {
                        cc.log("右 --> 左");
                        self.Moveing = true;
                        self.leftMoveX();
                    } else if (distanceLocation.x > moveXY) {
                        cc.log("左 --> 右");
                        self.Moveing = true;
                        self.rightMoveX();
                    }
                } else {
                    if (distanceLocation.y < -moveXY) {
                        self.Moveing = true;
                        cc.log("上--> 下");
                        self.downMoveY();
                    } else if (distanceLocation.y > moveXY) {
                        cc.log("下 --> 上");
                        self.Moveing = true;
                        self.upMoveY();
                    }
                }
            }
        };
        //触摸事件 --结束
        this.bgTouch.on("touchend", eventTouchCallbacke);
        //触摸事件  --离开屏幕外
        this.bgTouch.on("touchcancel", eventTouchCallbacke);
    },

    //向下运动
    downMoveY: function downMoveY() {
        var self = this;
        var isMove = false;
        //避免2次合并
        var twoMerge = [];
        for (var s = 0; s < 4; s++) {
            twoMerge.push([]);
            for (var h = 0; h < 4; h++) {
                twoMerge[s].push(0);
            }
        }
        var move = function move(s, h, callback) {
            cc.log("11111111111x=" + s);
            cc.log("y = =" + h);
            if (s == 0) {
                callback();
                return;
            } else if (self.data[s - 1][h] != 0 && self.data[s - 1][h] != self.data[s][h]) {
                callback();
                return;
            } else if (self.data[s - 1][h] == self.data[s][h] && !twoMerge[s - 1][h]) {
                twoMerge[s - 1][h] = 1;
                self.data[s - 1][h] = self.data[s - 1][h] * 2;
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h] = null;
                var p = self.blockPosition[s - 1][h];
                self.moveAction(block, p, function () {
                    self.mergeAction(block, self.block[s - 1][h], self.data[s - 1][h], callback);
                });
                isMove = true;
            } else if (self.data[s - 1][h] == 0) {
                self.data[s - 1][h] = self.data[s][h];
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s - 1][h] = block;
                cc.log(self.blockPosition[s - 1][h]);
                cc.log(self.blockPosition[s][h]);
                self.block[s][h] = null;
                var p = self.blockPosition[s - 1][h];
                self.moveAction(block, p, function () {
                    move(s - 1, h, callback);
                });
                isMove = true;
            } else {
                callback();
            }
        };
        //将要移动的方块
        var willMove = [];
        //移动方块的总数
        var totalNum = 0;
        var num = 0;
        for (var s = 0; s < 4; s++) {
            for (var h = 0; h < 4; h++) {
                if (this.data[s][h] != 0) {
                    willMove.push(cc.p(s, h));
                    totalNum += 1;
                }
            }
        }
        for (var i = 0; i < willMove.length; i++) {
            var s = willMove[i].x;
            var h = willMove[i].y;
            move(s, h, function () {
                num += 1;
                if (totalNum == num) {
                    self.finishMove(isMove);
                }
            });
        }
    },
    //向上运动
    upMoveY: function upMoveY() {
        var self = this;
        var isMove = false;
        //避免2次合并
        var twoMerge = [];
        for (var s = 0; s < 4; s++) {
            twoMerge.push([]);
            for (var h = 0; h < 4; h++) {
                twoMerge[s].push(0);
            }
        }
        var move = function move(s, h, callback) {
            cc.log("11111111111x=" + s);
            cc.log("y = =" + h);
            if (s == 3) {
                callback();
                return;
            } else if (self.data[s + 1][h] != 0 && self.data[s + 1][h] != self.data[s][h]) {
                callback();
                return;
            } else if (self.data[s + 1][h] == self.data[s][h] && !twoMerge[s + 1][h]) {
                twoMerge[s + 1][h] = 1;
                self.data[s + 1][h] = self.data[s + 1][h] * 2;
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h] = null;
                var p = self.blockPosition[s + 1][h];
                self.moveAction(block, p, function () {
                    self.mergeAction(block, self.block[s + 1][h], self.data[s + 1][h], callback);
                });
                isMove = true;
            } else if (self.data[s + 1][h] == 0) {
                self.data[s + 1][h] = self.data[s][h];
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s + 1][h] = block;
                cc.log(self.blockPosition[s + 1][h]);
                cc.log(self.blockPosition[s][h]);
                self.block[s][h] = null;
                var p = self.blockPosition[s + 1][h];
                self.moveAction(block, p, function () {
                    move(s + 1, h, callback);
                });
                isMove = true;
            } else {
                callback();
            }
        };
        //将要移动的方块
        var willMove = [];
        //移动方块的总数
        var totalNum = 0;
        var num = 0;
        for (var s = 3; s >= 0; s = s - 1) {
            for (var h = 3; h >= 0; h = h - 1) {
                if (this.data[s][h] != 0) {
                    willMove.push(cc.p(s, h));
                    totalNum += 1;
                }
            }
        }
        for (var i = 0; i < willMove.length; i++) {
            var s = willMove[i].x;
            var h = willMove[i].y;
            move(s, h, function () {
                num += 1;
                if (totalNum == num) {
                    self.finishMove(isMove);
                }
            });
        }
    },
    //向左运动
    leftMoveX: function leftMoveX() {
        var self = this;
        var isMove = false;
        //避免2次合并
        var twoMerge = [];
        for (var s = 0; s < 4; s++) {
            twoMerge.push([]);
            for (var h = 0; h < 4; h++) {
                twoMerge[s].push(0);
            }
        }
        var move = function move(s, h, callback) {
            cc.log("11111111111x=" + s);
            cc.log("y = =" + h);
            if (h == 0) {
                callback();
                return;
            } else if (self.data[s][h - 1] != 0 && self.data[s][h - 1] != self.data[s][h]) {
                callback();
                return;
            } else if (self.data[s][h - 1] == self.data[s][h] && !twoMerge[s][h - 1]) {
                twoMerge[s][h - 1] = 1;
                self.data[s][h - 1] = self.data[s][h - 1] * 2;
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h] = null;
                var p = self.blockPosition[s][h - 1];
                self.moveAction(block, p, function () {
                    self.mergeAction(block, self.block[s][h - 1], self.data[s][h - 1], callback);
                });
                isMove = true;
            } else if (self.data[s][h - 1] == 0) {
                self.data[s][h - 1] = self.data[s][h];
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h - 1] = block;
                cc.log(self.blockPosition[s][h - 1]);
                cc.log(self.blockPosition[s][h]);
                self.block[s][h] = null;
                var p = self.blockPosition[s][h - 1];
                self.moveAction(block, p, function () {
                    move(s, h - 1, callback);
                });
                isMove = true;
            } else {
                callback();
            }
        };
        //将要移动的方块
        var willMove = [];
        //移动方块的总数
        var totalNum = 0;
        var num = 0;
        for (var s = 0; s < 4; s++) {
            for (var h = 0; h < 4; h++) {
                if (this.data[s][h] != 0) {
                    willMove.push(cc.p(s, h));
                    totalNum += 1;
                }
            }
        }
        for (var i = 0; i < willMove.length; i++) {
            var s = willMove[i].x;
            var h = willMove[i].y;
            move(s, h, function () {
                num += 1;
                if (totalNum == num) {
                    self.finishMove(isMove);
                }
            });
        }
    },
    //向右运动
    rightMoveX: function rightMoveX() {
        var self = this;
        var isMove = false;
        //避免2次合并
        var twoMerge = [];
        for (var s = 0; s < 4; s++) {
            twoMerge.push([]);
            for (var h = 0; h < 4; h++) {
                twoMerge[s].push(0);
            }
        }
        var move = function move(s, h, callback) {
            cc.log("11111111111x=" + s);
            cc.log("y = =" + h);
            if (h == 3) {
                callback();
                return;
            } else if (self.data[s][h + 1] != 0 && self.data[s][h + 1] != self.data[s][h]) {
                callback();
                return;
            } else if (self.data[s][h + 1] == self.data[s][h] && !twoMerge[s][h + 1]) {

                twoMerge[s][h + 1] = 1;
                self.data[s][h + 1] = self.data[s][h + 1] * 2;
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h] = null;
                var p = self.blockPosition[s][h + 1];
                self.moveAction(block, p, function () {
                    self.mergeAction(block, self.block[s][h + 1], self.data[s][h + 1], callback);
                });
                isMove = true;
            } else if (self.data[s][h + 1] == 0) {
                self.data[s][h + 1] = self.data[s][h];
                self.data[s][h] = 0;
                var block = self.block[s][h];
                self.block[s][h + 1] = block;
                cc.log(self.blockPosition[s][h + 1]);
                cc.log(self.blockPosition[s][h]);
                self.block[s][h] = null;
                var p = self.blockPosition[s][h + 1];
                self.moveAction(block, p, function () {
                    move(s, h + 1, callback);
                });
                isMove = true;
            } else {
                callback();
            }
        };
        //将要移动的方块
        var willMove = [];
        //移动方块的总数
        var totalNum = 0;
        var num = 0;
        for (var s = 3; s >= 0; s = s - 1) {
            for (var h = 3; h >= 0; h = h - 1) {
                if (this.data[s][h] != 0) {
                    willMove.push(cc.p(s, h));
                    totalNum += 1;
                }
            }
        }
        for (var i = 0; i < willMove.length; i++) {
            var s = willMove[i].x;
            var h = willMove[i].y;
            move(s, h, function () {
                num += 1;
                if (totalNum == num) {
                    self.finishMove(isMove);
                }
            });
        }
    },
    /**
     * 移动操作
     */
    moveAction: function moveAction(block, pos, callback) {
        var m = cc.moveTo(0.08, pos);
        var finished = cc.callFunc(function () {
            callback();
        });
        block.runAction(cc.sequence(m, finished));
    },
    /**
    * 合并操作
    */
    mergeAction: function mergeAction(b1, b2, num, callback) {
        var self = this;
        b1.destroy(); // 合并后销毁
        var scale1 = cc.scaleTo(0.1, 1.2);
        var scale2 = cc.scaleTo(0.1, 1);
        var mid = cc.callFunc(function () {
            b2.setColor(self.colors[num]);
            b2.getChildByName('Num').getComponent(cc.Label).string = num;
        });
        var finished = cc.callFunc(function () {
            self.Score_num += num;

            callback();
        });
        b2.runAction(cc.sequence(scale1, mid, scale2, finished));
    },
    /**
     * 完成移动后的操作
     */
    finishMove: function finishMove(moved) {
        cc.log('finishMove');
        if (moved) {
            this.updateSocreScore();
            this.updateHighestScore();
            this.addBlock();
        } else {}
        if (this.isGameOver()) {
            cc.log("游戏结束");
            // this.AgainStart.setPosition(0,0)
            // this.GameOver.active = true
            this.GameOver.getComponent('GameOver').show();
        }
        this.Moveing = false;
    },
    againStart: function againStart() {
        cc.log("重新开始====");
        this.initData();
        this.Score_num = 0;
        this.updateSocreScore();
        // this.GameOver.getComponent('GameOver').hidden()  
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
        //# sourceMappingURL=Gamescene.js.map
        