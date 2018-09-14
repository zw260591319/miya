//自动轮播图;
var index = 0;
var timer = setInterval(autoPlay, 2000);

function autoPlay() {
    index++;
    if (index == $(".btnlist i").length) {
        index = 0
    }
    $(".btnlist i").eq(index).addClass("active")
        .siblings().removeClass("active");
    $("#ul li").eq(index).fadeIn(1000).siblings("li").fadeOut(1000);

}
$(function() {
    $(".btnlist i").mouseenter(function() {
        console.log(1)

        clearInterval(timer);
        index = $(this).index() - 1;
        console.log(index);
        autoPlay();
    });
    $(".btnlist i").mouseleave(function() {
        timer = setInterval(autoPlay, 2000);
    })
});


//全部商品分类;

$(function() {
        $(".nav_B").mouseenter(function() {
            $(".nav_B>.nav_R").css({
                display: "block"
            });
        });
        $(".nav_R").mouseenter(function() {
            $(".nav_B>.nav_R").css({
                display: "block"
            });
        });
        $(".nav_B").mouseleave(function() {
            $(".nav_B>.nav_R").css({
                display: "none"
            });
        });
        $(".nav_R").mouseleave(function() {
            $(".nav_B>.nav_R").css({
                display: "none"
            });
        });
    })
    //楼梯效果;
    //点击回到顶部
var h = 300;

$(window).scroll(function() {
    var top = $(document).scrollTop();
    if (top >= h) {
        $(".rightSide").show();
        $(".leftSide").show();
    } else {
        $(".rightSide").hide();
        $(".leftSide").hide();
    }
    $(".side-top").click(function() {
        $("html,body").scrollTop(0);
    })
});
//楼梯划过显示二维码
$(function() {
        var $wx = $(".side-app");
        var $saoma = $(".leftSide");
        $wx.mouseenter(function() {
            $(".rightSide .item-app ").css({
                visibility: "visible",
            });
            $(".rightSide .item-app ").stop().animate({
                    right: "55"
                }, 700)
                // console.log(this)
        });
        $wx.mouseleave(function() {
            $(".rightSide .item-app ").css({
                visibility: "hidden"
            });
            $(".rightSide .item-app ").stop().animate({
                right: "97"
            }, 700)
        });
        $saoma.mouseenter(function() {
            $saoma.stop().animate({
                left: "50"
            }, 700)
        });
        $saoma.mouseleave(function() {
            $saoma.stop().animate({
                left: "0"
            })
        })
    })
    //底部footer划过微信出现二维码订阅号;
$(function() {
        $(".PubBtnHover").mouseenter(function() {
            $(".wxmore").css({
                display: "block"
            })
        });
        $(".PubBtnHover").mouseleave(function() {
            $(".wxmore").hide();
        })
    })
    //购物车样式;
$(function() {
    $(".cart-item").mouseover(function() {
        $(".cart-item").css({
            border: "1 solid ",
            borderColor: "#fa4b9b",
            borderBottomColor: "#fff",
            height: "38"
        });
        $(".cart-more").css({
            display: "block"
        });
        $(".cart-item>span").css({
            "display": "inline-block"
        })
    });
    $(".cart-item").mouseout(function() {
        $(".cart-item").css({
            border: "1 solid",

            height: "32",
            borderBottom: "1 solid",
            borderColor: "#e5e5e5",
        });
        $(".cart-more").css({
            display: "none"
        });
        $(".cart-item>span").css({
            "display": "none"
        })
    });
    $(".cart-item").click(function() {

        $(location).attr('href', 'localhost:8888../html/cart.html');
    });
});

//进入页面出现广告,点击广告删除效果;
$(function() {
    var timer = setTimeout(function() {
        $("#beijing").css({
            "display": "block"
        });
        $("#pcKatiao").css({
            "display": "block"
        })
    }, 500);
    $(".katiao_close").click(function() {
        $("#beijing").css({
            "display": "none"
        });
        $("#pcKatiao").css({
            "display": "none"
        })
    })

})