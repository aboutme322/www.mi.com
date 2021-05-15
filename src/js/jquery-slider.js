(function($) {

    $.fn.extend({
        slider: function(options) {
            let defaults = {
                speed: 500, // 动画执行时间
                delay: 3000 // 图片停留时间
            };

            // 合并参数
            $.extend(defaults, options);

            // 抽象功能(将所有可能要执行的动作都声明成变量)
            let main = null, // 主函数(入口函数)
                init = null, // 初始化
                start = null, // 开始动画
                stop = null, // 停止动画
                next = null, // 下一张
                prev = null, // 上一张
                timer = null, // 计时器
                elms = {}; // 命名空间 提供可共享作用域的变量


            init = function() {
                // 1. 获得元素
                elms.sliderElm = this.children('.item');
                elms.btns = this.children('span');

                // 2. 复制第一张图片
                elms.sliderElm.append(elms.sliderElm.children('.item').first().clone());
                // 获得图片宽度
                elms.imgWidth = elms.sliderElm.children('.item').first().width();
                // 设置播放索引
                elms.index = 1;

                // 悬停事件
                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                });

                // 按钮点击事件
                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });

            }.bind(this);


            start = function(direction) {
                let left = `-=${elms.imgWidth}`;

                if (!direction) {
                    left = `+=${elms.imgWidth}`;

                    if (elms.index === 1) {
                        elms.index = 4;
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderElm.children('img').last().offset().left;
                        elms.sliderElm.css('left', `-${imgLeft-divLeft}px`);
                    }
                }

                elms.sliderElm.animate({
                    left: left
                }, defaults.speed, function() {
                    if (direction) {
                        elms.index++;
                    } else {
                        elms.index--;
                    }

                    if (elms.index === 4) {
                        elms.index = 1;
                        elms.sliderElm.css('left', 0);
                    }
                });
            }.bind(this);


            stop = function() {
                clearInterval(timer);
                elms.sliderElm.stop(true, true);
            }

            next = function() {
                stop();
                start(1);
            }

            prev = function() {
                stop();
                start(0);
            }



            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }

            main();
        }
    });


})(jQuery);