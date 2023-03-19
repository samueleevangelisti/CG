var logArr = [];
var logArrLength = 100;
var consolePreElement = document.getElementById('console-pre');

function refreshConsolePreElement() {
  consolePreElement.innerHTML = logArr.join('\n');
  consolePreElement.scrollTop = consolePreElement.scrollHeight;
}

function log(text) {
  logArr.push(` [${new Date().toISOString()}] ${text}`);
  logArr = logArr.slice(-logArrLength);
  refreshConsolePreElement();
}
