function signAlert(x,y,z){
     var sign=[];
   if(x[0]=='+' || x[0]=='-')
   sign.push(x[0])
   if(y[0]=='+' || y[0]=='-')
   if(sign[0] != y[0])
   sign.push(y[0])
   if(z[0]=='+' || z[0]=='-')
   if(sign[0] != z[0] && sign[1] !=z[0])
   sign.push(z[0])
   if(sign.length==0)
   alert('Welcome to bestenlist')
   else
   alert("have "+sign )
}
signAlert('+2','+7','+2')
signAlert('-2','-7','-2')
signAlert('+2','7','2')
signAlert('-2','+7','2')
signAlert('+2','+7','2')
signAlert('+2','-7','-2')
signAlert('+2','+7','-2')
signAlert('-2','-7','+2')
signAlert('2','7','2')