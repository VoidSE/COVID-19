(function () {
    var parent = document.getElementById('parent');
    var child1 = document.getElementById('child1');
    var child2 = document.getElementById('child2');
    child2.innerHTML = child1.innerHTML;

    setInterval(function () {
       if(parent.scrollTop >= child1.scrollHeight) {
           parent.scrollTop = 0;
       } else {
           parent.scrollTop++;
       }
    }, 40);

})()