
(function() { 
    var f = []; 
    for (var i = 0; i < 100; i++) { 
        f[i] = () => console.log(i); 
    }
    console.log(f);
    f[9]();
    f[8]();
})();

//100
//100
