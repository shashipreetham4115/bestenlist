String.prototype.bevowel = function () {
    var str = this.valueOf();
    var vowels = ['a', 'e', 'i', 'o', 'u','A','E','I','O','U'];
		var vowelsFound = [];
		for(i=0; i < str.length; i++){
			if(vowels.indexOf(str[i]) != -1){
				vowelsFound.push(str[i]);
			}
		}
    return(vowelsFound.toString());
 };

 'hello'.bevowel(); // eo