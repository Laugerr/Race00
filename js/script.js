let keyboard = document.querySelector(".keyboard");
let creativeMode = false;
let outputVal = document.querySelector("#output-value");
let historyVal = document.querySelector("#history-value");
var Memory = 0;

const toCreativeMode = () => {
    let btn = document.querySelector(".toCreative");
    if(!creativeMode) {
        creativeMode = true;
        let creativeList = document.querySelectorAll(".creative");
        creativeList.forEach(elem => {
            elem.style.display = "block";
            elem.style.opacity = "0.2";
            for (let opacity = 0.4; opacity < 1.1; opacity = opacity + 0.2) 
            {           
                setTimeout(function(){elem.style.opacity = opacity;},50)                       
            } 
        });
        btn.innerHTML = "&larrhk;";
        let eq = document.querySelector("#equalSign");
        eq.setAttribute("colspan", "2");
    } else {
        creativeMode = false;
        let creativeList = document.querySelectorAll(".creative");
        creativeList.forEach(elem => {
            elem.style.display = "none";
        });
        btn.innerHTML = "&Colon;";
    }
}

const C = () => {
    outputVal.value = "";
}
const changeSign = () => {
    if(outputVal.value !== "" && outputVal.value[0] !== "-"){
        outputVal.value = "-" + outputVal.value;
    } else if(outputVal.value[0] === "-") {
        outputVal.value = outputVal.value.slice(1);;
    }
}
const putDot = () => {
    if(!isNaN(outputVal.value[outputVal.value.length-1])) {
        if(outputVal.value.match(/.?\d+$/)[0][0] !== "."){
            outputVal.value = outputVal.value + ".";
        }
    }
}
const calc = () => {
    historyVal.innerHTML =  outputVal.value + "=" + eval(outputVal.value);
    outputVal.value = eval(outputVal.value);
}

const percent = () => {
    if(!outputVal.value.match(/[/*\-+]/)) {
        return;
    }
    for(let i = outputVal.value.length-1; i >=0; i--){
        if(!outputVal.value[i].match(/[0-9.]/)){
            let num1 = outputVal.value.slice(i+1);
            let num2 = 0;
            for(let a = i-1; a >=0 ;a--){
                if(!outputVal.value[a].match(/[0-9.]/) || a == 0){
                    num2 = outputVal.value.slice(a, i);
                    break;
                }
            }
            historyVal.innerHTML = outputVal.value.slice(0, i+1) + num2*(num1/100) + "=" + eval(outputVal.value.slice(0, i+1) + num2*(num1/100));
            outputVal.value = eval(outputVal.value.slice(0, i+1) + num2*(num1/100));
            break;
        }
    }
}

const  MR = () => {
    Memory = eval(outputVal.value);
    outputVal.value = Memory;
}

const MC = () => {
    Memory = 0;
    outputVal.value = Memory;
}

const M_Minus = () => {
    historyVal.innerHTML = outputVal.value + "-" + Memory + "=" + (eval(outputVal.value)-Memory);
    Memory = eval(outputVal.value) - Memory;
    outputVal.value = Memory;
}
const M_Plus = () =>  {
    historyVal.innerHTML = outputVal.value + "+" + Memory + "=" + (eval(outputVal.value)+Memory);
    Memory = eval(outputVal.value) + Memory;
    outputVal.value = Memory;
}
const degree = () => {
    outputVal.value = outputVal.value + "**";
}
const fact = () => {
    let res = 1;
    for(let a = 1; a <= eval(outputVal.value); a++){
        res*=a;
    }
    historyVal.innerHTML = "(" + outputVal.value + ")! =" + res;
    outputVal.value = res;
}
const sqr = () => {
    historyVal.innerHTML = "√(" + outputVal.value + ") =" + Math.sqrt(eval(outputVal.value));
    outputVal.value = Math.sqrt(eval(outputVal.value));
}

document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', function () {
        outputVal.value = outputVal.value + button.innerHTML;
    })
})

document.querySelectorAll('.action').forEach(button => {
    button.addEventListener('click', function () {
        if(button.innerHTML.match(/^[/*\-+]$/)) {
            if(!isNaN(outputVal.value[outputVal.value.length-1])){
                outputVal.value = outputVal.value + button.innerHTML;
            }
        }
    })
})

