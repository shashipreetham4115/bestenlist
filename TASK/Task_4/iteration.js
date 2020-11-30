function iteration(){
    var i = 1;
    while(i<=100){
            if(i%3==0)
                console.log("bestenlist")
            else if(i%5==0)
                console.log("react")
            else if(i%5==0 && i%3==0)
                console.log("bestenlistreact")
            else
                console.log(i)
                i++
    }
}
iteration()