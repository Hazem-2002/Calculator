let btns = document.querySelectorAll(".btn");
let display = document.querySelector(".display span");
let x = false;
btns.forEach(ele => {
    ele.addEventListener("click", () => {
        let input = ele.dataset.role;
        if(input == '=') {
            display.textContent = calc(display.textContent);
            x = true;
        }
        else if(input == 'dl') {
            if(display.textContent != "0"){
                display.textContent = display.textContent.slice(0,-1);
            }
        }
        else if(input == 'cl') {
            display.textContent = 0;
            display.classList.remove("active");
        }
        else {
            if (!isNaN(input) && x) {
                display.textContent = input;
                display.classList.add("active");
            } else {
                if (display.textContent == "0") {
                    if(input != "*" && input != "/" && input != "%") {
                        display.textContent = input;
                        display.classList.add("active");
                    }
                } else {
                    if(((display.textContent.length == 1 && (display.textContent.slice(-1)=="+" || display.textContent.slice(-1)=="-")) || (isNaN(display.textContent.slice(-1)) && isNaN(display.textContent.slice(-2,-1)))) && (input == "+" || input == "-")) {
                        display.textContent = display.textContent.slice(0,-1) + input;
                    }
                    else if(isNaN(display.textContent.slice(-1)) && !isNaN(display.textContent.slice(-2,-1)) && display.textContent.slice(-2,-1) != "" && (input == "*" || input == "/" || input == "%")) {
                        display.textContent = display.textContent.slice(0,-1) + input;
                    }
                    else if(isNaN(display.textContent.slice(-1)) && isNaN(display.textContent.slice(-2,-1)) && display.textContent.slice(-2,-1) != "" && !isNaN(input)){
                        display.textContent += input;
                    }
                    else{
                        if(!((isNaN(display.textContent.slice(-1)) && isNaN(display.textContent.slice(-2,-1)) || (display.textContent.length == 1 && (display.textContent.slice(-1)=="+" || display.textContent.slice(-1)=="-"))) && isNaN(input))) {
                            display.textContent += input;
                        }
                    }
                }
            }
            x = false;
        }
        if(display.textContent == "") {
            display.textContent = 0;
            display.classList.remove("active");
        }
    })
});

function calc(val) {
    let nums = val.split("").map(ele => (!isNaN(ele) || ele == ".")? ele:"-").join("").split("-");
    let opes = val.split("").filter(ele => (isNaN(ele) &&  ele != "."));

    while(nums.includes("")) {
        let index = nums.indexOf("");
        nums.splice(index,1);
        switch(opes[index]){
            case "-" : nums[index] = -(+nums[index]);
        }
        opes.splice(index,1);
    }
    
    let result = +nums[0];
    for(let i = 1 ; i < nums.length ; i++) {
        switch(opes[i-1]) {
            case "+" : 
            result += +nums[i];
            break;
            case '-' : 
            result -= +nums[i];
            break;
            case '*' : 
            result *= +nums[i];
            break;
            case '/' : 
            result /= +nums[i];
            break;
            case '%' : 
            result %= +nums[i];
            break;
        }
    }
    return result;
}