require = function n(a, s, r) {
function l(c, o) {
if (!s[c]) {
if (!a[c]) {
var t = "function" == typeof require && require;
if (!o && t) return t(c, !0);
if (h) return h(c, !0);
var i = new Error("Cannot find module '" + c + "'");
throw i.code = "MODULE_NOT_FOUND", i;
}
var e = s[c] = {
exports: {}
};
a[c][0].call(e.exports, function(o) {
var t = a[c][1][o];
return l(t || o);
}, e, e.exports, n, a, s, r);
}
return s[c].exports;
}
for (var h = "function" == typeof require && require, o = 0; o < r.length; o++) l(r[o]);
return l;
}({
GameOver: [ function(o, t, c) {
"use strict";
cc._RF.push(t, "43fe6qMhdBOk7ozKICwFh3W", "GameOver");
cc.Class({
extends: cc.Component,
properties: {
ScoreNum: cc.Label
},
start: function() {
this.platform = 2;
},
init: function(o) {
this.game = o;
this.addTouchEvent();
},
show: function() {
this.ScoreNum.getComponent(cc.Label).string = this.game.Score_num;
this.node.setPosition(.5 * cc.winSize.width, .5 * cc.winSize.height);
},
hidden: function() {
this.node.x = 3e3;
},
againButton: function() {
cc.log("再来一局");
this.hidden();
this.game.againStart();
},
exitButton: function() {
cc.log("退出游戏");
if (2 == this.platform) cc.game.end(); else {
cc.log("=========");
cc.director.loadScene("LoginScene");
}
},
addTouchEvent: function() {
this.node.on("touchstart", function(o) {
cc.log("禁止下面传递");
return !0;
});
}
});
cc._RF.pop();
}, {} ],
Gamescene: [ function(o, t, c) {
"use strict";
cc._RF.push(t, "4e7148DxNJAqbjILVnTNlKp", "Gamescene");
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
Moveing: !1,
AgainStart: cc.Button,
GameOver: cc.Node
},
onLoad: function() {
this.createrBgBlock();
this.addTouchEvent();
this.initColor();
this.GameOver.getComponent("GameOver").init(this);
},
start: function() {
this.initData();
this.Highest_Score_Num = cc.sys.localStorage.getItem("Highest_Score_Num");
this.Highest_Score_Num || (this.Highest_Score_Num = 0);
this.Highest_Score.getComponent(cc.Label).string = this.Highest_Score_Num;
this.Score_num = 0;
this.updateSocreScore();
},
createrBgBlock: function() {
var o = cc.winSize.width, t = 20, c = (o - 100) / 4, i = .5 * -o + .5 * (this.blockSize = c) + t, e = .5 * -o + .5 * c + t;
this.blockPosition = [];
this.bgTouch = cc.instantiate(this.TouchNode);
this.bgTouch.setContentSize(o, o);
this.bgTouch.setPosition(0, .5 * -cc.winSize.height + .5 * o + 100);
this.node.addChild(this.bgTouch);
for (var n = 0; n < 4; n++) {
this.blockPosition.push([]);
for (var a = 0; a < 4; a++) {
var s = cc.instantiate(this.Block);
s.setContentSize(c, c);
s.getChildByName("Num").active = !1;
this.blockPosition[n].push(cc.p(i, e));
s.setPosition(cc.p(i, e));
s.setOpacity(111);
i += c + t;
this.bgTouch.addChild(s);
}
e += c + t;
i = .5 * -o + .5 * c + t;
}
},
initColor: function() {
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
initData: function() {
if (this.block) for (var o = 0; o < this.block.length; o++) for (var t = 0; t < this.block[o].length; t++) this.block[o][t] && this.block[o][t].destroy();
this.data = [];
this.block = [];
for (o = 0; o < 4; o++) {
this.data.push([]);
this.block.push([]);
for (t = 0; t < 4; t++) {
this.data[o].push(0);
this.block[o].push(null);
}
}
cc.log(this.data);
this.addBlock();
this.addBlock();
this.addBlock();
},
updateSocreScore: function() {
this.Score.getComponent(cc.Label).string = this.Score_num;
},
updateHighestScore: function() {
if (this.Score_num > this.Highest_Score_Num) {
this.Highest_Score_Num = this.Score_num;
this.Highest_Score.getComponent(cc.Label).string = this.Highest_Score_Num;
cc.sys.localStorage.setItem("Highest_Score_Num", this.Highest_Score_Num);
}
},
getIdlePosition: function() {
var o = [];
cc.log("data=====" + this.data.length);
for (var t = 0; t < this.data.length; t++) for (var c = 0; c < this.data[t].length; c++) 0 == this.data[t][c] && o.push(4 * t + c);
cc.log("IdlePosition...." + o);
return o;
},
isGameOver: function() {
for (var o = 0; o < 4; o++) for (var t = 0; t < 4; t++) {
var c = this.data[o][t];
if (0 == this.data[o][t]) return !1;
if (o + 1 <= 3 && c == this.data[o + 1][t]) return !1;
if (t + 1 <= 3 && c == this.data[o][t + 1]) return !1;
if (0 <= o - 1 && c == this.data[o - 1][t]) return !1;
if (0 <= t - 1 && c == this.data[o][t - 1]) return !1;
}
return !0;
},
addBlock: function(o, t, c) {
var i = this.getIdlePosition();
if (0 == i.length) {
cc.log("没有位置了");
return !1;
}
var e = Math.floor(Math.random() * i.length);
e = i[e];
var n = Math.floor(e / 4), a = Math.floor(e % 4);
n = o || n;
a = t || a;
cc.log("随机 --位置" + e);
cc.log("随机 --s位置" + n);
cc.log("随机 --h位置" + a);
var s = [ 2, 2, 2, 2, 2, 2, 4, 2, 2, 2 ], r = Math.floor(Math.random() * s.length);
null != c && (r = c);
var l = cc.instantiate(this.Block);
l.setPosition(this.blockPosition[n][a]);
l.setColor(this.colors[s[r]]);
l.setContentSize(this.blockSize, this.blockSize);
l.getChildByName("Num").getComponent(cc.Label).string = s[r];
this.bgTouch.addChild(l);
this.data[n][a] = s[r];
(this.block[n][a] = l).scaleX = 0;
l.scaleY = 0;
var h = cc.scaleTo(.1, 1, 1);
l.runAction(h);
return !0;
},
addTouchEvent: function() {
var i = this;
this.bgTouch.on("touchstart", function(o) {
cc.log("strart----\x3e" + o.getLocation().x);
this.startLocation = o.getLocation();
this.touchStartTime = Date.now();
return !0;
});
this.bgTouch.on("touchmove", function(o) {
cc.log("move---\x3e" + o.getLocation().x);
});
var o = function(o) {
cc.log("end----\x3e" + o.getLocation().x);
cc.log(i.Moveing);
if (Date.now() - this.touchStartTime < 600) {
if (i.Moveing) return;
var t = o.getLocation(), c = cc.p(t.x - this.startLocation.x, t.y - this.startLocation.y);
cc.log("x===" + c.x);
cc.log("y===" + c.y);
if (Math.abs(c.x) > Math.abs(c.y)) {
cc.log("x 左右移动");
if (c.x < -50) {
cc.log("右 --\x3e 左");
i.Moveing = !0;
i.leftMoveX();
} else if (50 < c.x) {
cc.log("左 --\x3e 右");
i.Moveing = !0;
i.rightMoveX();
}
} else if (c.y < -50) {
i.Moveing = !0;
cc.log("上--\x3e 下");
i.downMoveY();
} else if (50 < c.y) {
cc.log("下 --\x3e 上");
i.Moveing = !0;
i.upMoveY();
}
}
};
this.bgTouch.on("touchend", o);
this.bgTouch.on("touchcancel", o);
},
downMoveY: function() {
for (var a = this, s = !1, r = [], o = 0; o < 4; o++) {
r.push([]);
for (var t = 0; t < 4; t++) r[o].push(0);
}
var c = function o(t, c, i) {
cc.log("11111111111x=" + t);
cc.log("y = =" + c);
if (0 != t) if (0 == a.data[t - 1][c] || a.data[t - 1][c] == a.data[t][c]) if (a.data[t - 1][c] != a.data[t][c] || r[t - 1][c]) if (0 == a.data[t - 1][c]) {
a.data[t - 1][c] = a.data[t][c];
a.data[t][c] = 0;
e = a.block[t][c];
a.block[t - 1][c] = e;
cc.log(a.blockPosition[t - 1][c]);
cc.log(a.blockPosition[t][c]);
a.block[t][c] = null;
n = a.blockPosition[t - 1][c];
a.moveAction(e, n, function() {
o(t - 1, c, i);
});
s = !0;
} else i(); else {
r[t - 1][c] = 1;
a.data[t - 1][c] = 2 * a.data[t - 1][c];
a.data[t][c] = 0;
var e = a.block[t][c];
a.block[t][c] = null;
var n = a.blockPosition[t - 1][c];
a.moveAction(e, n, function() {
a.mergeAction(e, a.block[t - 1][c], a.data[t - 1][c], i);
});
s = !0;
} else i(); else i();
}, i = [], e = 0, n = 0;
for (o = 0; o < 4; o++) for (t = 0; t < 4; t++) if (0 != this.data[o][t]) {
i.push(cc.p(o, t));
e += 1;
}
for (var l = 0; l < i.length; l++) {
c(o = i[l].x, t = i[l].y, function() {
e == (n += 1) && a.finishMove(s);
});
}
},
upMoveY: function() {
for (var a = this, s = !1, r = [], o = 0; o < 4; o++) {
r.push([]);
for (var t = 0; t < 4; t++) r[o].push(0);
}
var c = function o(t, c, i) {
cc.log("11111111111x=" + t);
cc.log("y = =" + c);
if (3 != t) if (0 == a.data[t + 1][c] || a.data[t + 1][c] == a.data[t][c]) if (a.data[t + 1][c] != a.data[t][c] || r[t + 1][c]) if (0 == a.data[t + 1][c]) {
a.data[t + 1][c] = a.data[t][c];
a.data[t][c] = 0;
e = a.block[t][c];
a.block[t + 1][c] = e;
cc.log(a.blockPosition[t + 1][c]);
cc.log(a.blockPosition[t][c]);
a.block[t][c] = null;
n = a.blockPosition[t + 1][c];
a.moveAction(e, n, function() {
o(t + 1, c, i);
});
s = !0;
} else i(); else {
r[t + 1][c] = 1;
a.data[t + 1][c] = 2 * a.data[t + 1][c];
a.data[t][c] = 0;
var e = a.block[t][c];
a.block[t][c] = null;
var n = a.blockPosition[t + 1][c];
a.moveAction(e, n, function() {
a.mergeAction(e, a.block[t + 1][c], a.data[t + 1][c], i);
});
s = !0;
} else i(); else i();
}, i = [], e = 0, n = 0;
for (o = 3; 0 <= o; o -= 1) for (t = 3; 0 <= t; t -= 1) if (0 != this.data[o][t]) {
i.push(cc.p(o, t));
e += 1;
}
for (var l = 0; l < i.length; l++) {
c(o = i[l].x, t = i[l].y, function() {
e == (n += 1) && a.finishMove(s);
});
}
},
leftMoveX: function() {
for (var a = this, s = !1, r = [], o = 0; o < 4; o++) {
r.push([]);
for (var t = 0; t < 4; t++) r[o].push(0);
}
var c = function o(t, c, i) {
cc.log("11111111111x=" + t);
cc.log("y = =" + c);
if (0 != c) if (0 == a.data[t][c - 1] || a.data[t][c - 1] == a.data[t][c]) if (a.data[t][c - 1] != a.data[t][c] || r[t][c - 1]) if (0 == a.data[t][c - 1]) {
a.data[t][c - 1] = a.data[t][c];
a.data[t][c] = 0;
e = a.block[t][c];
a.block[t][c - 1] = e;
cc.log(a.blockPosition[t][c - 1]);
cc.log(a.blockPosition[t][c]);
a.block[t][c] = null;
n = a.blockPosition[t][c - 1];
a.moveAction(e, n, function() {
o(t, c - 1, i);
});
s = !0;
} else i(); else {
r[t][c - 1] = 1;
a.data[t][c - 1] = 2 * a.data[t][c - 1];
a.data[t][c] = 0;
var e = a.block[t][c];
a.block[t][c] = null;
var n = a.blockPosition[t][c - 1];
a.moveAction(e, n, function() {
a.mergeAction(e, a.block[t][c - 1], a.data[t][c - 1], i);
});
s = !0;
} else i(); else i();
}, i = [], e = 0, n = 0;
for (o = 0; o < 4; o++) for (t = 0; t < 4; t++) if (0 != this.data[o][t]) {
i.push(cc.p(o, t));
e += 1;
}
for (var l = 0; l < i.length; l++) {
c(o = i[l].x, t = i[l].y, function() {
e == (n += 1) && a.finishMove(s);
});
}
},
rightMoveX: function() {
for (var a = this, s = !1, r = [], o = 0; o < 4; o++) {
r.push([]);
for (var t = 0; t < 4; t++) r[o].push(0);
}
var c = function o(t, c, i) {
cc.log("11111111111x=" + t);
cc.log("y = =" + c);
if (3 != c) if (0 == a.data[t][c + 1] || a.data[t][c + 1] == a.data[t][c]) if (a.data[t][c + 1] != a.data[t][c] || r[t][c + 1]) if (0 == a.data[t][c + 1]) {
a.data[t][c + 1] = a.data[t][c];
a.data[t][c] = 0;
e = a.block[t][c];
a.block[t][c + 1] = e;
cc.log(a.blockPosition[t][c + 1]);
cc.log(a.blockPosition[t][c]);
a.block[t][c] = null;
n = a.blockPosition[t][c + 1];
a.moveAction(e, n, function() {
o(t, c + 1, i);
});
s = !0;
} else i(); else {
r[t][c + 1] = 1;
a.data[t][c + 1] = 2 * a.data[t][c + 1];
a.data[t][c] = 0;
var e = a.block[t][c];
a.block[t][c] = null;
var n = a.blockPosition[t][c + 1];
a.moveAction(e, n, function() {
a.mergeAction(e, a.block[t][c + 1], a.data[t][c + 1], i);
});
s = !0;
} else i(); else i();
}, i = [], e = 0, n = 0;
for (o = 3; 0 <= o; o -= 1) for (t = 3; 0 <= t; t -= 1) if (0 != this.data[o][t]) {
i.push(cc.p(o, t));
e += 1;
}
for (var l = 0; l < i.length; l++) {
c(o = i[l].x, t = i[l].y, function() {
e == (n += 1) && a.finishMove(s);
});
}
},
moveAction: function(o, t, c) {
var i = cc.moveTo(.08, t), e = cc.callFunc(function() {
c();
});
o.runAction(cc.sequence(i, e));
},
mergeAction: function(o, t, c, i) {
var e = this;
o.destroy();
var n = cc.scaleTo(.1, 1.2), a = cc.scaleTo(.1, 1), s = cc.callFunc(function() {
t.setColor(e.colors[c]);
t.getChildByName("Num").getComponent(cc.Label).string = c;
}), r = cc.callFunc(function() {
e.Score_num += c;
i();
});
t.runAction(cc.sequence(n, s, a, r));
},
finishMove: function(o) {
cc.log("finishMove");
if (o) {
this.updateSocreScore();
this.updateHighestScore();
this.addBlock();
}
if (this.isGameOver()) {
cc.log("游戏结束");
this.GameOver.getComponent("GameOver").show();
}
this.Moveing = !1;
},
againStart: function() {
cc.log("重新开始====");
this.initData();
this.Score_num = 0;
this.updateSocreScore();
}
});
cc._RF.pop();
}, {} ],
LoginScene: [ function(o, t, c) {
"use strict";
cc._RF.push(t, "af1aeoPSrFMSLaUxdghqP4X", "LoginScene");
cc.Class({
extends: cc.Component,
properties: {
ScoreNum: cc.Label
},
start: function() {
var o = cc.sys.localStorage.getItem("Highest_Score_Num");
o || (o = 0);
this.ScoreNum.getComponent(cc.Label).string = o;
},
startButton: function() {
cc.director.loadScene("Gamescene");
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "GameOver", "Gamescene", "LoginScene" ]);