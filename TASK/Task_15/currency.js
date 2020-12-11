Number.prototype.seperateCurrency = function(CC){
    if(CC === "NULL")
    return this.toLocaleString()
    else
    return this.toLocaleString(CC);
};
var a = 2334234;
a.seperateCurrency();
// 2,334,234
a.seperateCurrency('en-IN');
// 23,34,234