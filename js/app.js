!function() {
    var b = {   //1.绑定界面控件(b是一个对象)
            index: $("#index"),     //初始界面
            room: $("#room"),       //游戏界面
            dialog: $("#dialog"),   //游戏对话框
            play: $(".btn-play"),   //play开始游戏按钮
        }, 

        // 2.判断手机型号
        ua = window.navigator.userAgent.toLowerCase(), 
        isAndroid = /android/i.test(ua), 
        isIOS = /iphone|ipad|ipod/i.test(ua), 

        // 初始化阶段
        app = {
            // 初始化
            init: function() {
                this.initEvent();   //绑定事件(Touch事件与Click事件的判断与绑定)
                b.index.show();    //初始界面index显示
            },
            initEvent: function() {
                var clickEvent = "ontouchstart" in document.documentElement ? "touchstart" : "click",
                    myApp = this;
                b.play.on(clickEvent, function () {
                    var type = $(this).data("type") || "agile";
                    b.index.hide(),     //主页隐藏
                        Game.init(type, b.room);
                })
            }
        };



    app.init();
    window.API = {} //保存了游戏的核心逻辑

}();  //文件在加载之后能立即执行