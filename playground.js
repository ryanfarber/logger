let a = function (txt) {

    console.log(a.buffer + txt);
    a.buffer = 'booper'
}

// a.buffer = '';

Object.defineProperty(a,'b',{
    get: function(){
        this.buffer += '<B>';
        return this
    }
});

Object.defineProperty(a,'c',{
    get: function(){
        this.buffer += '<C>';
        return this
    }
}); 

Object.defineProperty(a,'d',{
    get: function(){
        this.buffer += '<D>';
        return this
    }
});

a.b.c.b.b.d("hey")