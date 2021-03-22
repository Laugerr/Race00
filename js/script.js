let keyboard = document.querySelector(".keyboard");
let creativeMode = false;
let outputVal = document.querySelector("#output-value");
let historyVal = document.querySelector("#history-value");
var Memory = 0;
let selectedSys = 0;

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
        let eq = document.querySelector(".equalSign");
        eq.setAttribute("colspan", "2");
    } else if(selectedSys == 0) {
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
    historyVal.value = "";
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
    historyVal.value =  outputVal.value + "=" + eval(outputVal.value);
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
            historyVal.value = outputVal.value.slice(0, i+1) + num2*(num1/100) + "=" + eval(outputVal.value.slice(0, i+1) + num2*(num1/100));
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
    historyVal.value = outputVal.value + "-" + Memory + "=" + (eval(outputVal.value)-Memory);
    Memory = eval(outputVal.value) - Memory;
    outputVal.value = Memory;
}
const M_Plus = () =>  {
    historyVal.value = outputVal.value + "+" + Memory + "=" + (eval(outputVal.value)+Memory);
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
    historyVal.value = "(" + outputVal.value + ")! =" + res;
    outputVal.value = res;
}
const sqr = () => {
    historyVal.value = "√(" + outputVal.value + ") =" + Math.sqrt(eval(outputVal.value));
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
document.getElementById("system").onchange = function() {
    let idx = document.getElementById("system").selectedIndex;
    selectedSys = idx;
    disp(idx);
}
const disp = (num) => {
    if(num === 2) {
        document.querySelectorAll(".let_td").forEach(bin => {
            bin.style.display = "none";
        })
        document.querySelectorAll('.num_td').forEach(num => {
            num.style.display = "none";
        });
        document.querySelector('.dot_td').style.display = "none";
        document.querySelectorAll(".binary_td").forEach(bin => {
            bin.style.display = "table-cell";
            bin.setAttribute("colspan", "1");
            bin.setAttribute("rowspan", "3");
        })
        let eq = document.querySelector(".equalSign");
        eq.style.display = "none";
        let btn = document.querySelector(".toCreative");
        btn.style.display = "none";
        document.querySelector(".equalSign2").style.display = "table-cell";
        document.querySelector(".equalSign2").setAttribute("colspan", "2");
    } else if (num == 1) {
        document.querySelectorAll('.num_td').forEach(num => {
            num.style.display = "table-cell";
        });
        document.querySelectorAll(".binary_td").forEach(bin => {
            bin.style.display = "none";
        })
        document.querySelector('.dot_td').style.display = "none";
        document.querySelectorAll(".let_td").forEach(bin => {
            bin.style.display = "table-cell";
        })
        document.querySelector(".equalSign2").style.display = "none";
        document.querySelector(".equalSign").style.display = "table-cell";
        document.querySelector(".equalSign").setAttribute("colspan", "3");
        document.querySelector(".toCreative").style.display = "none";
    } else {
        document.querySelectorAll('.num_td').forEach(num => {
            num.style.display = "table-cell";
        });
        document.querySelector('.dot_td').style.display = "table-cell";
        document.querySelectorAll(".binary_td").forEach(bin => {
            bin.style.display = "none";
        })
        document.querySelectorAll(".let_td").forEach(bin => {
            bin.style.display = "none";
        })
        let btn = document.querySelector(".toCreative");
        btn.style.display = "table-cell";
        let eq = document.querySelector(".equalSign");
        eq.style.display = "table-cell";
        document.querySelector(".equalSign2").style.display = "none";
    }
}

function lengthConv() {
    var x = document.querySelector(".lenth");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
const lengthConverter = (id, value) => {
    let feet = document.querySelector("#inputFeet");
    let metr = document.querySelector("#inputMeters");
    let cm = document.querySelector("#inputcm");
    let yards = document.querySelector("#inputYards");
    let km = document.querySelector("#inputKilometers");
    let miles = document.querySelector("#inputMiles");
    if(id == "inputFeet") {
        metr.value = value/3.28084;
        cm.value = value*30.48;
        yards.value = value*0.33333;
        km.value = value/3280.8;
        miles.value = value*5280.0016896;
    }
    else if(id == "inputMeters"){
        feet.value = value*3.2808;
        cm.value = value*100;
        yards.value = value*1.09361;
        km.value = value/1000;
        miles.value = value*1609.34;
    }
    else if(id == "inputcm"){
        feet.value = value/30.48;
        metr.value = value/100;
        yards.value = value/91.44;
        km.value = value/100000;
        miles.value = value/160934;
    }
    else if(id == "inputYards"){
        feet.value = value*3;
        metr.value = value*1.09361;
        cm.value = value*91.44;
        km.value = value*1093.61;
        miles.value = value*1759.99469184;
    }
    else if(id == "inputKilometers"){
        feet.value = value*3280.84;
        metr.value = value*1000;
        cm.value = value*100000;
        yards.value = value*1093.61
        miles.value = value/1.60934;
    }
    else if(id == "inputMiles"){
        feet.value = value*5280;
        metr.value = value*1609.34;
        cm.value = value*160934;
        yards.value = value*1760;
        km.value = value*1.60934;
    }
}

function weightConv() {
    var x = document.querySelector(".weight");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

const weightConverter = (id, value) => {
    let once = document.querySelector("#inputOnce");
    let kilogram = document.querySelector("#inputKilogram");
    let pound = document.querySelector("#inputPound");
    let gram = document.querySelector("#inputGram");
    let tonne = document.querySelector("#inputTonne");
    let stone = document.querySelector("#inputStone");
    if (id == "inputOnce"){
        kilogram.value = value/35.274;
        pound.value = value/16;
        gram.value = value*28.3495; 
        tonne.value = value/35274;
        stone.value = value/224;
    }
    else if(id == "inputKilogram"){
        once.value = value*35.274;
        pound.value = value*2.20462;
        gram.value = value*1000; 
        tonne.value = value/1000;
        stone.value = value/6.35029;
    }
    else if(id == "inputPound"){
        once.value = value*16;
        kilogram.value = value/2.20462;
        gram.value = value*453.592; 
        tonne.value = value/2204.62;
        stone.value = value/14;
    }
    else if(id == "inputGram"){
        once.value = value/28.3495;
        kilogram.value = value/1000;
        pound.value = value/453.592;
        tonne.value = value/1e+6;
        stone.value = value/6350.29;
    }
    else if(id == "inputTonne"){
        once.value = value*35274;
        kilogram.value = value*1000;
        pound.value = value*2204.62;
        gram.value = value*1e+6; 
        stone.value = value*157.473;
    }
    else if(id == "inputStone"){
        once.value = value*224;
        kilogram.value = value*6.35029;
        pound.value = value*14;
        gram.value = value*6350.29; 
        tonne.value = value/157.473;
    }
}