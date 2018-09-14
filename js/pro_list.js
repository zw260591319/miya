//ajax传送数据;
$.ajax({
    type: "get",
    url: "../json/data.json",
    // url: "../json/huodong.json",
    success: function(res) {
        var arr = res.subjects;
        //console.log(arr);
        var str = "";
        for (i in arr) {
            str += ` <li>
                <h1><img class="lazy" src=${arr[i].image}></h1>
                <b class="wall_1">${arr[i].price1}</b>
                <b class="wall_2">${arr[i].price2}</b>
                <p class="wall_3">${arr[i].introduce}</p>
                <span class="tlt1">${arr[i].tlt1}</span>
                <span class="tlt2">${arr[i].tlt2}</span>
            </li>`
        }
        $(".jso1").html(str)
    }
});

//全部商品列表显示隐藏;
$(function() {
    $(".dls").css({
        display: "none",
        position: "relative"
    });
    $(".menus").mouseover(function() {
        $(".dls").css({
            display: "block"
        });
    });
    $(".menus").mouseout(function() {
        $(".dls").css({
            display: "none"
        });
    });
    $(".nav_B").mouseenter(function() {
        $(".nav_B>.nav_R").css({
            display: "block"
        });
    });
    $(".nav_B>.nav_R").mouseenter(function() {
        $(".nav_B>.nav_R").css({
            display: "block"
        });
    });
    $(".nav_B").mouseleave(function() {
        $(".nav_B>.nav_R").css({
            display: "none"
        });
        $(".dls").css({
            display: "none"
        });
    });
    $(".nav_B>.nav_R").mouseleave(function() {
        $(".nav_B>.nav_R").css({
            display: "none"
        });
        $(".dls").css({
            display: "none"
        });
    });
});
//列表介绍 更多显示 收起隐藏;
$(function() {
    $(".smore").click(function() {
        $(".contenter").css({
            "height": "auto"
        });
        $(".selector").css({
            "height": "65"
        });
        $(".contenter>.kcon").css({
            "display": "block",
            "overflow": "auto",
            "height": "auto"
        });
        $(".contenter>.k0>a").css({
            "display": "block",
            "overflow": "auto"
        });
        $(".contenter>.smore").css({
            "display": "none"
        })
        $(".contenter>.more2").css({
            "display": "block"
        })
    });
    $(".contenter>.more2").click(function() {
        $(".contenter").css({
            "height": "24"
        });
        $(".selector").css({
            "height": "auto"
        });
        $(".contenter>.kcon").css({
            // "display": "none",
            "overflow": "hidden",
            // "height": "auto"
        });
        $(".contenter>.k0>a").css({
            // "display": "none",
            "overflow": "hidden"
        });
        $(".contenter>.smore").css({
            "display": "block"
        })
        $(".contenter>.more2").css({
            "display": "none"
        })
    });
});
$(function() {
    $(".jso1>li").mouseenter(function() {
        $(".jso1>li").css({
            border: "1px",
            borderColor: "#fa4b9b",
            display: "block"
        });
    })
})