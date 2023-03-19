////////////////////////////// global variables //////////////////////////////

// canvas
var canvas;
// contesto grafico
var gl;

// vertici
var vertexObj;
// colori
var colorObj;
// array di vertici da passare a webgl
var vertexArr;
// array di colori da passare a webgl
var colorArr;

// campo visivo rispetto all'asse y
var fovy;
// aspect ratio della viewport\
var aspectRatio;
// XXX TODO DSE
var near;
// XXX TODO DSE
var far;
// distanza della camera
var D;
// angolo rispetto all'asse x
var theta;
// angolo rispetto all'asse z
var phi;
// obiettivo della camera
var at;
// vettore view up
var up;

// projection matrix
var pMatrix;
// posizione della camera
var eye;
// matrice della camera
var cameraMatrix;
// view matrix
var vMatrix;
// model matrix
var mMatrix;

// shader program
var shaderProgram;
// vertex buffer
var vertexBuffer;
// vertex position nello shader program
var shaderVertexPosition;
// projection matrix nello shader program
var shaderPMatrix;
// view matrix nello shader program
var shaderVMatrix;
// model matrix nello shader program
var shaderMMatrix;
// color buffer
var colorBuffer;
// vertex color nello shader program
var shaderVertexColor;

////////////////////////////// utility //////////////////////////////

// credit: CG
function degToRad(d) {
  return d * Math.PI / 180;
}

// credit: CG
function radToDeg(r) {
  return r * 180 / Math.PI;
}

////////////////////////////// handlers //////////////////////////////

var interval;
var intervalDelta = 10;
var angleDelta = 1;

function buttonOnMouseDown(fn, paramArr) {
  fn(...paramArr);
  interval = setInterval(fn, intervalDelta, ...paramArr);
}

function buttonOnMouseUp() {
  clearInterval(interval);
}

// XXX TODO DSE estrarre le funzioni di rotazione per rendere più smooth la transizione soprattutto in verticale
function rotateThetaButtonOnClick(direction, delta=angleDelta) {
  theta = (theta + (direction * degToRad(delta))) % degToRad(360);
}

function rotatePhiButtonOnClick(direction, delta=angleDelta) {
  // XXX TODO DSE per il momento è limitato tra 1 e 179, successivamente bisogna rendere consona la trasformazione
  phi += (direction * degToRad(delta));
  if(phi > degToRad(179)) {
    phi = degToRad(179);
  } else if(phi < degToRad(1)) {
    phi = degToRad(1);
  }
}

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
    rotateThetaButtonOnClick(-1, (event.offsetX - mouseDownX) * 180 / canvas.width);
    rotatePhiButtonOnClick(-1, (event.offsetY - mouseDownY) * 180 / canvas.height);
    mouseDownX = event.offsetX;
    mouseDownY = event.offsetY;
  }
}

function canvasOnMouseUp(event) {
  isMouseDown = false;
}

////////////////////////////// inizializzazione contesto grafico //////////////////////////////

canvas = document.getElementById('my-canvas');
gl = canvas.getContext('webgl');
if(!gl) {
  alert('WebGL isn\'t available');
} 
gl.viewport(0, 0, canvas.width, canvas.height);

gl.clearColor(0.9, 0.9, 0.9, 1.0);

// XXX TODO DSE questo bisogna capire cosa voglia dire
//gl.enable(gl.CULL_FACE,null);
gl.enable(gl.DEPTH_TEST);

////////////////////////////// inizializzazione geometria //////////////////////////////

vertexArr = [];

colorArr = [];

vertexObj = {
  A: [1, 1, -1, 1],
  B: [1, -1, -1, 1],
  C: [-1, -1, -1, 1],
  D: [-1, 1, -1, 1],
  A1: [1, 1, 1, 1],
  B1: [1, -1, 1, 1],
  C1: [-1, -1, 1, 1],
  D1: [-1, 1, 1, 1]
};

colorObj = {
  red: [1, 0, 0, 1],
  red05: [1, 0, 0, 0.5],
  green: [0, 1, 0, 1],
  green05: [0, 1, 0, 0.5],
  blue: [0, 0, 1, 1],
  blue05: [0, 0, 1, 0.5],
  yellow05: [1, 1, 0, 0.5],
  magenta05: [1, 0, 1, 0.5],
  cyan05: [0, 1, 1, 0.5]
};

// asse x
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([2.0, 0.0, 0.0, 1.0]);
colorArr.push(colorObj.red);
colorArr.push(colorObj.red);

// asse y
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([0.0, 2.0, 0.0, 1.0]);
colorArr.push(colorObj.green);
colorArr.push(colorObj.green);

// asse z
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([0.0, 0.0, 2.0, 1.0]);
colorArr.push(colorObj.blue);
colorArr.push(colorObj.blue);

// credit: CG [updated] creazione di un quadrato
function quad(a, b, c, d, color) {
  vertexArr.push(vertexObj[a]); 
  colorArr.push(colorObj[color]); 
  vertexArr.push(vertexObj[b]); 
  colorArr.push(colorObj[color]); 
  vertexArr.push(vertexObj[c]); 
  colorArr.push(colorObj[color]);     
  vertexArr.push(vertexObj[a]); 
  colorArr.push(colorObj[color]); 
  vertexArr.push(vertexObj[c]); 
  colorArr.push(colorObj[color]); 
  vertexArr.push(vertexObj[d]); 
  colorArr.push(colorObj[color]);  
}

// credit: CG [updated] creazione del cubo
function colorCube(){
  quad('A', 'B', 'C', 'D', 'magenta05');
  quad('A1', 'B1', 'C1', 'D1', 'cyan05');
}

colorCube();

// tipizzazione array tramite m4.js
vertexArr = m4.flatten(vertexArr);
colorArr = m4.flatten(colorArr);

////////////////////////////// inizializzazione vista //////////////////////////////

fovy = degToRad(40);
aspectRatio = canvas.width / canvas.height;
near = 1;
far = 100;

D = 10;
theta = degToRad(45);
phi = degToRad(45);
at = [0, 0, 0];
up = [0, 0, 1];

////////////////////////////// shader program //////////////////////////////

shaderProgram = webglUtils.createProgramFromScripts(gl, ['vertex-shader', 'fragment-shader']);
gl.useProgram(shaderProgram);

vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexArr, gl.STATIC_DRAW);

shaderVertexPosition = gl.getAttribLocation(shaderProgram, 'vertexPosition');
gl.vertexAttribPointer(shaderVertexPosition, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(shaderVertexPosition);

shaderPMatrix = gl.getUniformLocation(shaderProgram, 'PMatrix');
shaderVMatrix = gl.getUniformLocation(shaderProgram, 'VMatrix');
shaderMMatrix = gl.getUniformLocation(shaderProgram, 'MMatrix');

colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorArr, gl.STATIC_DRAW);

shaderVertexColor = gl.getAttribLocation( shaderProgram, 'vertexColor');
gl.vertexAttribPointer(shaderVertexColor, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(shaderVertexColor);

////////////////////////////// rendering //////////////////////////////

function render(time) {
  // conversione da clip space a pixel
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 

  // calcolo della matrice P tramite m4.js
  pMatrix = m4.perspective(fovy, aspectRatio, near, far);

  eye = [
    D * Math.sin(phi) * Math.cos(theta), 
    D * Math.sin(phi) * Math.sin(theta),
    D * Math.cos(phi)
  ];
  // calcolo della posizione della camera tramite m4.js
  cameraMatrix = m4.lookAt(eye, at, up);
  // calcolo della matrice MV dalla matrice della camera tramite m4.js
  vMatrix = m4.inverse(cameraMatrix);

  // model matrix identità tramite m4.js
  mMatrix = m4.identity();

  gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
  gl.uniformMatrix4fv(shaderVMatrix, false, vMatrix);
  gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

  gl.drawArrays(gl.LINES, 0, 6);
  gl.drawArrays(gl.TRIANGLES, 6, 12);

  requestAnimationFrame(render);
}

render(0);
