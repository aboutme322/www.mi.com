import $ from './library/jquery02.js';
import cookie from './library/cookie.js';

// 通过search 获得到商品id
let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        let picture = JSON.parse(res.picture);

        let temp3 = `
        ${res.title}
        `;
        let temp = `
            <img src="../${picture[1].src}">
        `;
        let temp2 = `
        <h3>${res.title}</h3>
        <p>用户评价</p>
        `;
        let temp1 = `
        <h2>${res.title}</h2>
            <p class="p1">${res.details}</p>
            <p class="p2">小米自营</p>
            <p class="p3">${res.price}元</p>
            <div class="line"></div>
            <div class="adress">
                <img class="fl" src="../img/zuobiao.png" alt="">
                <div class="info">
                    <span>&nbsp;北京</span>
                    <span>&nbsp;北京市</span>
                    <span>&nbsp;海淀区</span>
                    <span>&nbsp;清河街道</span>
                    <span class="xiu">&nbsp;修改</span>
                    <span class="xiu">&nbsp;有现货</span>
                </div>
                
            </div>
            <div class="chos">
                <h3>选择颜色</h3>
                <ul>
                    <li class="ng">典雅黑</li>
                    <li>深空蓝</li>
                    <li>象牙白</li>
                </ul>
            </div>

            <div class="car">
        <input type="number" id="num" value="1" min="1" max="${res.num}">
            <a href="http://localhost/php/www.mi.com/src/html/shop.html">
                <div class="yes" id="additem">加入购物车</div>
                </a>
                <div class="like">收藏</div>
            </div>
        `;
       

        $('title').append(temp3);
        $('.banx').append(temp2);
        $('.b_left').append(temp);
        $('.b_right').append(temp1).find('#additem').on('click', function() {
            addItem(res.id, res.price, $('#num').val());
        });
    }
});


function addItem(id, price, num) {
    let shop = cookie.get('shop');

    let product = {
        id,
        price,
        num
    }

    // 判断当前cookie中是否有购物数据
    if (shop) { // 如果有数据 取出是一个字符串
        shop = JSON.parse(shop);

        // 添加之前先要判断数据中有没有该商品
        if (shop.some(el => el.id === id)) {
            let _index = shop.findIndex(elm => elm.id == id);
            let count = parseInt(shop[_index].num);
            count += parseInt(num);
            shop[_index].num = count;
        } else {
            shop.push(product);
        }


    } else { // 第一次没有数据的情况 创建一个新数据
        shop = [];
        shop.push(product);
    }

    cookie.set('shop', JSON.stringify(shop), 1);
}