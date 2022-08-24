console.log("Pegandos nossos dados")
const async = require("async");
var fs = require('fs');



 
fs.readFile('englishTest.txt', function (err, data) {
    if (err) throw err;
    let array = data.toString().split("\n");
    Promise.all(array.map(url =>
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${array[i]}`).then(resp => resp.text())
    )).then(texts => {
        console.log("Text", texts);
    })
});

// function test(msg, callback) {
//     setTimeout(function () {
//         console.log(msg);
//         callback();
//     }, 2000);
// }
// console.time("Execução normal");
// test("Mundo async!", function () {
//     test("Mundo async!", function () {
//         console.timeEnd("Execução normal");
//     });
// });
// console.time("Execução paralela");


// async.parallel([
//     function (callback) {
//         test("Mundo paralelo!", function () {
//             callback();
//         });
//     },
//     function (callback) {
//         test("Mundo paralelo!", function () {
//             callback();
//         });
//     }
// ], function () {
//     console.timeEnd("Execução paralela");
// });



