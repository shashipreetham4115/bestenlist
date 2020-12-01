String.prototype.bespacify = function () {
    var str = this.valueOf();
    return(str.split('').join(' '));
 };

 'hello'.bespacify(); // h e l l o