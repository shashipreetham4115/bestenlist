function squareEDOfNumber(a){
    var arr = [];
    var b = (a.toString().split("")); 
         for(var i=0;i<b.length;i++){
           arr.push(b[i]*b[i]);
         }
return(arr.join(""))
}
console.log(squareEDOfNumber(5566)) //25253636
console.log(squareEDOfNumber(3345)) //991625