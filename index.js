const fs = require('fs');
const request = require('request');
const colors = require('colors');
const prompt = require('prompt-sync')();

console.clear();

var fileNameToRead = prompt('Enter file name (proxy.txt): '.cyan) || "proxy.txt";
var fileNameToSaveWorkingProxy = "WorkingProxy.txt";
var fileNameToSaveDieProxy = "DieProxy.txt";
var maxTimeToWait = prompt('Maximum time to wait for response (5000) : '.cyan) || "5000";
var domain = prompt('custom domain to Test proxy : '.cyan) || "http://raw.githubusercontent.com/7ORP3DO/proxy-checker/master/proxy.txt";


fs.access(fileNameToRead, fs.F_OK, (err) => {
    if (err) {
        console.log(`No ${fileNameToRead} file found!`.brightRed);
        process.exit();
    } else {
        var proxys = fs.readFileSync(fileNameToRead, 'utf8');
        var proxyList = proxys.split('\n');

        proxyList.forEach(proxy => {
            request({
                url: domain,
                timeout: maxTimeToWait,
                proxy: `http://${proxy}`
            }, function (error, response, body) {

                if (error) {
                    console.log(`[-] ${proxy}`.brightRed);
                } else {
                    console.log(`[+] ${proxy}`.green);
                }
            });
        });
    };
});