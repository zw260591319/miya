$(function() {

    $("#yan").click(function() {
        document.write($(this).css("background"));
    });
    //注册的验证码
    $(window).load(function() {
        $("#yzm").html(fnround());
        $("#yzm").css({ "color": fnColor() });
        $("#yzm").click(function() {
            $(this).html(fnround());
            $(this).css({ "color": fnColor() });
        })
    });

    var flagName = null;
    $("#uname").blur(function() {
        var uname = $("#uname").val();
        var reg = /^[1-9]\d{10}$/;
        if (!reg.test(uname)) {
            $("#yhm").css({
                "display": "block",
                "color": "red"
            })
            $("#yhm").html("请输入正确的手机号码，且为11位纯数字格式");

            flagName = false;
        } else {
            $("#yhm").css({ "display": "none" })
                // $("#yhm").html("用户名合法");
                // $("#yhm").css({ "color": "green" });
            flagName = true;
        }
    });
    //验证码;
    var flagYzm = null;
    $("#uyzm").blur(function() {
        var uyzm = $("#uyzm").val();
        var oSpan = $("#yzm").html();
        if (uyzm !== oSpan) {
            $(".p2").css({
                height: "50"
            });
            $("#iii").html("您所输入的验证码有误");
            $("#iii").css({
                "width": "295",
                "color": "red",
                "display": "inline-block",
                "text-align": "left"
            });
            flagYzm = false;
        } else {
            $("#iii").css({ "display": "none" })
                // $("#iii").html("验证码输入正确");
                // $("#iii").css({ "color": "green" });
            flagYzm = true;
        }
    });
    //密码验证
    var flagPwd = null;
    $("#upwd").blur(function() {
        var upwd = $("#upwd").val();
        var reg = /^\w{6,20}$/;
        if (!reg.test(upwd)) {
            $(".p4").css({
                "height": "50"
            });
            $("#ipwd").css({
                "color": "red",
                "display": "inline-block",
                "text-align": "left"
            });
            $("#ipwd").html("请输入6-20位的任意字符组成的密码");
            flagPwd = false;
        } else {
            // $("#ipwd").html("密码符合");
            // $("#ipwd").css({ "color": "green" });
            flagPwd = true;
        }
    });
    //密码;
    var flagyyy = null;
    $("#hq").click(function() {

        if (flagName == true) {
            $(this).css({ "background": "#ccc" });
            $(this).html("请等待...");
            $("#iyyy").css({ "color": "green" });
            var timer = setTimeout(function() {
                var FnmathRound = fnMathround();
                //				FnmathRound.apply($("#uyzm2"));
                $("#uyzm2").val(FnmathRound);
                flagyyy = true;
                $("#hq").html("获取验证码");
                $("#hq").css({ "background": "#f2f2f2" });
            }, 3000);
            $("#iyyy").html("自动接受验证码成功");
        } else {
            $("#iyyy").html("请先验证手机号");
            $(".p3").css({
                "height": "50"
            });
            $("#iyyy").css({
                "display": "inline-block",
                "color": "red",
                "text-align": "left"
            });
            flagyyy = false;
        }
    });
    var json = {};
    $("#btn").click(function() {
        //用户名验证码正则验证
        if (flagYzm == true && flagName == true && flagPwd == true && flagyyy == true) {
            json = {
                "name": $("#uname").val(),
                "pwd": $("#upwd").val()
            }
            console.log(json);
            setCookie("list", JSON.stringify(json))
            alert("注册成功");
            location.href = "index.html";
        }
    });

})