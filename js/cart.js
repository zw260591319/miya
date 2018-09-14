$(function() {
    //全局的checkbox选中和未选中的样式
    var $all = $('input[type="checkbox"]');
    //全选;
    var $wcbox = $('.whole_check');
    var $ctBox = $('.cartBox');
    var $scBox = $('.shopChoice');
    var $sonBox = $('.son_check');
    $all.click(function() {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });
    //========全局全选与单个商品的关系======
    $wcbox.click(function() {
        var $ckboxs = $ctBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $ckboxs.prop("checked", true);
            $ckboxs.next('label').addClass('mark');
        } else {
            $ckboxs.prop("checked", false);
            $ckboxs.next('label').removeClass('mark');
        }
        Money();
    });
    
    $sonBox.each(function() {
        $(this).click(function() {
            if ($(this).is(':checked')) {
                //判断：所有单个商品是否勾选
                var len = $sonBox.length;
                var num = 0;
                $sonBox.each(function() {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wcbox.prop("checked", true);
                    $wcbox.next('label').addClass('mark');
                }
            } else {
                $wcbox.prop("checked", false);
                $wcbox.next('label').removeClass('mark');
            }
        })
    })
    $scBox.each(function() {
        $(this).click(function() {
            if ($(this).is(':checked')) {
                var len = $scBox.length;
                var num = 0;
                $scBox.each(function() {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wcbox.prop("checked", true);
                    $wcbox.next('label').addClass('mark');
                }
                $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
            } else {
                //否则，全局全选按钮取消对勾
                $wcbox.prop("checked", false);
                $wcbox.next('label').removeClass('mark');
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
            }
            Money();
        });
    });
    //================每个店铺checkbox与其下商品的checkbox的关系
    $ctBox.each(function() {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function() {
            $(this).click(function() {
                if ($(this).is(':checked')) {
                    //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function() {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                    }
                } else {
                    //否则，店铺全选取消
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                }
                Money();
            });
        });
    });
    //=========================商品数量============
    var $plus = $('.plus');
    var $reduce = $('.reduce');
    var $all_sum = $('.sum');
    $plus.click(function() {
        var $input = $(this).prev('input');
        var $count = parseInt($input.val()) + 1;
        var $obj = $(this).parents('.amount_box').find('.reduce');
        var $pTobj = $(this).parents('.order').find('.sum_price');
        var $price = $(this).parents('.order').find('.price').html(); //单价
        var $pT = $count * parseInt($price.substring(1));
        $input.val($count);
        $pTobj.html('￥' + $pT);
        if ($input.val() > 1 && $obj.hasClass('reSty')) {
            $obj.removeClass('reSty');
        }
        Money();
    });
    $reduce.click(function() {
        var $input = $(this).next('input'),
            $count = parseInt($input.val()) - 1,
            $pTobj = $(this).parents('.order').find('.sum_price'),
            $price = $(this).parents('.order').find('.price').html(), //单价
            $pT = $count * parseInt($price.substring(1));
        if ($input.val() > 1) {
            $input.val($count);
            $pTobj.html('￥' + $pT);
        }
        if ($input.val() == 1 && !$(this).hasClass('reSty')) {
            $(this).addClass('reSty');
        }
        Money();
    });

    $all_sum.keyup(function() {
            var $count = 0,
                $pTobj = $(this).parents('.order').find('.sum_price'),
                $price = $(this).parents('.order').find('.price').html(), //单价
                $pT = 0;
            if ($(this).val() == '') {
                $(this).val('1');
            }
            $(this).val($(this).val().replace(/\D|^0/g, ''));
            $count = $(this).val();
            $pT = $count * parseInt($price.substring(1));
            $(this).attr('value', $count);
            $pTobj.html('￥' + $pT);
            Money();
        })
        //======================================移除商品===================
    var $order = null;
    var $order_content = '';
    $('.delBtn').click(function() {
        $order_lists = $(this).parents('.order');
        $order_content = $order_lists.parents('.order_content');
        $('.model_bg').fadeIn();
        $('.my_model').fadeIn();
    });
    //关闭模态框
    $('.closeModel').click(function() {
        closeM();
    });
    $('.dialog-close').click(function() {
        closeM();
    });

    function closeM() {
        $('.model_bg').fadeOut();
        $('.my_model').fadeOut();
    }
    //确定按钮，移除商品
    $('.dialog-sure').click(function() {
            $order_lists.remove();
            if ($order_content.html().trim() == null || $order_content.html().trim().length == 0) {
                $order_content.parents('.cartBox').remove();
            }
            closeM();
            $sonBox = $('.son_check');
            Money();
        })
        //======================================总计==========================================
    function Money() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonBox.each(function() {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order').find('.sum_price').html().substring(1));
                var num = parseInt($(this).parents('.order').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥' + total_money);
        $('.piece_num').html(total_count);
        // console.log(total_money,total_count);
        if (total_money != 0 && total_count != 0) {
            if (!calBtn.hasClass('btn_sty')) {
                calBtn.addClass('btn_sty');
            }
        } else {
            if (calBtn.hasClass('btn_sty')) {
                calBtn.removeClass('btn_sty');
            }
        }
    }
});