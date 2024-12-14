console.log("this");

for(let i=0;i<=5;i++){
    console.log(i);
}

function Hello(){
    console.log("Hello");
}
// document.getElementById().addEventListener("DOMContentLoaded", function() {
for(var j=0;j<5;j++){
    console.log("DOM content loaded");
    // Hello();
    setTimeout(() => {
        // console.log("After 2 seconds");
        Hello(j);
    },2000);
}
// });

setTimeout(() => {
    // console.log("After 2 seconds");
    Hello();
},2000);