//小导航置顶;
$(function() {
    var offsetTop = $(".moFixed").offset().top
    $(document).scroll(function() {
        if ($(document).scrollTop() >= offsetTop) {
            if ($(".moFixed").hasClass("moFixedactive")) return;
            $(".moFixed").addClass("moFixedactive");
        } else {
            if (!$(".moFixed").hasClass("moFixedactive")) return;
            $(".moFixed").removeClass("moFixedactive");
        }
    })
});

//选项卡;
//评论区选项卡效果
$(function() {
    window.onload = function() {
        var tab = document.getElementById("tab");
        var lis = tab.getElementsByTagName("li");
        var text = document.getElementById("text");
        var con = $("#text>div");
        // $("#text>div").css({
        //     "display": "none"
        // })
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
            lis[i].onclick = function() {
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = "";
                    con[i].className = "";
                }
                this.className = "current";
                con[this.index].className = "cur";
            }
        };
    }
});
$(function() {
    //放大镜效果
    var $small = $("#fajBox .small");
    var $big = $("#fajBox .big");
    var $mask = $("#mask");
    var $list = $(".bottom li");

    //选项卡效果
    $list.mouseenter(function() {

        $(this).addClass("bor_red").siblings().removeClass("bor_red");
        var index = $(this).index();
        $small.find("img").eq(index).show().siblings().hide();
        $big.find("img").eq(index).show().siblings().hide();
    })
    $small.on({
        mouseover: function() {
            $mask.show();
            $big.show();
        },
        mouseout: function() {
            $mask.hide();
            $big.hide();
        },
        mousemove: function(e) {
            var e = e || event;
            var x = e.pageX - $small.offset().left - $mask.width() / 2;
            var y = e.pageY - $small.offset().top - $mask.height() / 2;
            //边界处理
            var maxL = $small.width() - $mask.width();
            var maxT = $small.height() - $mask.height();
            x = Math.min(Math.max(0, x), maxL);
            y = Math.min(Math.max(0, y), maxT);
            $mask.css({ "left": x + "px", "top": y + "px" });

            //大图显示区
            var bigX = x * $big.width() / $mask.width();
            var bigY = y * $big.height() / $mask.height();

            $(".bigImg").css({ "left": -bigX + "px", "top": -bigY + "px" })
        }
    })
});
//滑过拼团显示二维码;
$(function() {
    $("#grouponBtn").mouseover(function() {
        $(".pop-code").css({
            "display": "block"
        })
    });
    $(".pop-code").click(function() {
        $(".pop-code").css({
            "display": "none"
        })
    });
})