console.log("this");

for(let i=0;i<=5;i++){
    console.log(i);
}

function Hello(j){
    console.log("Hello" + j);
}
// document.getElementById().addEventListener("DOMContentLoaded", function() {
for(var j=0;j<5;j++){
    console.log("DOM content loaded");
    // Hello();
    setTimeout(() => {
        // console.log("After 2 seconds");
        Hello(j);
    },1000);
}
// });

setTimeout(() => {
    // console.log("After 2 seconds");
    Hello(j);
},2000);