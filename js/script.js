let btns = document.querySelectorAll(".btn");
let display = document.querySelector(".display span");
let resultPriorty = document.getElementById("lbl1");
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
            if (display.textContent == "0" || (x && !isNaN(input))) {
                if(input != "*" && input != "/" && input != "%") {
                    display.textContent = input;
                    display.classList.add("active");
                }
            } else {
                // check if user enter sign (+ or -) only 
                let x1 = (display.textContent.length == 1 && (display.textContent.slice(-1)=="+" || display.textContent.slice(-1)=="-"));
                // check if last two input were operators
                let x2 = (isNaN(display.textContent.slice(-1)) && isNaN(display.textContent.slice(-2,-1)));
                // check if input is (+ or -)
                let x3 = (input == "+" || input == "-");
                // check if input is (* or / or %)
                let x4 = (input == "*" || input == "/" || input == "%");
                // check if last input was operator and previous was number and not empty value
                let x5 = (isNaN(display.textContent.slice(-1)) && !isNaN(display.textContent.slice(-2,-1)) && display.textContent.slice(-2,-1) != "");
                // check if input is number
                let x6 = !isNaN(input)

                if(((x1 || x2) && x3) || (x5 && x4)) {
                        display.textContent = display.textContent.slice(0,-1) + input;
                }
                else if(x2 && x6){
                    display.textContent += input;
                }
                else{
                    if(!((x2 || x1) && !(x6))) {
                        display.textContent += input;
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
    // filter numbers and store each value at index in array
    let nums = val.split("").map(ele => (!isNaN(ele) || ele == ".")? ele:"-").join("").split("-");
    // filter operations and store each operation at index in array
    let opes = val.split("").filter(ele => (isNaN(ele) &&  ele != "."));
    // remove empty indexs which generate due to sign(- or +) and remove this sign from operaions array(opes) and add sign to numbers in numbers array(nums)
    while(nums.includes("")) {
        let index = nums.indexOf("");
        nums.splice(index,1);

        switch(opes[index]){
            case "-" : nums[index] = -(nums[index]);
        }
        opes.splice(index,1);
    }
    console.log(nums);
    console.log(opes);

    if(resultPriorty.checked) {

        function applyOp(index) {
            let a = +nums[index];
            let b = +nums[index + 1];
            let op = opes[index];
            let result;

            switch (op) {
                case "*": result = a * b; break;
                case "/": result = a / b; break;
                case "%": result = a % b; break;
                case "+": result = a + b; break;
                case "-": result = a - b; break;
            }

            nums.splice(index, 2, result);
            opes.splice(index, 1);
        }

        while (opes.includes("*") || opes.includes("/") || opes.includes("%")) {
            let iMul = opes.indexOf("*");
            let iDiv = opes.indexOf("/");
            let iMod = opes.indexOf("%");

            let indices = [iMul, iDiv, iMod].filter(i => i !== -1);
            let index = Math.min(...indices);

            applyOp(index);
        }

        while (opes.length > 0) {
            let iAdd = opes.indexOf("+");
            let iSub = opes.indexOf("-");

            let indices = [iAdd, iSub].filter(i => i !== -1);
            let index = Math.min(...indices);

            applyOp(index);
        }
        return nums[0];
    }else {
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
}

