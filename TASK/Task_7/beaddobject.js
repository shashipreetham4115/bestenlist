Array.prototype.befindobject = function (propertyname,propertyvalue){
	
	this.forEach((item) => {
		item[propertyname] = propertyvalue;
	});
	return this
};
[{name:"shashi",age:20},{name:"preetham",age:21}].befindobject("country","India"); 
//{name: "shashi", age: 20, country: "India"}
//{name: "preetham", age: 21, country: "India"}