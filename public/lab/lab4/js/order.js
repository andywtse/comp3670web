$(document).ready(function(){
    var total=0;
    var totalquantity=0;
    var discount=0.9
    $(".cart").hide();
    $("p").first().text("Your cart is currently empty");
    $(':button').click(function(){
        /*
        $("p").text("Testing");
        $(".cart").show();
        $(".cartHeader").after("<div class='row'><div class= 'cell item'>Sutff</div><div class='cell quantity'>more stuff</div><div class='cell price'>morestuff</div><div class ='cell totalprice'>testing</div><div>");
        */
        var $row = $(this).parent().parent();
        //$(".cart").show();
        //$(".cartHeader").after("Stuff"+($price)+"Something");
        
        var $price = $row.find(".price").text().substring(1);
        var $item = $row.find(".item").text();
        var $quantity = Number($row.find(".quantity").val());
        var $itemid = $item.replace(/\s+/g,'');
        
        //$(".cartHeader").after("<div class='row'><div class= 'cell item'>Sutff</div><div class='cell quantity'>more stuff</div><div class='cell //price'>morestuff</div><div class ='cell totalprice'>testing</div><div>");
        if($.isNumeric($quantity)&&$quantity!=0){
            if(Math.floor($quantity)==$quantity){
                total+=$quantity*$price;
                totalquantity+=$quantity;
                
                if(total!=0){
                    if(totalquantity>=10){
                      $("p").last().text("Final Price with 10% discount: $"+(total*discount).toFixed(2));
                    }
                        $("p").first().text("Final Price: $"+(total).toFixed(2));
                        $(".cart").show();
                }
                
                if($('#'+$itemid).length==0){
                    $(".cartHeader").after("<div class='row' id='"+($itemid)+"'><div class='cell item'>"+($item)+"</div><div class='cell quantity'>"+($quantity)+"</div><div class='cell price'> $"+($price)+"</div><div class ='cell totalprice'> $"+($price*$quantity)+"</div></div>");
                }else{
                    $cartrow = $('#'+$itemid).closest(".row");
					$cartq = Number($cartrow.find(".quantity").text());
                    $cartq+=$quantity;
					$cartrow.find(".quantity").text($cartq);
					//$cartp = Number($cartrow.find(".totalprice").text().substring(2));
                    //$("p").text("current quantity: "+$cartq + "| price:  " + $price +"| price*quantity:  "+ ($price*$cartq).toFixed(2) +"| total price cell "+ ($cartp)+"| calculation: "+($cartp+($price*$cartq)));
				    $cartrow.find(".totalprice").text('$'+($price*$cartq).toFixed(2));
                    }
                }else{
                    alert("Integers only.");
                }
            }else{
                alert("Not a number.");
        }
    });
});