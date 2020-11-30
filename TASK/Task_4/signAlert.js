function signAlert(x,y,z){
   var a = x.substring(0,1);
   var b = y.substring(0,1); 
   var c = z.substring(0,1);
  
  if((a && b && c)=='+')
  alert('have  + sign')
  else if((a && b && c)=='-')
  alert('have  - sign')
  else if((a || b || c)=='+')
  alert('have  + sign')
  else if((a || b || c)=='-')
  alert('have  - sign')
  else if((a || b || c)=='+' && (a||b||c)=='-')
  alert('have both + and - signs')
  else
  alert('Welcome to bestenlist')
}