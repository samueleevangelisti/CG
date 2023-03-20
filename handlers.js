var interval;
var deltaInterval = 10;
var deltaAngle = 1;
var deltaDistance = 0.5;

function buttonOnMouseDown(fn, paramArr) {
  fn(...paramArr);
  interval = setInterval(fn, deltaInterval, ...paramArr);
}

function buttonOnMouseUp() {
  clearInterval(interval);
}

function fovyButtonOnClick(direction) {
  changeFovy(direction * deltaAngle);
}

function nearButtonOnClick(direction) {
  changeNear(direction * deltaDistance);
}

function farButtonOnClick(direction) {
  changeFar(direction * deltaDistance);
}

function thetaButtonOnClick(direction) {
  changeTheta(direction * deltaAngle);
}

function phiButtonOnClick(direction) {
  changePhi(direction * deltaAngle);
}

function targetXButtonOnClick(direction) {
  changeTarget([direction * deltaDistance, 0, 0]);
}

function targetYButtonOnClick(direction) {
  changeTarget([0, direction * deltaDistance, 0]);
}

function targetZButtonOnClick(direction) {
  changeTarget([0, 0, direction * deltaDistance]);
}

function distanceButtonOnClick(direction) {
  changeDistance(direction * deltaDistance);
}

function yRotationButtonOnClick(direction) {
  changeYRotationAngle(direction * deltaAngle);
}

function zRotationButtonOnClick(direction) {
  changeZRotationAngle(direction * deltaAngle);
}

function xRotationButtonOnClick(direction) {
  changeXRotationAngle(direction * deltaAngle);
}

////////////////////////////////////////////////////////////

var isMouseDown = false;
var mouseDownX;
var mouseDownY;

function canvasOnMouseDown(event) {
  isMouseDown = true;
  mouseDownX = event.offsetX;
  mouseDownY = event.offsetY;
}

function canvasOnMouseMove(event) {
  if(isMouseDown) {
    changeTheta(-(event.offsetX - mouseDownX) * 180 / canvas.width);
    changePhi(-(event.offsetY - mouseDownY) * 180 / canvas.height);
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
  }
}

function canvasOnMouseUp(event) {
  isMouseDown = false;
}

function canvasOnMouseWheel(event) {
  changeDistance((event.deltaY > 0 ? 1 : -1) * deltaDistance);
}
