$(function(){
    // 显示单行以及偶数行的颜色
    var [even, odd] = ['#006699', "#fdec8b"];

    // 总价格计算
    var showPrice = function (){
        var price = 0;

        $("tbody tr").each(function (){
            if ($(this).find(":checkbox").prop("checked")){
                price += parseFloat($(this).find("span").html());
            }
        });

        $("tfoot").find("span").html(""+price.toFixed(2));
    };

    // 隔行变色
    var reColor = function (){
        $("tbody tr:even").css("background", even);
        $("tbody tr:odd").css("background",odd);
    };

    // 点击选择按钮
    var clickBtn = function () {
        let flag = true;
        $("tbody tr").each(function(){
            $(this).find(":checkbox").click(function(){
                var bt_status = $(this).prop("checked");
                if (bt_status == false){
                    flag = flag && false;
                    $("thead").find(":checkbox").prop("checked", false);
                }
                exit();
            })
        })
    };

    // 响应事件结算
    var exit = function (){
        clickBtn();
        reColor();
        showPrice();
    };

    //价格排序
    $("#priceSort").click(function(){  
        //1.保存原始数据
        var aTr = new Array();
        $("tbody tr").each(function(){  //表格中每一行
            //对象obj保存每行上的元素，html属性是标签内容，price是排序的依据--价格
            var obj = new Object();   
            obj.html = $(this).html();  //标签间的内容
            obj.price = parseFloat($(this).find("span").html())  //排序依据：价钱
            obj.checked = $(this).find(":checkbox").prop("checked"); //复选框状态
            aTr.push(obj);
        })
                
        //2.排序----冒泡		
        if($(this).hasClass("btn_down")){ //有"btn_down" 降序
            sortDescPrice(aTr);  
        }else{ //升序
            sortPrice(aTr);
        }
        
        //3.按照排序的结果重新生成<table>中的<tr>
        //3.1 拼字符串
        var sTr="";
        $(aTr).each(function(){
            sTr += "<tr>"+this.html+"</tr>"
        })
        //3.2 把字符串代表的所有元素添加到<table>中
        $("tbody").html(sTr);
        
        //3.3 还原复选框
        $(aTr).each(function(index){
            var flag = this.checked;
            $("tr:gt(0)").find(":checkbox").eq(index).prop("checked", flag);
        })

        $(this).toggleClass("btn_down");

        exit();
    })	

    //地区排序
    $("#addressSort").click(function(){  
        //1.保存原始数据
        var aTr = new Array();
        $("tbody tr").each(function(){  //表格中每一行
            //对象obj保存每行上的元素，html属性是标签内容，price是排序的依据--价格
            var obj = new Object();   
            obj.html = $(this).html();  //标签间的内容
            obj.address = $(this).find("td:eq(3)").html(); //排序依据：
            obj.checked = $(this).find(":checkbox").prop("checked"); //复选框状态
            aTr.push(obj);
        })
                
        //2.排序----冒泡		
        if($(this).hasClass("btn_down")){ //有"btn_down" 降序
            sortDescAddress(aTr);  
        }else{ //升序
            sortAddress(aTr);
        }
        
        //3.按照排序的结果重新生成<table>中的<tr>
        //3.1 拼字符串
        var sTr="";
        $(aTr).each(function(){
            sTr += "<tr>"+this.html+"</tr>"
        })
        //3.2 把字符串代表的所有元素添加到<table>中
        $("tbody").html(sTr);
        
        //3.3 还原复选框
        $(aTr).each(function(index){
            var flag = this.checked;
            $("tr:gt(0)").find(":checkbox").eq(index).prop("checked", flag);
        })

        $(this).toggleClass("btn_down");

        exit();
    })	

    $("thead").find(":checkbox").click(function(){
        $("tbody tr").each(function(){
            $(this).find(":checkbox").prop("checked",$("thead").find(":checkbox").prop('checked'));
            exit();
        })	
    })
    
    $(document).on('click',":button", function(){
        $(this).parents("tr").remove();
        exit();
    })

    exit();
});

function sortPrice(a){//a:待排序的数组，冒泡法排序
    var t;
    for(var i=0; i<a.length-1;i++){ //趟：n-1 n:a数组的长度
         for(var j=0; j<a.length-1-i; j++){
              if(a[j].price>a[j+1].price){
                   t=a[j];
                   a[j]=a[j+1];
                   a[j+1]=t;
              }
         }
    }			
}

function sortDescPrice(a){//a:待排序的数组
    var t;
    for(var i=0; i<a.length-1;i++){ //趟：n-1 n:a数组的长度
         for(var j=0; j<a.length-1-i; j++){
              if(a[j].price<a[j+1].price){
                   t=a[j];
                   a[j]=a[j+1];
                   a[j+1]=t;
              }
         }
   }			
}

function sortAddress(a){//a:待排序的数组，冒泡法排序
    var t;
    for(var i=0; i<a.length-1;i++){ //趟：n-1 n:a数组的长度
         for(var j=0; j<a.length-1-i; j++){
              if(a[j].address.localeCompare(a[j+1].address) == 1){
                   t=a[j];
                   a[j]=a[j+1];
                   a[j+1]=t;
              }
         }
    }			
}

function sortDescAddress(a){//a:待排序的数组
    var t;
    for(var i=0; i<a.length-1;i++){ //趟：n-1 n:a数组的长度
         for(var j=0; j<a.length-1-i; j++){
              if(a[j].address.localeCompare(a[j+1].address) == -1){
                   t=a[j];
                   a[j]=a[j+1];
                   a[j+1]=t;
              }
         }
   }			
}