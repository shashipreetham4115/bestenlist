Array.prototype.begetduplicates = function (){
	var founddata=[];
	var givenArr = this;
    givenArr.sort(function(a, b){return a - b});
       for(var a=0;a<(givenArr.length)-1;a++){
        if(givenArr[a]==givenArr[a+1]){
          if(givenArr[a-1] != givenArr[a]){
           founddata.push(givenArr[a]);
          }
        }
       }
	return founddata
};

[6,2,4,5,4,6,6].begetduplicates();
//[4,6]