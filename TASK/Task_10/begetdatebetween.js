String.prototype.begetdatebetween = function(){
    var s=this.split(",")[0];
    var sd = new Date(""+s.split("/")[2]+"/"+s.split("/")[1]+"/"+s.split("/")[0]+"");
    var e=this.split(",")[1];
    var end=new Date(""+e.split("/")[2]+"/"+e.split("/")[1]+"/"+e.split("/")[0]+"");
    var ed = end.setDate(end.getDate()-1);
     var arr = [];
    while(sd < ed){
     sd.setDate(sd.getDate()+1); 
     new Date(sd);
     arr.push(sd.getDate()+"/"+(sd.getMonth()+1)+"/"+sd.getFullYear());
    }
 return arr
};
"02/11/2020,04/11/2021".begetdatebetween();
// 03/11/2020