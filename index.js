const fs = require('fs');
const request = require('request');
const colors = require('colors');
const moment = require('moment');
const prompt = require('prompt-sync')();

console.clear();
banner();

var fileNameToRead = prompt('Enter file name (proxy.txt): '.cyan) || "proxy.txt";
var maxTimeToWait = prompt('Maximum time to wait for response (5000) : '.cyan) || "5000";
var domain = "http://raw.githubusercontent.com/7ORP3DO/proxy-checker/master/proxy.txt";
var fileNameToSaveProxy = `results/${moment().format("YYYYMMDDHHmmssS")}.txt`;

fs.access(fileNameToRead, fs.F_OK, (err) => {
    if (err) {
        console.log(`No ${fileNameToRead} file found!`.brightRed);
        process.exit();
    } else {
        var proxys = fs.readFileSync(fileNameToRead, 'utf8');
        var proxyList = proxys.split('\n');
        fs.openSync(fileNameToSaveProxy, 'a');

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
                    fs.appendFileSync(fileNameToSaveProxy, `${proxy}\n`);
                }
            });
        });
    };
});

function banner() {
    console.log("        _               _    _____                                ");
    console.log("       | |             | |  |  __ \\                              ");
    console.log("    ___| |__   ___  ___| | _| |__) | __ _____  ___   _            ");
    console.log("   / __| '_ \\ / _ \\/ __| |/ /  ___/ '__/ _ \\ \\/ / | | |       ");
    console.log("  | (__| | | |  __/ (__|   <| |   | | | (_) >  <| |_| |           ");
    console.log("   \\___|_| |_|\\___|\\___|_|\\_\\_|   |_|  \\___/_/\\_\\\\__, |  ");
    console.log("                                                  __/ |           ");
    console.log("                                                 |___/            ");
    console.log("                A Simple HTTP Proxy Checker                        ");
    console.log("        Github: https://github.com/7ORP3DO/checkProxy             ");
    console.log("\n\n");
}