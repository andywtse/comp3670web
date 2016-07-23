$(document).ready(function(){
    //-------------
    var $billTotal;
    var $billType;
    //-------------
    var $tax;
    var $tipMultiplier;
    //-------------
    var $numPeople;
    var $splitOption;
    var $finalPrice=0;
    //-------------
    clear();
    
    //---------------BILL TYPE SELECTION----------------
    
    $("#billtype").change(function(){
        $billType=$("#billtype").val();
        if($billType==="restaurant"){
            $("#tipVisible").show();
            $("#taxVisible").show();
            
        }else if($billType==="other"){
            $("#taxVisible").show();
            $("#tipVisible").hide();
            $("#tip").val('');
        }else{
            $("#taxVisible").hide();
            $("#tipVisible").hide();
            $("#tip").val('');
            $("#tax").val('');
        }
    });
   
    //-------------------CALCULATION--------------------
    
    $("#calculate").click(function(){
        //alert($billType);
        $splitOption=$("#splitoption").val();
        
        if(validateInputs($billType)){
            if($billType==="restaurant"){
                if($splitOption!=""){

                    $finalPrice = ((($billTotal*$tipMultiplier)+$tax)/($numPeople)).toFixed(2);

                    $("#splitprice").text("$"+$finalPrice);
                }

            }else if($billType==="other"){
                if($splitOption!=""){

                    $finalPrice = (($billTotal+$tax)/($numPeople)).toFixed(2);

                    $("#splitprice").text("$"+$finalPrice);
                }
            }else{
                if($splitOption!=""){

                    $finalPrice = (($billTotal)/($numPeople)).toFixed(2);

                    $("#splitprice").text("$"+$finalPrice);
                }
            }
            
        }else{
            alert("Fields are not filled in or incorrect");
        }
    });
    
    function validateInputs($type){
        var $isValid=false;
        if($type==="restaurant"){
            if((Number($("#billtotal").val())>0)){
                if((Number($("#numofpeople").val()>0))){
                    if((Number(($("#tip").val()*0.01)+1))>0){
                        if((Number($("#tax").val()))>0){
                            $isValid=true;
                            $billTotal=Number($("#billtotal").val());
                            $numPeople=Number($("#numofpeople").val());
                            $tipMultiplier=Number(($("#tip").val()*0.01)+1);
                            $tax = Number($("#tax").val());
                        }
                    }
                }
            }
        }else if($type==="other"){
            if((Number($("#billtotal").val())>0)){
                if((Number($("#numofpeople").val()>0))){
                    if((Number($("#tax").val()))>0){
                        $isValid=true;
                        $billTotal=Number($("#billtotal").val());
                        $numPeople=Number($("#numofpeople").val());
                        $tax = Number($("#tax").val());
                    }
                }
            }
        }else if($type==="utility"){
            if((Number($("#billtotal").val())>0)){
                if((Number($("#numofpeople").val()>0))){
                    $isValid=true;
                    $billTotal=Number($("#billtotal").val());
                    $numPeople=Number($("#numofpeople").val())
                }
            }
        }
        //alert($isValid);
        return $isValid;
    }
    
    function clear(){
        $('#taxVisible').hide();
        $('#tipVisible').hide();
        $('#billtype').val("");
        $('#splitoption').val("");
        $('#billtotal').val("");
        $("#numofpeople").val("");
        $("#tip").val('');
        $("#tax").val('');
    }
});