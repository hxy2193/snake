$(function () {
    var  btn=$('.btn');
    var  doorl=$('.doorl')
    var  doorr=$('.doorr')
    var  game=$('.game')
    var  play=$('.play')
    var  games=$('.game').get(0)
    var  start=$('.start')
    var  restart=$('.restart')
    var  stop=$('.stop')
    var  point=$('.point')
    var  btn=$('.btn')
    var  fenshu=0;
    var  zhaozi=$('.zhaozi')
   play.on('click',function () {
        doorl.addClass('dl')
        doorr.addClass('dr')
        game.css("display","block")
        btn.css("display","block")
        animate(games,{top:0},800)
    })
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {

            // var color='#000000'
            $('<div>')
                .addClass("block")
                // .css('backgroundColor',color)
                .appendTo('.bg')
                .attr('id',i+'_'+j);
        }

    }
     she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    function finddiv (x,y) {
        return $('#'+x+'_'+y)
    }

    $.each(she,function (i,v) {
        // console.log(v)
        finddiv(v.x,v.y).addClass('she');
    })
    direction='you'
    $(document).on('keyup',function  (e) {
        var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
        var fangbiao={'zuo':37,'shang':38,'you':39,'xia':40}
        if (biao[e.keyCode]) {
            direction=biao[e.keyCode];
        }
        if (Math.abs(e.keyCode-fangbiao[direction])==2) {
            return;
        };
    })
    var shebiao={};
    var shiwu=fangshiwu();
    function fangshiwu () {
        // $.each(shiwu,function  (i,v) {
        // 	if (v.x===she.x||v.y===she.y) {
        // 		return
        // 	};
        // })
        do{
            x=Math.floor(Math.random()*20)
            y=Math.floor(Math.random()*20)
            finddiv(x,y).addClass('shiwu')
            return{x:x,y:y}
        }while(shebiao[x+'_'+y])
    }
    function  move() {
        jiutou=she[she.length-1];
        if (direction==='you') {
            xintou={x:jiutou.x,y:jiutou.y+1}
        };
        if (direction==='zuo') {
            xintou={x:jiutou.x,y:jiutou.y-1}
        };
        if (direction==='xia') {
            xintou={x:jiutou.x+1,y:jiutou.y}
        };
        if (direction==='shang') {
            xintou={x:jiutou.x-1,y:jiutou.y}
        };
        if (xintou.x>20||xintou.y>20||xintou.x<0||xintou.y<0) {
            clearInterval(t);
            zhaozi.css({"opacity":"01"},{"z-index":"19"})
            zhaozi.text("GAME OVER")
            // alert('撞死了')
            return;
        };
        if (shebiao[xintou.x+'_'+xintou.y]) {
            clearInterval(t);
            zhaozi.css({"opacity":"01"},{"z-index":"19"})
            zhaozi.text("GAME OVER")
            // alert('撞到自己了');
            return
        };
        she.push(xintou);
        shebiao[xintou.x+'_'+xintou.y]=true;
        finddiv(xintou.x,xintou.y).addClass('she')
        if (xintou.x===shiwu.x&&xintou.y===shiwu.y) {
            finddiv(shiwu.x,shiwu.y).removeClass('shiwu')
            shiwu=fangshiwu()
            fenshu++;

            point.text(fenshu*10)
        }else{
            var weiba=she.shift();

            finddiv(weiba.x,weiba.y).removeClass('she')
            delete shebiao[weiba.x+'_'+weiba.y]

        }
    }
    start.on('click',function () {
         t=setInterval(move,300)
        return t
    })
    stop.on('click',function () {
        clearInterval(t)
        return t
    })
    restart.on('click',function () {
       location.reload();
    })
})