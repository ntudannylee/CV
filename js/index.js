// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()


    // 先從遠端抓取json 
    $.get('https://js.kchen.club/B04106024/query', function(response) {
        if (response) {
            // 伺服器有回傳資料
            if (response.result) {
                $('#product-list').empty();
                // 資料庫有回傳資料
                items = response.items

                // 加了分頁效果，預設顯示第一頁
                showItems(1)

                // 顯示分頁和設定分頁的函式
                $('#page').show()
                newPage(items.length)

            } else {
                $('#message').text('查無相關資料')
                $('#dialog').modal('show')
            }
        } else {
            $('#message').text('伺服器出錯')
            $('#dialog').modal('show')
        }

        console.log(response)
    }, "json")


    var items = null
    var pageCount = 20
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {

        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }


    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
            })

            // var strActive = ((i == 1) ? ' active' : '')
            //$li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $li = $('<li>').attr('class', 'page-item').append($a)
            $('#page-number').append($li)
        }

        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
        $rli = $('<li>').attr('class', 'page-item').append($ra)
        $('#page-number').append($rli)
    }

    $('#searchicon').click(function(e) {
        e.preventDefault();
        //取得使用者輸入的資料
        var term = $('#searchitem').val();
        $('#product-list').empty();
        $('#page').hide();
        $.getJSON("json/product.json",
            function(data) {
                var flag = 0;
                for (j = 0; j < data.length; j++) {
                    console.log(data[j])
                    if (data[j].name === term) {
                        flag = 1;
                        console.log(data[0].name);

                        searchitem = `
                        <div class = "col-*"> 
                        <div class = "item"> 
                        <img class = "image" src = "
                    ${data[j].image}
                    "> 
                        <h3 class = "name" > 
                    ${data[j].name} </h3>
                        <p class="price">NT$ 
                    ${data[j].price} </p> 
                        </div></div >
                        `
                        $('#product-list').html(searchitem)

                        break;
                    }
                    if (j == data.length - 1 && flag == 0) {
                        $('#message').text('無此商品');
                        $('#dialog').modal('show')
                    }
                }

            }
        );

    });

    $('#query').on('click', function() {
        $.get('https://js.kchen.club/B04106024/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

})