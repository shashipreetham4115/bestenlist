function getFormvalue(){
    var firstName = document.getElementsByName("fname")[0].value;
    var lastName = document.getElementsByName("lname")[0].value; 
    alert("Name Entered is "+firstName+" "+lastName);
}