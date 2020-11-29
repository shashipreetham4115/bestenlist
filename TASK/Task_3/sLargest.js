function sLargest(arr){
    arr.sort(function(a, b){
        return a - b;
    });
    console.log(arr[arr.length-2]);
}
console.log(sLargest([1,5,12,3,7,15,9])) // 12
console.log(sLargest([4,6,3,2,1,5])) // 5