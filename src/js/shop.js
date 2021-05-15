import $ from './library/jquery02.js';
import cookie from './library/cookie.js';

let shop = cookie.get('shop');

if (shop) {
    shop = JSON.parse(shop);

    let idList = shop.map(el => el.id).join();

    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: { idList: idList },
        dataType: "json",
        success: function(res) {
            let temp = '';

            res.forEach(elm => {
                let picture = JSON.parse(elm.picture);

                // 让ajax请求到的数据结果中遍历后的id与cookie中数据的id 相同
                let current = shop.filter(val => val.id == elm.id);

                temp += ` <div class="pro1">
                <input type="checkbox" class="check">
                <img src="../${picture[0].src}" alt="">
                <h3> ${elm.title}</h3>
                <p class="p1">
                ${parseFloat(elm.price).toFixed(2)}元
                </p>
                <div class="jj">
                <input type="text" value="${current[0].num}" max="${elm.num}" min="1">
                </div>
                <p class="p2">
                ${(elm.price * current[0].num).toFixed(2)}元
                </p>
                <a href="javascript:;" class="xx" data-id="${elm.id}">x</a>
        </div>`;

            });
            $('.pro').append(temp).find('.xx').on('click', function() {
                let res = shop.filter(el => el.id != $(this).attr('data-id'));
                cookie.set('shop', JSON.stringify(res), 1);
                location.reload();
            });

            var checkValue=[];

            $( '#all ').on( "click",function(){
                //点击全选框时，获取 checked 的值，也就是是否选中
                let allValue=$( "#all" ).prop( "checked" );
    
                //当全选框的值为 选中状态( checked 属性为 true ) 时，让其他选框也为 选中状态
                //也就是让 多选框 和 每个选框的 checked 值相等
                //給每个选框设置相同的 class名  ，利用循环，获取每个选框
                // console.log( $( '.check' ) )

                $('.check' ).each( function( i,v ){

                    //这个值为 js 形式，需要转换成 jq 形式

                    $( v ).prop( "checked",allValue);
    
                    //假设一个标记，给每个选框设置一个 value 值，用这个标记计算单选框选中的数量
                    //如果 选框选中时，将value 值加到数组内
                    if( allValue==true ){
                        checkValue.push( $( v ).val() );
                        console.log(($( v ).val()));
                    }
                    //如果 全选框未被选中时，清空数组
                    else{
                        checkValue=[];
                    }
                } )
            } )

             //全选按钮已实现，接下来是 单选框，
        //选中所有单选框时，全选框选中
        //有一个选框没选中时，多选框不选中
            //首先。设置点击事件
            $( ".check" ).on( "click",function(){
                //点击时，获取对应的 cheked 值
                var val=$( this ).prop( "checked" )
                // console.log( val )  

                var value=$( this ).val()

                var index=checkValue.findIndex( function( v,i ){
                    return v==value
                } )


                //当值为 true 时，将 对应选框的 value 值 添加到 标识数组中
                if( val==true ){
                    checkValue.push( $( this ).val() )
                }
                //否则，也就是 为 false ，未被选中时，将对应的 val 移出去
                else{
                    //要移出某一项，获取对应的下标
                    //在上方查找下标
                    //获取下标之后，删除 数组中 对应的 值
                    checkValue.splice( index,1 );
                }

                // console.log( checkValue )

                //如果，选框全部选中，也就是数组中有 三个 value 值
                //可以理解为，选框数量 等于 数组值数量
                //就让全选框选中

                if( $( ".check" ).length == checkValue.length ){
                    //选中选框
                    $( "#all" ).prop( "checked",true )
                }
                //否则，不选中
                else{
                    $( "#all" ).prop( "checked",false )
                }
            } )          
        }
    });
}