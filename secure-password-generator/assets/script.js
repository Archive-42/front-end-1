( () => {
    const numArr = [], letArr = [], schArr = [];
    const PASS_LENGTH = document.querySelector("#pass-length");
    const PASS_RANGE = document.querySelector("#pass-range");

    for(let i = 0; i <= 9; i++) { numArr.push(i); }
    for(let i = 65; i <= 90; i++) { letArr.push(String.fromCharCode(i)); }
    for(let i = 97; i <= 122; i++) { letArr.push(String.fromCharCode(i)); }
    for(let i = 33; i <= 47; i++) { schArr.push(String.fromCharCode(i)); }
    for(let i = 58; i <= 64; i++) { schArr.push(String.fromCharCode(i)); }
    for(let i = 91; i <= 96; i++) { schArr.push(String.fromCharCode(i)); }
    for(let i = 123; i <= 126; i++) { schArr.push(String.fromCharCode(i)); }

    /* Recursive Function */
    function swap(s, i) {
        if(i == 0) { return s; }
        let a = [];
        let x = Math.floor(Math.random() * (s.length - 1));
        let y = Math.floor(Math.random() * (s.length - 1));
        while(y == x) { y = Math.floor(Math.random() * (s.length - 1)) }
        for(let f = 0; f < s.length; f += 1) { a.push(s[f]); }
        a[x] = [a[y], a[y] = a[x]][0];
        return swap(a.join(""), i -= 1);
    }    

    const obj = {
        "letters": true,
        "numbers": true,
        "schars": true
    };

    function alter(s) {
        obj[s] = !obj[s];
    };

    function passGen(v) {
        let str = "", l = v;

        if(obj["letters"] && obj["numbers"] && obj["schars"]) {
            let r = (Math.floor(Math.random() * v));
            r = r == 0 ? 1 : r;
            for(let i = 0; i < r; i++) { str += letArr[Math.floor(Math.random() * (letArr.length - 1))]; }
            v -= r;

            r = (Math.floor(Math.random() * v));
            r = r == 0 ? 1 : r;
            for(let i = 0; i < r; i++) { str += numArr[Math.floor(Math.random() * (numArr.length - 1))]; }
            v -= r;
            
            for(let i = 0; i < v; i++) { str += schArr[Math.floor(Math.random() * (schArr.length - 1))]; }
        }
        else if(obj["letters"] && obj["numbers"] && !obj["schars"]) {
            let r = (Math.floor(Math.random() * v));
            r = r == 0 ? 1 : r;
            for(let i = 0; i < r; i++) { str += letArr[Math.floor(Math.random() * (letArr.length - 1))]; }
            v -= r;

            for(let i = 0; i < v; i++) { str += numArr[Math.floor(Math.random() * (numArr.length - 1))]; }
        }
        else if(!obj["letters"] && obj["numbers"] && obj["schars"]) {
            let r = (Math.floor(Math.random() * v));
            r = r == 0 ? 1 : r;
            for(let i = 0; i < r; i++) { str += numArr[Math.floor(Math.random() * (numArr.length - 1))]; }
            v -= r;

            for(let i = 0; i < v; i++) { str += schArr[Math.floor(Math.random() * (schArr.length - 1))]; }
        }
        else if(obj["letters"] && !obj["numbers"] && obj["schars"]) {
            let r = (Math.floor(Math.random() * v));
            r = r == 0 ? 1 : r;
            for(let i = 0; i < r; i++) { str += letArr[Math.floor(Math.random() * (letArr.length - 1))]; }
            v -= r;

            for(let i = 0; i < v; i++) { str += schArr[Math.floor(Math.random() * (schArr.length - 1))]; }
        }
        else if(obj["letters"] && !obj["numbers"] && !obj["schars"]) {
            for(let i = 0; i < v; i++) { str += letArr[Math.floor(Math.random() * (letArr.length - 1))]; }
        }
        else if(!obj["letters"] && obj["numbers"] && !obj["schars"]) {
            for(let i = 0; i < v; i++) { str += numArr[Math.floor(Math.random() * (numArr.length - 1))]; }
        }
        else if(!obj["letters"] && !obj["numbers"] && obj["schars"]) {
            for(let i = 0; i < v; i++) { str += schArr[Math.floor(Math.random() * (schArr.length - 1))]; }
        }
        else { return ""; }

        return swap(str, l);
    };

    function displayPassword() {
        let value = passGen(parseInt(PASS_RANGE.value));
        document.getElementById("text").innerHTML = value;
    }

    function doActions() {
        PASS_RANGE.onchange = () => {
            PASS_LENGTH.innerHTML = PASS_RANGE.value;
        };

        PASS_RANGE.oninput = () => {
            PASS_LENGTH.innerHTML = PASS_RANGE.value;
        };

        for(let box of document.querySelectorAll("input[type='checkbox']")) {
            box.onchange = () => {
                alter(box.name);
            };
        }

        document.querySelector("button").onclick = () => {
            displayPassword();
        };
    }

    doActions();
})();