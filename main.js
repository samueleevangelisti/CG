////////////////////////////// inizializzazione contesto grafico //////////////////////////////

globals.canvas = document.getElementById('my-canvas');

globals.gl = globals.canvas.getContext('webgl');
if(!globals.gl) {
  alert('WebGL isn\'t available');
} 
globals.gl.viewport(0, 0, globals.canvas.width, globals.canvas.height);

globals.gl.clearColor(0.9, 0.9, 0.9, 1.0);

// XXX TODO DSE questo bisogna capire cosa voglia dire
// globals.gl.enable(globals.gl.CULL_FACE);
globals.gl.enable(globals.gl.DEPTH_TEST);

////////////////////////////// inizializzazione geometria //////////////////////////////

globals.itemObj = {
  ...globals.itemObj,
  square1: {
    isTexture: false,
    vertexArr: [
      [3, -3, 0, 1], [3, 3, 0, 1], [-3, 3, 0, 1],
      [3, -3, 0, 1], [-3, 3, 0, 1], [-3, -3, 0, 1]
    ],
    colorArr: [
      [0, 0.5, 0, 1], [0, 0.5, 0, 1], [0, 0.5, 0, 1],
      [0, 0.5, 0, 1], [0, 0.5, 0, 1], [0, 0.5, 0, 1]
    ],
    textureArr: [
      [0, 1], [1, 1], [1, 0],
      [0, 1], [1, 0], [0, 0]
    ]
  },
  cube1: {
    isTexture: false,
    vertexArr: [
      [1, -1, 0.001, 1], [1, 1, 0.001, 1], [-1, 1, 0.001, 1], [1, -1, 0.001, 1], [-1, 1, 0.001, 1], [-1, -1, 0.001, 1],
      [1, -1, 0.001, 1], [1, 1, 0.001, 1], [1, 1, 1, 1], [1, -1, 0.001, 1], [1, 1, 1, 1], [1, -1, 1, 1],
      [-1, -1, 0.001, 1], [1, -1, 0.001, 1], [1, -1, 1, 1], [-1, -1, 0.001, 1], [1, -1, 1, 1], [-1, -1, 1, 1],
      [-1, 1, 0.001, 1], [-1, -1, 0.001, 1], [-1, -1, 1, 1], [-1, 1, 0.001, 1], [-1, -1, 1, 1], [-1, 1, 1, 1],
      [1, 1, 0.001, 1], [-1, 1, 0.001, 1], [-1, 1, 1, 1], [1, 1, 0.001, 1], [-1, 1, 1, 1], [1, 1, 1, 1],
      [1, -1, 1, 1], [1, 1, 1, 1], [-1, 1, 1, 1], [1, -1, 1, 1], [-1, 1, 1, 1], [-1, -1, 1, 1],
    ],
    colorArr: [
      ...new Array(6).fill([1, 0, 0, 1]),
      ...new Array(6).fill([0, 1, 0, 1]),
      ...new Array(6).fill([0, 0, 1, 1]),
      ...new Array(6).fill([0, 1, 0, 1]),
      ...new Array(6).fill([0, 0, 1, 1]),
      ...new Array(6).fill([1, 0, 0, 1])
    ],
    textureArr: new Array(36).fill([0, 0])
  }
};

Object.entries(globals.itemObj).forEach(([key, value]) => {
  // TODO DSE forse si potrebbe riuscire a calcolare le normali con il metodo di gouraud
  value.normalArr = value.vertexArr.map((vertex, index) => {
    let relativeIndex = index % 3;
    let vertex1 = value.vertexArr[index - relativeIndex];
    let vertex2 = value.vertexArr[index - relativeIndex + 1];
    let vertex3  = value.vertexArr[index - relativeIndex + 2];
    let t1 = m4.subtractVectors(vertex2, vertex1);
    let t2 = m4.subtractVectors(vertex3, vertex2);
    let normal = m4.cross(t1, t2);
    return normal;
  });
  value.center = center(value.vertexArr);
  value.vertexArrStart = globals.vertexArr.length;
  globals.vertexArr = [
    ...globals.vertexArr,
    ...value.vertexArr
  ];
  globals.normalArr = [
    ...globals.normalArr,
    ...value.normalArr
  ];
  globals.colorArr = [
    ...globals.colorArr,
    ...value.colorArr
  ];
  globals.textureArr = [
    ...globals.textureArr,
    ...value.textureArr
  ];
  value.vertexArrStop = globals.vertexArr.length;
});

// tipizzazione array tramite m4.js
globals.vertexArr = m4.flatten(globals.vertexArr);
globals.normalArr = m4.flatten(globals.normalArr);
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

shaderIsTexture = globals.gl.getUniformLocation(shaderProgram, 'isTexture');
shaderTexture = globals.gl.getUniformLocation(shaderProgram, 'texture');

texture = globals.gl.createTexture();
globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, 1, 1, 0, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
let image = new Image();
image.src = 'resources/grass.avif';
image.addEventListener('load', (event) => {
  globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
  globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, image);
  if(isPowerOf2(image.width) && isPowerOf2(image.height)) {
    globals.gl.generateMipmap(globals.gl.TEXTURE_2D);
  } else {
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
  let pMatrix = m4.perspective(fovy, aspectRatio, near, far);

  setCameraPosition([
    distance * Math.sin(phi) * Math.cos(theta), 
    distance * Math.sin(phi) * Math.sin(theta),
    distance * Math.cos(phi)
  ]);

  // calcolo della posizione della camera tramite m4.js
  let cameraMatrix = m4.lookAt(cameraPosition, target, viewUp);
  // calcolo della matrice V dalla matrice della camera tramite m4.js
  let vMatrix = m4.inverse(cameraMatrix);

  // matrice M inizialmente come identità
  let mMatrix = m4.identity();

  globals.gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
  globals.gl.uniformMatrix4fv(shaderVMatrix, false, vMatrix);
  globals.gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

  globals.gl.uniform1i(shaderIsTexture, false);
  globals.gl.uniform1i(shaderTexture, 0);

  globals.gl.drawArrays(globals.gl.LINES, 0, 6);

  // TODO DSE riabilitare questo passaggio
  Object.entries(globals.itemObj).forEach(([key, value]) => {
    // model matrix identità tramite m4.js
    mMatrix = m4.identity();
    mMatrix = m4.translate(mMatrix, value.center[0], value.center[1], value.center[2])
    mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
    mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
    mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
    mMatrix = m4.translate(mMatrix, -value.center[0], -value.center[1], -value.center[2])

    globals.gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);

    globals.gl.uniform1i(shaderIsTexture, value.isTexture);

    // disegna l'ogetto
    globals.gl.drawArrays(globals.gl.TRIANGLES, value.vertexArrStart, value.vertexArrStop - value.vertexArrStart);
  });

  requestAnimationFrame(render);
}

render(0);
