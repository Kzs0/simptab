
define([ "jquery", "mousetrap", "lodash", "notify", "i18n" ], function( $, Mousetrap, _, Notify, i18n, comps ) {

    "use strict";

    var intros,
        steps = [
            {
                intro: '简 Tab 是一个纯粹、极简的新标签页扩展。<br>它的设计哲学: <b>只呈现美图，无任何干扰</b>，但这并以意味它仅代表简单，它的功能包含：<br><br>- <a href="" target="_blank">多种背景源</a>；<br>- <a href="" target="_blank">常用网址</a>；<br>- <a href="" target="_blank">书签栏</a>；<br>- <a href="" target="_blank">快捷搜索栏</a>；<br>- <a href="" target="_blank">白噪音</a>；<br>- <a href="" target="_blank">禅模式</a>；'
            },
            {
                element: $( '.controlbar' )[0],
                intro: '控制栏：包含了对背景图的大部分操作，如：上传、下载、固定、不喜欢等。<br>此栏无法用快捷键呼出，鼠标 <b>右移到标签页</b> 自动显示，同时其中的功能 <b>支持快捷键</b> 操作；'
            },
            {
                element: $( ".controlbar" ).find( "li" )[0],
                intro: '控制栏 - 系统信息，包含了：打开默认便签页、历史记录、下载地址、应用三个子项；'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=fullscreen]" ).parent()[0],
                intro: '控制栏 - 全屏：可将新标签页全屏、配合 <a href="" target="_blank">自动更换背景</a> 与 <a href="" target="_blank">白噪音</a>，可获得如同音乐相册的体验；'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=info]" ).parent()[0],
                intro: '控制栏 - 背景源信息：某些背景源具有源地址，如： Google Art / SimpTab 订阅源等，可查看这个美图背后的故事。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=download]" ).parent()[0],
                intro: '控制栏 - 下载：可将背景下载，并可 <a href="" target="_blank">指定位置</a>。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=upload]" ).parent()[0],
                intro: '控制栏 - 上传：可将本地图片上传到 简 Tab 的收藏夹，以供自动更换时使用。注意：简 Tab 上传的图片均保存在 Chrome 本地的安全沙箱中。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=refresh]" ).parent()[0],
                intro: '控制栏 - 下一张：通过快捷键 <kbd>f</kbd> 即可在不关闭标签页的情况下自动更新为下一张图片。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=setting]" ).parent()[0],
                intro: '控制栏 - 选项页：简 Tab 的可定制化中心，包括了：打开设置定栏、背景管理器、关于 三个功能。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=mobile]" ).parent()[0],
                intro: '控制栏 - 发送到手机端：配合 <a href="" target="_blank">JSBox 小插件</a>，可将当前背景一键发送到你的 iPhone。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=favorite]" ).parent()[0],
                intro: '控制栏 - 收藏：与上传类似，可将当前背景收藏到 Chrome 本地的安全沙箱中。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=pin]" ).parent()[0],
                intro: '控制栏 - 固定：可将当前背景固定若干时间。'
            },
            {
                element: $( ".controlbar" ).find( "li > a[url=dislike]" ).parent()[0],
                intro: '控制栏 - 不喜欢：若不喜欢当前背景的话，选中后不再显示当前背景。'
            },
            {
                element: $( ".clock" )[0],
                intro: '界面上唯一可一直显示的元素，可隐藏，且可更改 12/24 小时制。'
            },
            {
                intro: '设置栏，主要针对背景源的一些常规设置，包括：更改背景源显示方式、开启/禁用多种背景源、进入禅模式等。'
            },
            {
                element: $( ".changestate" )[0],
                intro: '背景源的各种显示方案，简 Tab的几个特色都在这里，如： <a href="" target="_blank">相册模式</a> <a href="" target="_blank">地球每刻</a> <a href="" target="_blank">禅模式</a>',
                tooltipPosition: 'right'
            }
        ];

    function init( introJs ) {
        intros = introJs();
        $( ".controlbar" ).attr( "data-hits", "controlbar" );
        $( $( ".controlbar" ).find( "li" )[0] ).attr( "data-hits", "controlbar-system" );
        $( ".controlbar" ).find( "li a[url=setting]" ).parent().attr( "data-hits", "controlbar-setting" );
        $( ".clock"   ).attr( "data-hits", "clock" );
        $( ".setting" ).attr( "data-hits", "setting" );
    }

    function render() {
        intros.setOptions({
            hintButtonLabel: "确认",
            nextLabel: "下一条 →",
            prevLabel: "← 上一条",
            skipLabel: "",
            doneLabel: "完成",
            hidePrev: true,
            hideNext: true,
            tooltipPosition: "auto",
            steps: steps,
        });
        intros.onbeforechange( function( target ) {
            var id = $( target ).data().hits;
            if ( id == "controlbar" ) {
                $(target).css({ "opacity": 1, width: "initial" });
            } else if ( id == "controlbar-system" ) {
                $( $( ".controlbar" ).find( "a" )[3] ).trigger( "mouseenter" );
            } else if ( id == "controlbar-setting" ) {
                $( ".controlink[url=setting]" ).trigger( "mouseenter" );
            } else if ( id == "clock" ) {
                $( ".controlbar" ).removeAttr( "style" );
                $( ".controlink[url=setting]" ).trigger( "mouseleave" );
                $( $( ".controlbar" ).find( "a" )[3] ).trigger( "mouseleave" );
            } else if ( id == undefined && $( "a[role=button].active" ).attr( "data-stepnumber" ) == "15" ) {
                Mousetrap.trigger( "s" );
            }
        });
        intros.onexit( function() {
            $( ".controlbar" ).removeAttr( "style" );
            $( ".controlink[url=setting]" ).trigger( "mouseleave" );
            $( $( ".controlbar" ).find( "a" )[3] ).trigger( "mouseleave" );

            $( ".controlbar" ).removeAttr( "data-hits" );
            $( $( ".controlbar" ).find( "li" )[0] ).removeAttr( "data-hits" );
            $( ".controlbar" ).find( "li a[url=setting]" ).parent().removeAttr( "data-hits" );
            $( ".clock"   ).removeAttr( "data-hits" );
            $( ".setting" ).removeAttr( "data-hits" );
        });
        /*
        intros.onchange( function( target ) {
            const id = $( target ).data().hits;
            if ( id == "controlbar" ) {
                $(target).css( "opacity", 1 );
            } else {
                $( '.controlbar[data-hits="controlbar"]' ).removeAttr( "style" );
            }
        });
        */
        intros.start();
    }

    return {
        Init: init,
        Render: render,
    }

});