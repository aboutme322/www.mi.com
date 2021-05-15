import $ from '../js/library/jquery02.js';

$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        console.log(res);

        let temp = '';

        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            // console.log(picture);

            temp += `
            <li class="theone fl">
            <a href="./product.html?id=${elm.id}">
            <img src="../${picture[0].src}" alt="">
            <h3> ${elm.title}</h3>
            <p class="p1">折叠大屏｜自研芯片</p>
            <p class="p2">${elm.price}</p>
            </a>
            </li>
        `;
        });

        $('.rightt').html(temp);
    }
});