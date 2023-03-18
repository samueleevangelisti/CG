////////////////////////////// global variables //////////////////////////////

// canvas
var canvas;
// contesto grafico
var gl;

// matrice dei vertici
var vertexMatrix;
// matrice dei colori
var colorMatrix;
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
// view matrix e model matrix
var vMMatrix;

// shader program
var shaderProgram;
// XXX TODO DSE
var vertexBuffer;
// XXX TODO DSE
var shaderVertexPosition;
// projection matrix nello shader program
var shaderPMatrix;
// view matrix e model matrix nello shader program
var shaderVMMatrix;
// XXX TODO DSE
var colorBuffer;
// XXX TODO DSE
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

function rotateThetaButtonOnClick(direction) {
  theta = (theta + (direction * degToRad(angleDelta))) % degToRad(360);
  render();
}

function rotatePhiButtonOnClick(direction) {
  // XXX TODO DSE per il momento è limitato tra 1 e 179, successivamente bisogna rendere consona la trasformazione
  phi += (direction * degToRad(angleDelta));
  if(phi > degToRad(179)) {
    phi = degToRad(179);
  } else if(phi < degToRad(1)) {
    phi = degToRad(1);
  }
  render();
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

vertexMatrix = [
  [ 0.5, -0.5, -0.5, 1.0],
  [ 0.5, -0.5,  0.5, 1.0],
  [ 0.5,  0.5,  0.5, 1.0],
  [ 0.5,  0.5, -0.5, 1.0],
  [-0.5, -0.5, -0.5, 1.0],
  [-0.5, -0.5,  0.5, 1.0],
  [-0.5,  0.5,  0.5, 1.0],
  [-0.5,  0.5, -0.5, 1.0]
];

colorMatrix = [
  [0.0, 0.0, 0.0, 0.5,], // black
  [1.0, 0.0, 0.0, 0.5,], // red
  [1.0, 1.0, 0.0, 0.5,], // yellow
  [0.0, 1.0, 0.0, 0.5,], // green
  [0.0, 0.0, 1.0, 0.5,], // blue
  [1.0, 0.0, 1.0, 0.5,], // magenta
  [0.0, 1.0, 1.0, 0.5,], // cyan
  [1.0, 1.0, 1.0, 0.5,]  // white
];

// creazione di un quadrato
function quad(a, b, c, d) {
  vertexArr.push(vertexMatrix[a]); 
  colorArr.push(colorMatrix[a]); 
  vertexArr.push(vertexMatrix[b]); 
  colorArr.push(colorMatrix[a]); 
  vertexArr.push(vertexMatrix[c]); 
  colorArr.push(colorMatrix[a]);     
  vertexArr.push(vertexMatrix[a]); 
  colorArr.push(colorMatrix[a]); 
  vertexArr.push(vertexMatrix[c]); 
  colorArr.push(colorMatrix[a]); 
  vertexArr.push(vertexMatrix[d]); 
  colorArr.push(colorMatrix[a]);  
}

// creazione del cubo
function colorCube(){
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

colorCube();

// asse x
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([1.0, 0.0, 0.0, 1.0]);
colorArr.push([1.0, 0.0, 0.0, 1.0,]);
colorArr.push([1.0, 0.0, 0.0, 1.0,]);

// asse y
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([0.0, 1.0, 0.0, 1.0]);
colorArr.push([0.0, 1.0, 0.0, 1.0,]);
colorArr.push([0.0, 1.0, 0.0, 1.0,]);

// asse z
vertexArr.push([0.0, 0.0, 0.0, 1.0]);
vertexArr.push([0.0, 0.0, 1.0, 1.0]);
colorArr.push([0.0, 0.0, 1.0, 1.0,]);
colorArr.push([0.0, 0.0, 1.0, 1.0,]);

// tipizzazione array tramite m4.js
vertexArr = m4.flatten(vertexArr);
colorArr = m4.flatten(colorArr);

////////////////////////////// inizializzazione vista //////////////////////////////

fovy = degToRad(40);
aspectRatio = canvas.width / canvas.height;
near = 1;
far = 100;

D = 5;
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
shaderVMMatrix = gl.getUniformLocation(shaderProgram, 'VMMatrix');

colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, colorArr, gl.STATIC_DRAW);

shaderVertexColor = gl.getAttribLocation( shaderProgram, 'vertexColor');
gl.vertexAttribPointer(shaderVertexColor, 4, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(shaderVertexColor);

////////////////////////////// rendering //////////////////////////////

var render = function(){
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
    vMMatrix = m4.inverse(cameraMatrix);

    gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
    gl.uniformMatrix4fv(shaderVMMatrix, false, vMMatrix);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
    gl.drawArrays(gl.LINES, 36, 6);
}

render();
