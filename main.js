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

vertexObj = {
  O: [0, 0, 0, 1],
  A: [0, 0, 0, 1],
  B: [1, 0, 0, 1],
  C: [1, 1, 0, 1],
  D: [0, 1, 0, 1],
  A1: [0, 0, 1, 1],
  B1: [1, 0, 1, 1],
  C1: [1, 1, 1, 1],
  D1: [0, 1, 1, 1]
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

// XXX TODO DSE bisogna avere la possibilità di disegnare figure tridimensionali arbitrarie
itemObj = {};

vertexArr = [];
colorArr = [];

axis(vertexObj.O, 'red', 'green', 'blue', 3);
colorCube('cube1', vertexObj.A, vertexObj.B, vertexObj.C, vertexObj.D, vertexObj.A1, vertexObj.B1, vertexObj.C1, vertexObj.D1, 'magenta05', 'cyan05', 'red05', 'green05', 'blue05', 'yellow05');

// tipizzazione array tramite m4.js
vertexArr = m4.flatten(vertexArr);
colorArr = m4.flatten(colorArr);

////////////////////////////// inizializzazione vista //////////////////////////////

setFovy(40);
aspectRatio = canvas.width / canvas.height;
setNear(1);
setFar(100);

setDistance(10);
setTheta(30);
setPhi(60);
setTarget([0, 0, 0]);
setViewUp([0, 0, 1]);

setYRotationAngle('cube1', 0);
setZRotationAngle('cube1', 0);
setXRotationAngle('cube1', 0);

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

  setCameraPosition([
    distance * Math.sin(phi) * Math.cos(theta), 
    distance * Math.sin(phi) * Math.sin(theta),
    distance * Math.cos(phi)
  ]);

  // calcolo della posizione della camera tramite m4.js
  cameraMatrix = m4.lookAt(cameraPosition, target, viewUp);
  // calcolo della matrice MV dalla matrice della camera tramite m4.js
  vMatrix = m4.inverse(cameraMatrix);

  gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
  gl.uniformMatrix4fv(shaderVMatrix, false, vMatrix);
  gl.uniformMatrix4fv(shaderMMatrix, false, m4.identity());

  gl.drawArrays(gl.LINES, 0, 6);

  Object.entries(itemObj).forEach(([key, value]) => {
    // model matrix identità tramite m4.js
    mMatrix = m4.identity();
    let m = center(value.vertexArr);
    mMatrix = m4.translate(mMatrix, m[0], m[1], m[2])
    mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
    mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
    mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
    mMatrix = m4.translate(mMatrix, -m[0], -m[1], -m[2])

    gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

    gl.drawArrays(gl.LINES, 6, 6);
    gl.drawArrays(gl.TRIANGLES, 12, 36);
  });

  requestAnimationFrame(render);
}

render(0);
