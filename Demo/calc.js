let a = parseInt(process.argv[2]);
let op = process.argv[3];
let b = parseInt(process.argv[4]);

let ans = 0;
if (op === "+") {
    ans = a+b;
}
if (op === "-") {
    ans = a-b;
}
if (op === "*") {
    ans = a*b;
}
if (op === "/") {
    ans = a/b;
}


console.log(a ,op, b, " = ", ans);