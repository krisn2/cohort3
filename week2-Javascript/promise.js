const fs = require('fs');

// //return an object of the promise class
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
    console.log('callback');
}

setTimeoutPromisified(2000).then(readFilePromisified('./data.txt').then(fscallback)); // syntactically clean 





// read a file fn which take a file path as parameter and 
// return promise
function readFilePromisified(path) {

    // Create a promise object which take a callback function.
    const result = new Promise((callbackfn, reject) => {
        fs.readFile(path,'utf-8',(err, data) => {
            if (err) {
                reject(err);
            } else {
                callbackfn(data);
            }
        });
    });
    return result;
}




function fscallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toString());
    }
}


class Promise2 {
    constructor (fn) {
        function afterDone () {
            this.resolve()
        }
        fn(afterDone)
    }

    then(callback){
        this.resolve = callback;
    }
}


function readTheFile(resolve){
    setTimeout(function() {
        console.log('read file');
        resolve();
    },2000);
}


function setTimeoutPromisified2() {
    return new Promise2(readTheFile);
}

setTimeoutPromisified2().then(callback);
