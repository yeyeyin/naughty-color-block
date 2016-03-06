//配置信息
_config = {
        agile: {    
            allTime: 50,
            addTime: 0
        }

};

// Game对象
!function() { 
    var box = $("#room #box"),   dotted2 = $("#box .lv2 .dotted"),board2 = $("#box .lv2 .board"),stop = $("#box .stop"),lv1 = $("#room #box .lv1"),lv2 = $("#room #box .lv2"),lv3 = $("#room #box .lv3"),lv4 = $("#room #box .lv4"),tips = $("#box .tips"),
        b = {
                lv: $("#room .lv em"),              //当前分数(每过一关加一分)/关卡数
                time: $("#room .time"),             //当前剩余时间
                start: $("#dialog .btn-restart"),   //重新开始
                room: $("#room"),                   //游戏界面
                dialog: $("#dialog"),               //游戏对话框(结束)  
                d_gameover: $("#dialog .gameover"),  //游戏对话框结束界面
        }, 
        //游戏对象
        c = {   
            score: 0,count: 0, //记录连续perfect的个数
            lvx:0 ,  //关卡数
            //游戏初始化
            init: function(type, room) {  
                this.type = type;
                this.api = API[type]; //保存了游戏的核心逻辑(在agile.js中API.agile)
                this.config = _config[type]; //取出cofig中的agile数组
                this.reset(); //重置游戏
                this.room = room; 
                this.renderUI();    //渲染游戏的主界面框架(舞台)
                this.inited || this.initEvent(); //判断游戏是否被初始化过，没有的话调用初始化绑定事件
                this.inited = true; //设置游戏初始化标志
                this.start();   //开始游戏
            },
            // 重置游戏
            reset: function() {
                this.time = this.config.allTime;    //把游戏剩余时间设置为游戏配置时间(默认60s)
                this.lvx = 0;
                this.score = 0;
                b.lv.text(0);
                b.time.html(0);
            },
            //渲染游戏的主界面框架(舞台)
            renderUI: function() {
                //判断手机所在的浏览器是否为横向
                var isLandscape = (90 == window.orientation) || (-90 == window.orientation);
                //取得屏幕的最小宽度
                var width = isLandscape ? window.innerHeight : window.innerWidth;
                var height = isLandscape ? window.innerWidth : window.innerHeight;

                width = Math.min(width, 500); //最大为500  
                box.width(width); //设置box宽度
                box.height(height); //设置box高度
                this.room.show(); //显示游戏舞台
            },

            //绑定事件(Touch事件与Click事件的判断与绑定)
            initEvent: function() {
                var eventName = "ontouchstart" in document.documentElement ? "touchend" : "click", 
                    myGame = this;
                $(window).resize(function() {
                    myGame.renderUI();     //当窗口大小发生变化时，重新渲染界面
                });
                b.start.on(eventName, function() {
                    location.reload(); //重新载入页面
                });
            },

            //开始游戏
            start: function() {
                this.time > 5 && b.time.removeClass("danger"); 
                tips.html(""); 
                b.dialog.hide(); 
                this.lvx++;
                this.timer ||       
                    (this.timer = setInterval(_.bind(this.tick, this), 1000));
                this.renderMap();   //渲染游戏关卡地图
            },
            tick: function() {
                this.time--;   
                this.time < 6 && b.time.addClass("danger");   
                if(this.time < 0){
                    this.gameOver();
                }
                else{  
                    b.time.text(parseInt(this.time));
                }
            },
            renderMap: function() {this.api.render(this.lvx);},

            //绘制游戏相关信息(分数)
            renderInfo: function(e) {
                var p = 5,
                    g = 3;
                if (e == 3){this.count = 0;this.score  += g ;} 
                else if (e == 5){this.count ++;this.score += p +(this.count - 1) * 2; }//连续perfect有额外加分      
                else if ((e != 3)  && (e != 5)){this.score += e;}    
                b.lv.text(this.score); 
            },
            gameOver: function() {
                var d = this.api.getGameOverText(this.score);
                this.lastScore = this.score; 
                this.lastGameTxt = d.txtscoreShow;    
                this.lastComment = d.txtcomment;
                this.room.hide();
                b.d_gameover.show().find("#scoreShow").html(this.lastGameTxt);
                b.d_gameover.show().find("#comment").html(this.lastComment);
                box.find(".hide").fadeOut(1500, function() {
                    b.dialog.show();   
                });
            },

            nextLv: function() {
                this.start();   
            }
        };
        window.Game = c;
}();