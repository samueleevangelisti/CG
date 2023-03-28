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

axis(globals.vertexObj.O, globals.colorObj.red, globals.colorObj.green, globals.colorObj.blue, 3);
// colorCube('cube1', globals.vertexObj.A, globals.vertexObj.B, globals.vertexObj.C, globals.vertexObj.D, globals.vertexObj.A1, globals.vertexObj.B1, globals.vertexObj.C1, globals.vertexObj.D1, globals.colorObj.magenta05, globals.colorObj.cyan05, globals.colorObj.red05, globals.colorObj.green05, globals.colorObj.blue05, globals.colorObj.yellow05);
// colorCube('cube2', globals.vertexObj.E, globals.vertexObj.F, globals.vertexObj.G, globals.vertexObj.H, globals.vertexObj.E1, globals.vertexObj.F1, globals.vertexObj.G1, globals.vertexObj.H1, globals.colorObj.magenta05, globals.colorObj.cyan05, globals.colorObj.red05, globals.colorObj.green05, globals.colorObj.blue05, globals.colorObj.yellow05);

// TODO DSE
globals.vertexArr = [
  ...globals.vertexArr,
  [0, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 1, 1, 1],
  [0, 0, 1, 1]
];

globals.colorArr = [
  ...globals.colorArr,
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 0, 0, 1]
];

globals.textureArr = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0.5],
  [0.25, 0.5],
  [0.25, 0],
  [0, 0.5],
  [0.25, 0],
  [0, 0]
];

// tipizzazione array tramite m4.js
globals.vertexArr = m4.flatten(globals.vertexArr);
globals.colorArr = m4.flatten(globals.colorArr);
globals.textureArr = m4.flatten(globals.textureArr);

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
});

////////////////////////////// shader program //////////////////////////////

shaderProgram = webglUtils.createProgramFromScripts(globals.gl, ['vertex-shader', 'fragment-shader']);
globals.gl.useProgram(shaderProgram);

vertexBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, vertexBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.vertexArr, globals.gl.STATIC_DRAW);

shaderVertexPosition = globals.gl.getAttribLocation(shaderProgram, 'vertexPosition');
globals.gl.vertexAttribPointer(shaderVertexPosition, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexPosition);

colorBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, colorBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.colorArr, globals.gl.STATIC_DRAW);

shaderVertexColor = globals.gl.getAttribLocation(shaderProgram, 'vertexColor');
globals.gl.vertexAttribPointer(shaderVertexColor, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexColor);

textureBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, textureBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.textureArr, globals.gl.STATIC_DRAW);

shaderVertexTexture = globals.gl.getAttribLocation(shaderProgram, 'vertexTexture');
globals.gl.vertexAttribPointer(shaderVertexTexture, 2, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexTexture);

shaderPMatrix = globals.gl.getUniformLocation(shaderProgram, 'PMatrix');
shaderVMatrix = globals.gl.getUniformLocation(shaderProgram, 'VMatrix');
shaderMMatrix = globals.gl.getUniformLocation(shaderProgram, 'MMatrix');

shaderTexture = globals.gl.getUniformLocation(shaderProgram, 'texture');

// XXX TODO DSE controllare se il caricamento avviene correttamente
function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}
var texture = globals.gl.createTexture();
var image = new Image();
image.src = 'resources/noodles.jpg';
image.addEventListener('load', (event) => {
  globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
  globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, image);
  // Check if the image is a power of 2 in both dimensions.
  if(isPowerOf2(image.width) && isPowerOf2(image.height)) {
    // Yes, it's a power of 2. Generate mips.
    globals.gl.generateMipmap(globals.gl.TEXTURE_2D);
//       console.log('mipmap');
  } else {
     // No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
    globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_S, globals.gl.CLAMP_TO_EDGE);
    globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_T, globals.gl.CLAMP_TO_EDGE);
    globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_MIN_FILTER, globals.gl.LINEAR);
  }
});

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

  globals.gl.uniform1i(shaderTexture, 0);

  globals.gl.drawArrays(globals.gl.LINES, 0, 6);

  // TODO DSE riabilitare questo passaggio
  // Object.entries(globals.itemObj).forEach(([key, value]) => {
  //   // model matrix identità tramite m4.js
  //   mMatrix = m4.identity();
  //   let m = center(value.vertexArr);
  //   mMatrix = m4.translate(mMatrix, m[0], m[1], m[2])
  //   mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
  //   mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
  //   mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
  //   mMatrix = m4.translate(mMatrix, -m[0], -m[1], -m[2])

  //   globals.gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

  //   // disegna gli assi dell'oggetto
  //   globals.gl.drawArrays(globals.gl.LINES, value.vertexArrStart, 6);
  //   // disegna l'ogetto
  //   globals.gl.drawArrays(globals.gl.TRIANGLES, value.vertexArrStart + 6, 36);
  // });

  // TODO DSE questo serve solo per i test
  globals.gl.drawArrays(globals.gl.TRIANGLES, 6, 6);

  requestAnimationFrame(render);
}

render(0);
