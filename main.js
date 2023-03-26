////////////////////////////// inizializzazione contesto grafico //////////////////////////////

globals.canvas = document.getElementById('my-canvas');

globals.gl = globals.canvas.getContext('webgl');
if(!globals.gl) {
  alert('WebGL isn\'t available');
} 
globals.gl.viewport(0, 0, globals.canvas.width, globals.canvas.height);

globals.gl.clearColor(0.9, 0.9, 0.9, 1.0);

// XXX TODO DSE questo bisogna capire cosa voglia dire
//globals.gl.enable(gl.CULL_FACE,null);
globals.gl.enable(globals.gl.DEPTH_TEST);

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
  D1: [0, 1, 1, 1],
  E: [0, 2, 0, 1],
  F: [1, 2, 0, 1],
  G: [1, 3, 0, 1],
  H: [0, 3, 0, 1],
  E1: [0, 2, 1, 1],
  F1: [1, 2, 1, 1],
  G1: [1, 3, 1, 1],
  H1: [0, 3, 1, 1],
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

vertexArr = [];
colorArr = [];

axis(vertexObj.O, 'red', 'green', 'blue', 3);
colorCube('cube1', vertexObj.A, vertexObj.B, vertexObj.C, vertexObj.D, vertexObj.A1, vertexObj.B1, vertexObj.C1, vertexObj.D1, 'magenta05', 'cyan05', 'red05', 'green05', 'blue05', 'yellow05');
colorCube('cube2', vertexObj.E, vertexObj.F, vertexObj.G, vertexObj.H, vertexObj.E1, vertexObj.F1, vertexObj.G1, vertexObj.H1, 'magenta05', 'cyan05', 'red05', 'green05', 'blue05', 'yellow05');

// tipizzazione array tramite m4.js
vertexArr = m4.flatten(vertexArr);
colorArr = m4.flatten(colorArr);

////////////////////////////// inizializzazione elementi interfaccia //////////////////////////////

Object.keys(globals.itemObj).forEach((key) => {
  document.getElementById('item-accordion').append(graphicUtils.AccordionItem.fromConfigObj({
    itemId: key
  }).element);
});

////////////////////////////// inizializzazione vista //////////////////////////////

setFovy(40);
aspectRatio = globals.canvas.width / globals.canvas.height;
setNear(1);
setFar(100);

setDistance(10);
setTheta(30);
setPhi(60);
setTarget([0, 0, 0]);
setViewUp([0, 0, 1]);

Object.keys(globals.itemObj).forEach((key) => {
  setYRotationAngle(key, 0);
  setZRotationAngle(key, 0);
  setXRotationAngle(key, 0);
})

////////////////////////////// shader program //////////////////////////////

shaderProgram = webglUtils.createProgramFromScripts(globals.gl, ['vertex-shader', 'fragment-shader']);
globals.gl.useProgram(shaderProgram);

vertexBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, vertexBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, vertexArr, globals.gl.STATIC_DRAW);

shaderVertexPosition = globals.gl.getAttribLocation(shaderProgram, 'vertexPosition');
globals.gl.vertexAttribPointer(shaderVertexPosition, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexPosition);

shaderPMatrix = globals.gl.getUniformLocation(shaderProgram, 'PMatrix');
shaderVMatrix = globals.gl.getUniformLocation(shaderProgram, 'VMatrix');
shaderMMatrix = globals.gl.getUniformLocation(shaderProgram, 'MMatrix');

colorBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, colorBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, colorArr, globals.gl.STATIC_DRAW);

shaderVertexColor = globals.gl.getAttribLocation(shaderProgram, 'vertexColor');
globals.gl.vertexAttribPointer(shaderVertexColor, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexColor);

////////////////////////////// rendering //////////////////////////////

function render(time) {
  // conversione da clip space a pixel
  globals.gl.clear(globals.gl.COLOR_BUFFER_BIT | globals.gl.DEPTH_BUFFER_BIT); 

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

  globals.gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
  globals.gl.uniformMatrix4fv(shaderVMatrix, false, vMatrix);
  globals.gl.uniformMatrix4fv(shaderMMatrix, false, m4.identity());

  globals.gl.drawArrays(globals.gl.LINES, 0, 6);

  Object.entries(globals.itemObj).forEach(([key, value]) => {
    // model matrix identità tramite m4.js
    mMatrix = m4.identity();
    let m = center(value.vertexArr);
    mMatrix = m4.translate(mMatrix, m[0], m[1], m[2])
    mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
    mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
    mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
    mMatrix = m4.translate(mMatrix, -m[0], -m[1], -m[2])

    globals.gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

    globals.gl.drawArrays(globals.gl.LINES, value.vertexArrStart, 6);
    globals.gl.drawArrays(globals.gl.TRIANGLES, value.vertexArrStart + 6, 36);
  });

  requestAnimationFrame(render);
}

render(0);
