Array.prototype.beremoveobject = function (property){
	
	this.forEach((item) => {
		delete item[property]
	});
	return this
};
[{name: "shashi", age: 20, country: "India"},
{name: "preetham", age: 21, country: "India"}].beremoveobject("country"); 
//{name: "shashi", age: 20}
//{name: "preetham", age: 21}