$(document).ready(function(){
	$("#foodOrder").hide();
    
	var total = 0;
    var isValid=1;
    var check=0;
    $(".item").closest("tr").hide();
	$(":button").click(function() {
        isValid = 1;
		var $row = $(this).closest("tr");
		//console.log($row.find(".quantity").val());
		$itemName = $row.find(".item").text();
		$itemId = $itemName.replace(/\s+/g,'');
		$price = $row.find(".price").text().substring(1);
		$quantity = Number($row.find(".quantity").val());
		//check if numeric
        if ($.isNumeric($quantity) && ($quantity != 0)){
        //make sure that this is an integer
            if (Math.floor($quantity) == $quantity){
            //check to see if item is in cart
                
            total+=($quantity*$price);
            $("p").text("Final Price: $"+(total).toFixed(2));
            $("#foodOrder").show();
                if ($('#'+$itemId).length == 0){  //not in cart
                    if(checkRule1($itemId)&&checkRule2($itemId)){
                        //if(checkRule2($itemId)){
                            //if(checkRule3($itemId)){
                                $('#foodOrder tr:last').after("<tr class='"+$row.find(".item").attr("class")+"' id = '"+$itemId+"'><td class = 'foodCell item'>"+$itemName+"</td><td class = 'foodCell quantity'>"+$quantity+"</td><td class = 'foodCell price'>"+'$'+$price+"</td><td class = 'foodcell totalprice'>$"+($price*$quantity).toFixed(2)+"</td></tr>");
                            //}
                        //}
                    }
                }else{ //already in order table
                    $cartrow = $('#'+$itemId).closest("tr");
                    $cartq = Number($cartrow.find(".quantity").text());
                    $cartq+=$quantity;
                    $cartrow.find(".quantity").text($cartq);
                    $cartrow.find(".totalprice").text('$'+($price*$cartq).toFixed(2));
                    //alert("IT GOES HERE");
                }
            }else{
                alert("Please enter an integer only!");
            }
        }
        else{
            alert("Not a number.");
        }

});
    

$(":checkbox").click(function(){
    if($(this).is(":checked")){
        $("."+$(this).attr("class").split(/\s+/)[1]).closest("tr").show();
        check+=1;
    }else{
        if(($("#lc").is(":checked"))||($("#dc").is(":checked"))){
            if(!$("#bc").is(":checked")){
                $(".breakfast").closest("tr").hide();
            }
            $(".mainDish."+$(this).attr("class").split(/\s+/)[1]).closest("tr").hide();
            check-=1;
        }else{
            $("."+$(this).attr("class").split(/\s+/)[1]).closest("tr").hide();
            check-=1;
        }
    }
    
    if(check>1){
        if($('#foodOrder').find(".mainDish").length===1){
            $(".check").each(function(i){
               if($(this).is(":checked")){
                    $(".sideDish").addClass($(this).attr("class").split(/\s+/)[1]);
               } 

            });
        }
    }
});

function checkRule1($itemid){
    var $rule1 = $('#foodOrder').find(".breakfast");
    var isValid=1;
    //alert($rule1.length);
    if($rule1.length===1){
        $rule1.each(function(i,val){
            if($(val).attr("id")==="BreakfastBurrito"){
                if($itemid==="Bagel"||$itemid==="Toast"||$itemid==="EnglishMuffin"){
                    alert("Cannot order this");
                    isValid=0;
                    return false;
                }
            }
        });
    }
    if(isValid===1){
        return true;
    }
};
    
function checkRule2($itemid){
    var $rule2a = $('#foodOrder').find(".mainDish");
    var $rule2b = $('#foodOrder').find(".item");
    var isValid=1;
    
    if($rule2a.length===1){
        $rule2b.each(function(i,val){
            if($(val).attr("id")==="FrenchFries"){
                if($itemid==="OnionRings"){
                    alert("Cannot order this with French Fries and one Main Dish");
                    isValid=0;
                    return false;
                }
            }
            else if($(val).attr("id")==="OnionRings"){
                if($itemid==="FrenchFries"){
                    alert("Cannot order this with Onion Rings and one Main Dish");
                    isValid=0;
                    return false;
                }
            }
        });
    }
    if(isValid===1){
        return true;
    }
};
function checkRule3($itemid){
    return true;
};
   
});