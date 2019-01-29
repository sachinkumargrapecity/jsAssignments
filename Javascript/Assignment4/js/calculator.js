var stringToShow = [0] ; // it will store the equation


$('td').click(function(){
    let innerHTML = this.innerHTML;
    // if user clicked the number
    if(!isNaN(Number(innerHTML))){
        // if end of array contains operator then add 0 at the end
        if(isNaN(Number(stringToShow[stringToShow.length-1]))){
            stringToShow[stringToShow.length] = 0;
        }
        stringToShow[stringToShow.length-1]*=10;
        stringToShow[stringToShow.length-1]= Number(stringToShow[stringToShow.length-1]) + Number(innerHTML);
        $("#output").val(stringToShow.join(""));
    }
    // if user clicked = then calculate result and show
    else if(innerHTML == '='){
        let result = stringToShow[0];
        for(let i=1;i<stringToShow.length;i+=2){
            // if next value is there then it will be definitely operator
            // apply operator with next value to the operator if exists
            if(stringToShow.length>i+1){
                switch(stringToShow[i]){
                    case '+': {result = result + stringToShow[i+1]; break;}
                    case '-': {result = result - stringToShow[i+1]; break;}
                    case '*': {result = result * stringToShow[i+1]; break;}
                    case '/': {result = result / stringToShow[i+1]; break;}
                    case '%': {result = result % stringToShow[i+1]; break;}
                }
                
            }
        }
        stringToShow = [];
        stringToShow[0] = result;
        $("#output").val(result);
    }
    //if user clicked the clear button
    else if(innerHTML == 'Clear'){
        $("#output").val(0);
        stringToShow = [];
        stringToShow[0] = 0;
    }
    // else user has clicked the operator
    else{
        // check if array end contains operator
        // if yes then change the operator with current operator clicked
        if(isNaN(Number(stringToShow[stringToShow.length-1]))){
            stringToShow[stringToShow.length-1]  = innerHTML;
        }
        else{
            // save the operator at next place
            stringToShow[stringToShow.length] = innerHTML;
        }
        $("#output").val(stringToShow.join(""));
    }
});