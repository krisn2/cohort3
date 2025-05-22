const { resolve } = require("path");


function wait(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}


async function callwait() {
 console.log('waiting');
 await wait(2000);
 console.log('done');
}

callwait();