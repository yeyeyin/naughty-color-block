!function() {
    var box = $("#box"),
    	lv1 = $("#room #box .lv1"),lv2 = $("#room #box .lv2"),lv3 = $("#room #box .lv3"),lv4 = $("#room #box .lv4"),lv5 = $("#room #box .lv5"),lv6 = $("#room #box .lv6"),lv7 = $("#room #box .lv7"),lv8 = $("#room #box .lv8"),lv9 = $("#room #box .lv9"),
        board1 = $("#box .lv1 .board"),dotted1 = $("#box .lv1 .dotted"),tips1 = $("#box .lv1 .tips"),
        board2 = $("#box .lv2 .board"),dotted2 = $("#box .lv2 .dotted"),tips2 = $("#box .lv2 .tips"),
		board3 = $("#box .lv3 .board"),dotted3 = $("#box .lv3 .dotted"),tips3 = $("#box .lv3 .tips"),
		board4 = $("#box .lv4 .board"),dotted4 = $("#box .lv4 .dotted"),tips4 = $("#box .lv4 .tips"),
		board5 = $("#box .lv5 .board"), dotted5 = $("#box .lv5 .dotted"),tips5 = $("#box .lv5 .tips"),
		board6 = $("#box .lv6 .board"),dotted6 = $("#box .lv6 .dotted"),tips6 = $("#box .lv6 .tips"),
		triangle71 = $("#box .lv7 #triangle"),triangle_dotted71 = $("#box .lv7 #triangle_dotted"),ring72 = $("#box .lv7 #ring"),ring_dotted72 = $("#box .lv7 #ring_dotted"),tips7= $("#box .lv7 .tips"),
		board81 = $("#box .lv8 #box1 .board"),dotted81 = $("#box .lv8 #box1 .dotted"),board82 = $("#box .lv8 #box2 .board"),dotted82 = $("#box .lv8 #box2 .dotted"),tips8 = $("#box .lv8 .tips"),
		board9 = $("#box .lv9 .board"),dotted9 = $("#box .lv9 .dotted"),tips9 = $("#box .lv9 .tips"),
        lvx= $("#room .lvx"),       //关卡数
        timer1 = null,timer2 = null,timer3 = null,timer4 = null,timer5 = null,timer6 = null,timer71 = null,timer72 = null,timer81 = null,timer82 = null,timer9 = null,
        audio = document.createElement('audio');
        source = document.createElement('source');
        source.type = "audio/mpeg";
        source.src = "audio.mp3";
        source.autoplay = "autoplay";
        source.controls = "controls";
        audio.appendChild(source);
        eventName = "ontouchstart" in document.documentElement ? "touchend" : "click";
    //游戏核心对象
    e = {
        //游戏结束时显示的文字
        lvT:["是不是上帝在我眼前遮住了帘,忘了掀开","我在那一角落患过痴呆综合症","那是一条长长的反射弧",
            "呆慢是会呼吸的痛，它活在你身上每个角落", "我很慢可是我很温柔", "感觉对了我要出发，用我自己的步伐",
            "爱能克服远距离，多远都要在一起","忘记所有烦恼来一起摇摆", "板向一阵风，吹完它就走，这样的节奏，谁都无可奈何",
            "每一次和你分开，深深的被你打败", "没那么简单，就能去点，别的全不看","你来过一下子，我想念一辈子",
            "套马杆的汉子，你威武雄壮"],
        //绘制界面(当前关卡地图lvMap(e),当前关卡数lv(f))
        render: function(d) {
            if(d==1) 
                this.render1();
            else if(d==2) 
                this.render2();
            else if(d==3)
                this.render3();
            else if(d==4)
                this.render4();
            else if(d==5)
                this.render5();
            else if(d==6)
                this.render6();
            else if(d==7)
                this.render7();
            else if(d==8)
                this.render8();
            else if(d==9)
                this.render9();
        },

        render1: function() {
            lv1.show();
            tips1.addClass("reward");
            tips1.html("连P有额外奖励喔!!!");  

            timer1=setInterval(function(){
                board1.animate({width:"250px"},1000)//语句的顺序无影响
                      .animate({width:"100px"},1000);
            },100);  

            lv1.on(eventName, function() {
                board1.stop(true);
                clearInterval(timer1);
                lv1.unbind(); 
                audio.play();

                var offsetWidth1 = board1.width();
                var difError1 = dotted1.width()+5-offsetWidth1; //差值,5为dotted的border宽度

                if ((difError1 <= 10) && (difError1 >= -10)){                                      
                    tips1.html("perfect!");tips1.removeClass("reward");                                     
                    Game.renderInfo(5);
                    lv1.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError1 < 30) && (difError1 > 10)) ||((difError1 > -30) && (difError1 < -10))){                 
                    tips1.html("good!");tips1.removeClass("reward");
                    Game.renderInfo(3);
                    lv1.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else {
                    tips1.html("bad!");tips1.removeClass("reward");
                    lv1.fadeOut(1000, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });       
        },

        render2: function() {
            lv2.show();
            lvx.html("lv2");

            timer2=setInterval(function(){
                board2.animate({width:"250px"},800)//语句的顺序无影响
                      .animate({width:"100px"},800);
            },100);  
        
            lv2.on(eventName, function() {
                board2.stop(true);
                clearInterval(timer2);
                lv2.unbind(); 
                audio.play();

                var offsetWidth2 = board2.width();
                var difError2 = offsetWidth2 - dotted2.width()-5; //差值,5为dotted的border宽度

                if ((difError2 <= 10) && (difError2 >= -10)){             
                    tips2.html("perfect!");                     
                     Game.renderInfo(5);
                    lv2.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError2 < 30) && (difError2 > 10)) ||((difError2 > -30) && (difError2 < -10))){                 
                    tips2.html("good!");
                    Game.renderInfo(3);
                    lv2.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else {
                    tips2.html("bad!");
                    lv2.fadeOut(1000, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },
        
        render3: function() {
            lv3.show();
            lvx.html("lv3");
            var end3 = box.width()-80; 
            end3 = end3+"px";
            timer3=setInterval(function(){
                board3.animate({left:end3},1500)//语句的顺序无影响
                      .animate({left:"0"},1500);
            },100);

            lv3.on(eventName, function() {
                board3.stop(true);
                clearInterval(timer3);
                lv3.unbind(); 
                audio.play();
                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var offsetLeft3 = parseFloat(board3.css("left"));
                var fixedLeft3 = dotted3.offset().left;
                var difError3 = offsetLeft3 - fixedLeft3-5; //5为dotted的border的一半宽度

                if ((difError3 <= 7) && (difError3 >= -7)){
                    tips3.html("perfect!");
                     Game.renderInfo(5);
                    lv3.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError3 < 14) && (difError3 > 7)) ||((difError3 > -14) && (difError3 < -7))){
                    tips3.html("good!");
                     Game.renderInfo(3);
                    lv3.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else {
                    tips3.html("bad!");
                    lv3.fadeOut(1000, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },

        render4: function() {
            lv4.show();
            lvx.html("lv4");
            var end4 = box.width()-80; 
             end4 = end4+"px";
            timer4=setInterval(function(){
                board4.animate({left:end4},1300)//语句的顺序无影响
                      .animate({left:"0"},1300);
            },100);

            lv4.on(eventName, function() {
                board4.stop(true);
                clearInterval(timer4);
                lv4.unbind(); 
                audio.play();

                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var offsetLeft4 = parseFloat(board4.css("left"));
                var fixedLeft4=dotted4.offset().left;

                var difError4 = offsetLeft4 - fixedLeft4-5; 
                if ((difError4 <= 7) && (difError4 >= -7)){
                    tips4.html("perfect!");
                    Game.renderInfo(5);
                    lv4.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError4 < 14) && (difError4 > 7)) ||((difError4 > -14) && (difError4 < -7))){
                    tips4.html("good!");
                    Game.renderInfo(3);
                    lv4.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }
                else {
                    tips4.html("bad!");
                    lv4.fadeOut(1000, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },

        render5:function  () {
            lv5.show();
            lvx.html("lv5");
            var end5 = box.width()-100; 
            end5 = end5+"px";
            timer5 = setInterval(function(){
                board5.animate({left:end5},1200)//语句的顺序无影响
                      .animate({left:"0px"},1200);
            },100);

            lv5.on(eventName, function() {
                board5.stop(true);
                clearInterval(timer5);
                lv5.unbind(); 
                audio.play();

                board5.animate({top:'325px'},1000);
                var offsetWidth5 = parseFloat( board5.css("left"));
                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var fixedWidth5 = dotted5.offset().left;
                var difError5 = offsetWidth5 - fixedWidth5-5;

                if ((difError5 <= 7) && (difError5 >= -7)){
                    setTimeout(function(){tips5.html("perfect!");},1000);
                    Game.renderInfo(5);
                    lv5.fadeOut(2500, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError5 < 14) && (difError5 > 7)) ||((difError5 > -14) && (difError5 < -7))){
                    setTimeout(function(){tips5.html("good!");},1000);
                    Game.renderInfo(3);
                    lv5.fadeOut(2500, function() {
                        Game.nextLv();
                    });
                }
                else {
                    setTimeout(function(){tips5.html("bad!");},1000);
                    lv5.fadeOut(2500, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },

        render6:function  () {
            lv6.show();
            lvx.html("lv6");
            var end6 = box.width()-100; 
            end6 = end6+"px";
            timer6 = setInterval(function(){
                board6.animate({left:end6},900)//语句的顺序无影响
                      .animate({left:"0px"},900);
            },100);

            lv6.on(eventName, function() {
                board6.stop(true);
                clearInterval(timer6);
                lv6.unbind(); 
                audio.play();

                board6.animate({top:'325px'},1000);
                var offsetWidth6 = parseFloat( board6.css("left"));
                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var fixedWidth6 = dotted6.offset().left;
                var difError6 = offsetWidth6 - fixedWidth6-5;

                if ((difError6 <= 7) && (difError6 >= -7)){
                    setTimeout(function(){tips6.html("perfect!");},1000);
                    Game.renderInfo(5);
                    lv6.fadeOut(2500, function() {
                        Game.nextLv();
                    });
                }
                else if(((difError6 < 14) && (difError6 > 7)) ||((difError6 > -14) && (difError6 < -7))){
                    setTimeout(function(){tips6.html("good!");},1000);
                    Game.renderInfo(3);
                    lv6.fadeOut(2500, function() {
                        Game.nextLv();
                    });
                }
                else {
                    setTimeout(function(){tips6.html("bad!");},1000);
                    lv6.fadeOut(2500, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },

        render7:function  () {           //yy
            lv7.show();
            lvx.html("lv7");

            var tag1 = false, tag2 = false;

            var end71 = box.width()-120;
            end71 = end71+"px";
            timer71=setInterval(function(){
                triangle71.animate({left:end71},1600)//语句的顺序无影响
                          .animate({left:"0px"},1600);
            },100);

            triangle71.on(eventName, function() {
                triangle71.stop(true);
                clearInterval(timer71);
                triangle71.unbind();
                audio.play();

                triangle71.animate({top:'310px'},1000);
                var offsetLeft71 = parseFloat(triangle71.css("left"));
                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var fixedLeft71 = triangle_dotted71.offset().left;
                var difError71 = offsetLeft71 - fixedLeft71 - 3;

                // alert(offsetLeft71+","+fixedLeft71+","+difError71);

                if ((difError71 <= 7) && (difError71 >= -7)){
                    setTimeout(function(){tips7.html("perfect!");},1000);
                    Game.renderInfo(5);
                    tag1 = true;
                    setTimeout(function(){tips7.html(" ");},2000);
                    if(tag2){
                        lv7.fadeOut(3500, function() {Game.nextLv();});
                    }
                }
                else if(((difError71 <= 16) && (difError71 > 7)) ||((difError71 >= -16) && (difError71 < -7))){
                    setTimeout(function(){tips7.html("good!");},1000);
                    Game.renderInfo(3);
                    tag1 = true;
                    setTimeout(function(){tips7.html(" ");},2000);
                    if(tag2){
                        lv7.fadeOut(3500, function() {Game.nextLv();});
                    }
                }
                else {
                    setTimeout(function(){tips7.html("bad!");},1000);
                    lv7.fadeOut(3500, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
            
            var end72 = box.width()-95;
             end72 = end72+"px";
            timer72 =setInterval(function(){
                ring72.animate({left:end72},1300)//语句的顺序无影响
                      .animate({left:"0px"},1300);
            },100);

            ring72.on(eventName, function() {
                ring72.stop(true);
                clearInterval(timer72);
                ring72.unbind();
                audio.play();

                ring72.animate({top:'338px'},1000);
                var offsetLeft72 = parseFloat( ring72.css("left"));
                //对应的left不可以是自动值，否则无法计算；必须转化为数字，否则数值类型不一致
                var fixedLeft72 = ring_dotted72.offset().left;
                var difError72 = offsetLeft72 - fixedLeft72- 3;

                // alert(offsetLeft72+","+fixedLeft72+","+difError72);

                if ((difError72 <= 7) && (difError72 >= -7)){
                    setTimeout(function(){tips7.html("perfect!");},1000);
                    Game.renderInfo(5);
                    tag2 = true;
                    setTimeout(function(){tips7.html(" ");},2000);
                    if(tag1){
                        lv7.fadeOut(3500, function() {Game.nextLv();});
                    }
                }
                else if(((difError72 <= 14) && (difError72 > 7)) ||((difError72 >= -14) && (difError72 < -7))){
                    setTimeout(function(){tips7.html("good!");},1000);
                    Game.renderInfo(3);
                    tag2 = true;
                    setTimeout(function(){tips7.html(" ");},2000);
                    if(tag1){
                        lv7.fadeOut(3500, function() {Game.nextLv();});
                    }
                }
                else {
                    setTimeout(function(){tips7.html("bad!");},1000);
                    lv7.fadeOut(3500, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },
        
        render8:function  () {
            lv8.show();
            lvx.html("lv8");

            // 第一个色块
            timer81=setInterval(function(){
                board81.animate({width:"250px"},700)//语句的顺序无影响
                       .animate({width:"100px"},700);
            },100);     

            // 第二个色块
            var end82 = box.width()-100; 
             end82 = end82+"px";
            timer82=setInterval(function(){
                board82.animate({left:end82},700)//语句的顺序无影响
                       .animate({left:"20px"},700);
            },100);

            lv8.on(eventName, function() {
                board81.stop(true);
                board82.stop(true);
                clearInterval(timer81);
                clearInterval(timer82);
                lv8.unbind(); audio.play();

                var offsetWidth81 = board81.width();
                var difError81 = dotted81.width()+5-offsetWidth81; //差值,5为dotted的border宽度

                var offsetLeft82 = parseFloat(board82.css("left"));
                var fixedLeft82 = dotted82.offset().left;
                var difError82 = offsetLeft82 - fixedLeft82-2.5; //5为dotted的border的一半宽度

                if ( 
                    ((difError81 <= 14) && (difError81 >= -14)) &&
                    ((difError82 <= 10) && (difError82 >= -10))  
                    ) 
                {
                    tips8.html("perfect!");
                    Game.renderInfo(5);
                    lv8.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }

                else if ( 
                    (((difError81 <= 30) && (difError81 > 14)) && ((difError82 >= -18) && (difError82 <= 18))) || 
                    (((difError81 < -14) && (difError81 >= -30)) && ((difError82 >= -18) && (difError82 <= 18))) ||

                    (((difError81 <= 30) && (difError81 >= -30)) && ((difError82 >= -18) && (difError82 < -10))) || 
                    (((difError81 <= 30) && (difError81 >= -30)) && ((difError82 > 10) && (difError82 <= 18))) 
                    )
                {
                    tips8.html("good!");
                    Game.renderInfo(3);
                    lv8.fadeOut(1000, function() {
                        Game.nextLv();
                    });
                }

                else {
                    tips8.html("bad!");
                    lv8.fadeOut(1000, function() {
                        Game.lvx--;
                        Game.gameOver();
                    });
                }
            });
        },

        render9:function  () {           //yy
            lv9.show();
            lvx.html("lv9");
            var speed9=900,
                p9 = 0,
                g9 = 0,
                b9 = 0,
                s9 = 0;

            function repeat(v){
                timer9=setInterval(function(){
                board9.animate({width:"250px"},v)  
                      .animate({width:"100px"},v);
                },100);

                lv9.on(eventName,function(){
                    if(speed9 >=500){
                        speed9= speed9-100;
                    }
                    else {
                        speed9 = speed9 - 30;
                    }
                    board9.stop(true);
                    clearInterval(timer9);
                    lv9.unbind();
                    audio.play();

                    var offsetWidth9 = board9.width();
                    var difError9 = dotted9.width()+5-offsetWidth9; //差值,3为dotted的border宽度

                    if ((difError9 <= 10) && (difError9 >= -10)){
                        tips9.html("perfect!");
                        setTimeout(function(){tips9.html(" ");},1000);
                        p9+=1;
                        repeat(speed9);
                    }
                    else if(((difError9 <= 30) && (difError9 > 10)) ||((difError9 >= -30) && (difError9 < -10))){
                        tips9.html("good!");
                        setTimeout(function(){tips9.html(" ");},1000);
                        g9+=1;
                        repeat(speed9);
                    }
                    else {
                        tips9.html("bad!");                      
                        b9+=1;
                        s9 = 5*p9 + 3*g9; //yy统计该关卡得到的P和g的个数，算出该关卡的分数
                        Game.renderInfo(s9);
                        lv9.fadeOut(1000, function() {
                            Game.gameOver();
                        });
                    }
                });
            }
            repeat(speed9);
        },

        //获得游戏结束时的语句(根据游戏关卡)
        getGameOverText: function(lv) {
            var b,c;
                if (lv == 0){
                c = this.lvT[0];
            }
            if(lv>0 && lv<=5){
                c = this.lvT[1];
            }
            if(lv>5 && lv<=8){
                c = this.lvT[2];
            }
            if(lv>8 && lv<=12){
                c = this.lvT[3];
            }
            if(lv>12 && lv<=18){
                c = this.lvT[4];
            }
            if(lv>18 && lv<=21){
                if (lvx == 8){
                    c = this.lvT[10];}
                else{
                    c = this.lvT[5];}
            }
            if(lv>21 && lv<=32){
                if (lvx == 8){
                    c = this.lvT[10];}
                else{
                    c = this.lvT[6];}
            }
            if(lv>32 && lv<=45){
                if (lvx == 8){
                    c = this.lvT[10];}
                else{
                    c = this.lvT[7];}
            }
            if(lv>45 && lv<=60){
                if (lvx == 8){
                    c = this.lvT[10];}
                else{
                    c = this.lvT[8];}
            }

            if(lv>60 && lv<=77){
                if (lvx == 8){
                    c = this.lvT[10];}
                else{
                    c = this.lvT[9];}
            }
            if(lv>77 && lv<=96){
                c = this.lvT[11];

            }
            if(lv>96){
                c = this.lvT[12];
            }

            var d ="lv"+Game.lvx+"&nbsp;&nbsp;score：" + lv ;
            var e = c;
            return {txtscoreShow:d,txtcomment:e};
        }
    };
    API.agile = e;  //在app.js中声明
}(); 