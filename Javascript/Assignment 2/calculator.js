var strin='';
var number=0;

function calc(input){
    if(input == '/' ||
        input == '-' ||
        input == '*' ||
        input == '+'){
            
            strin= strin + number;
            strin= strin + input;
            document.getElementById("tb").rows[1].cells[0].innerHTML = strin;
            number=0;
        }
        else if(input == '='){
            document.getElementById("tb").rows[1].cells[0].innerHTML = eval(document.getElementById("tb").rows[1].cells[0].innerHTML);
            
        }
        else {
            
            number*=10;
            number+=input;
            document.getElementById("tb").rows[1].cells[0].innerHTML = strin + number;
        }
}