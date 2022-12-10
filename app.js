'use strict';
//https://raw.githubusercontent.com/IluhaTheProrammer/TestFiles/main/download.jpg
console.log('Downloader JSlave by Iluha v1.0');

const prompt = require('prompt-sync')({ sigint: true });

var http = require('https');
var fs = require('fs');
const PromptSync = require('prompt-sync');

var result =function (error){
    if (error) {
        console.log(`Oh shit, I'm sorry! A error occured: ${error.message}`);
    }
    else {
        console.log('Take it, Boy!');
    }
    prompt("Thank you, Sir!");
}

var download = function (url, dest, cb) {
    try {
        var file = fs.createWriteStream(dest);
        file.on('error', err => { fs.unlink(dest); if (cb) cb(err) });
        file.on('finish', () => { file.close(cb) });

        var request = http.get(url, responce => {
            responce.pipe(file);
            responce.on("error", err => { fs.unlink(dest); cb(err) });
        }).on('error', err => { // Handle errors
            fs.unlink(dest); // Delete the file async. (But we don't check the result)
            if (cb) cb(err);
        });
    }
    catch (err) {
        cb(err);
        fs.unlink(dest);
    }
};

console.log('Where should I put the file, Master?');
var path = prompt('> ');

console.log("What's the adress, Boss?");
var url = prompt('> ');

download(url, path, result);

