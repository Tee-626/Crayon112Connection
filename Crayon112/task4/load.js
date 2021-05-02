$(function(){
    // 显示单行以及偶数行的颜色
    var [even, odd] = ['#006699', "#fdec8b"];

    // 响应事件结算
    var exit = function (){
        var all_choosed = true,
            price = 0;
        
        $("tbody tr").each(function(){
            all_choosed &&= $(this).find(":checkbox").prop("checked");
            if ($(this).find(":checkbox").prop("checked")){
                price += parseFloat($(this).find("span").html());
            }
        });

        $("thead").find(":checkbox").prop("checked", all_choosed);
        $("tbody tr:even").css("background", even);
        $("tbody tr:odd").css("background", odd);
        $("tfoot").find("span").html(""+price.toFixed(2));
    };
    
    // 全选按钮
    $("thead :checkbox").on("click", function(){
        $("tbody tr").each(function(){
            $(this).find(":checkbox").prop("checked",$("thead").find(":checkbox").prop('checked'));
        })
    });
    
    // 选择按钮
    $("tbody").on("click",":checkbox", function(){
        exit();
    });

    // 删除按钮
    $(document).on('click',":button", function(){
        $(this).parents("tr").remove();
        exit();
    });
    
    //价格排序
    $("#priceSort").on('click', function (){
        var aTr = new Array();
        $("tbody tr").each(function (){
            var obj = new Object();
            obj["html"] = $(this).html();
            obj["price"] = parseFloat($(this).find("span").html());
            obj["address"] = $(this).find("td:eq(3)").html();
            obj["checked"] = $(this).find(":checkbox").prop("checked");
            aTr.push(obj);
        })
    
        if($("#priceSort").hasClass("btn_down")){
            sortArray(aTr, "price", false);
        }else{
            sortArray(aTr, "price", true)
        }
    
        var sTr = "";
        $(aTr).each(function(){
            sTr += "<tr>"+this.html+"</tr>"
        })
        $("tbody").html(sTr);
        $(aTr).each(function(index){
            var flag = this.checked;
            $("tr:gt(0)").find(":checkbox").eq(index).prop("checked", flag);
        })    
        $("#priceSort").toggleClass("btn_down");
        exit();
    });

    // 地区排序
    $("#addressSort").on("click", function (){
        var aTr = new Array();
        $("tbody tr").each(function (){
            var obj = new Object();
            obj["html"] = $(this).html();
            obj["price"] = parseFloat($(this).find("span").html());
            obj["address"] = $(this).find("td:eq(3)").html();
            obj["checked"] = $(this).find(":checkbox").prop("checked");
            aTr.push(obj);
        })
    
        if($("#addressSort").hasClass("btn_down")){
            sortArray(aTr, "address", false);
        }else{
            sortArray(aTr, "address", true)
        }
    
        var sTr = "";
        $(aTr).each(function(){
            sTr += "<tr>"+this.html+"</tr>"
        })
        $("tbody").html(sTr);
        $(aTr).each(function(index){
            var flag = this.checked;
            $("tr:gt(0)").find(":checkbox").eq(index).prop("checked", flag);
        })    
        $("#addressSort").toggleClass("btn_down");
        exit();
    });

    exit();
})

function sortArray(a, tag, inverse){
    var t;
    for(var i=0; i<a.length-1;i++){ //趟：n-1 n:a数组的长度
        for(var j=0; j<a.length-1-i; j++){
            var [tf, tb] = [a[j][tag], a[j+1][tag]];
            if(inverse){
                if (typeof tf == "string"){
                    if(tf.localeCompare(tb) == -1){
                        t=a[j];
                        a[j]=a[j+1];
                        a[j+1]=t;
                    }
                }else{
                    if(tf < tb){
                        t=a[j];
                        a[j]=a[j+1];
                        a[j+1]=t;
                    }
                }
            }else{
                if (typeof tf == "string"){
                    if(tf.localeCompare(tb) == 1){
                        t=a[j];
                        a[j]=a[j+1];
                        a[j+1]=t;
                    }
                }else{
                    if(tf > tb){
                        t=a[j];
                        a[j]=a[j+1];
                        a[j+1]=t;
                    }
                }
            }
        }
    }
}