Array.prototype.befindobject = function (data){
	var founddata=[];
	var givenArr = this;
	givenArr.map((a) => {
		founddata.push(a[data])
	});
	return founddata
};
[{name:"shashi",age:20},{name:"preetham",age:21}].befindobject('name'); 
  //  ["shashi","preetham"]