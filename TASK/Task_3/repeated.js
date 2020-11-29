function repeated(a){
  
    var b = (a.toString().split("")); 
    return(b[a.toString().length-1]==b[a.toString().length-2])

}
console.log(repeated(556677)) //true
console.log(repeated(5467))   //false
console.log(repeated(22))     //true