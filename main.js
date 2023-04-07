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
      [1, -1, 0, 1], [1, 1, 0, 1], [1, 1, 1, 1],
      [1, -1, 0, 1], [1, 1, 1, 1], [1, -1, 1, 1],
      [-1, -1, 0, 1], [1, -1, 0, 1], [1, -1, 1, 1],
      [-1, -1, 0, 1], [1, -1, 1, 1], [-1, -1, 1, 1],
      [-1, 1, 0, 1], [-1, -1, 0, 1], [-1, -1, 1, 1],
      [-1, 1, 0, 1], [-1, -1, 1, 1], [-1, 1, 1, 1],
      [1, 1, 0, 1], [-1, 1, 0, 1], [-1, 1, 1, 1],
      [1, 1, 0, 1], [-1, 1, 1, 1], [1, 1, 1, 1],
      [1, -1, 1, 1], [1, 1, 1, 1], [-1, 1, 1, 1],
      [1, -1, 1, 1], [-1, 1, 1, 1], [-1, -1, 1, 1]
    ],
    colorArr: [
      ...new Array(6).fill([0, 1, 0, 1]),
      ...new Array(6).fill([0, 0, 1, 1]),
      ...new Array(6).fill([0, 1, 0, 1]),
      ...new Array(6).fill([0, 0, 1, 1]),
      ...new Array(6).fill([1, 0, 0, 1])
    ],
    textureArr: new Array(6).fill([0, 0])
  }
};

Object.entries(globals.itemObj).forEach(([key, value]) => {
  value.surfaceNormalArr = value.vertexArr.map((vertex, index) => {
    let relativeIndex = index % 3;
    let vertex1 = value.vertexArr[index - relativeIndex];
    let vertex2 = value.vertexArr[index - relativeIndex + 1];
    let vertex3  = value.vertexArr[index - relativeIndex + 2];
    let t1 = m4.subtractVectors(vertex2, vertex1);
    let t2 = m4.subtractVectors(vertex3, vertex2);
    let normal = m4.normalize(m4.cross(t1, t2));
    return normal;
  });
  value.normalArr = new Array(value.surfaceNormalArr.length).fill(null);
  value.vertexArr.forEach((vertex) => {
    indexBoolArr = value.vertexArr.map((vertex1) => {
      return vertex1[0] == vertex[0] && vertex1[1] == vertex[1] && vertex1[2] == vertex[2] && vertex1[3] == vertex[3];
    });
    let normal = m4.normalize(indexBoolArr.reduce((surfaceNormalArr, indexBool, index) => {
      return [
        ...surfaceNormalArr,
        ...(indexBool && surfaceNormalArr.every((surfaceNormal) => {
          return surfaceNormal[0] != value.surfaceNormalArr[index][0] || surfaceNormal[1] != value.surfaceNormalArr[index][1] || surfaceNormal[2] != value.surfaceNormalArr[index][2];
        }) ? [value.surfaceNormalArr[index]] : [])
      ];
    }, []).reduce((total, surfaceNormal) => {
      return m4.addVectors(total, surfaceNormal);
    }, [0, 0, 0]));
    indexBoolArr.forEach((indexBool, index) => {
      if(indexBool) {
        value.normalArr[index] = normal;
      }
    });
  });

  value.center = center(value.vertexArr);
  value.vertexArrStart = globals.vertexArr.length;
  globals.vertexArr = [
    ...globals.vertexArr,
    ...value.vertexArr
  ];
  globals.surfaceNormalArr = [
    ...globals.surfaceNormalArr,
    ...value.surfaceNormalArr
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
globals.surfaceNormalArr = m4.flatten(globals.surfaceNormalArr);
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

setLightAmbient([1, 1, 1, 1])

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

surfaceNormalBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, surfaceNormalBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.surfaceNormalArr, globals.gl.STATIC_DRAW);

shaderVertexSurfaceNormal = globals.gl.getAttribLocation(shaderProgram, 'vertexSurfaceNormal');
globals.gl.vertexAttribPointer(shaderVertexSurfaceNormal, 3, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexSurfaceNormal);

normalBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, normalBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.normalArr, globals.gl.STATIC_DRAW);

shaderVertexNormal = globals.gl.getAttribLocation(shaderProgram, 'vertexNormal');
globals.gl.vertexAttribPointer(shaderVertexNormal, 3, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(shaderVertexNormal);

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

shaderIsLight = globals.gl.getUniformLocation(shaderProgram, 'isLight');
shaderCameraPosition = globals.gl.getUniformLocation(shaderProgram, 'cameraPosition');
shaderPMatrix = globals.gl.getUniformLocation(shaderProgram, 'PMatrix');
shaderVMatrix = globals.gl.getUniformLocation(shaderProgram, 'VMatrix');
shaderMMatrix = globals.gl.getUniformLocation(shaderProgram, 'MMatrix');
shaderLightPosition = globals.gl.getUniformLocation(shaderProgram, 'lightPosition');
shaderMaterialAmbient = globals.gl.getUniformLocation(shaderProgram, 'materialAmbient');
shaderLightAmbient = globals.gl.getUniformLocation(shaderProgram, 'lightAmbient');
shaderMaterialDiffuse = globals.gl.getUniformLocation(shaderProgram, 'materialDiffuse');
shaderLightDiffuse = globals.gl.getUniformLocation(shaderProgram, 'lightDiffuse');
shaderMaterialSpecular = globals.gl.getUniformLocation(shaderProgram, 'materialSpecular');

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
    distance * Math.cos(theta) * Math.sin(phi), 
    distance * Math.sin(theta) * Math.sin(phi),
    distance * Math.cos(phi)
  ]);

  // calcolo della posizione della camera tramite m4.js
  let cameraMatrix = m4.lookAt(cameraPosition, target, viewUp);
  // calcolo della matrice V dalla matrice della camera tramite m4.js
  let vMatrix = m4.inverse(cameraMatrix);

  // matrice M inizialmente come identità
  let mMatrix = m4.identity();

  globals.gl.uniform1i(shaderIsLight, false);
  globals.gl.uniform3fv(shaderCameraPosition, cameraPosition);
  globals.gl.uniformMatrix4fv(shaderPMatrix, false, pMatrix);
  globals.gl.uniformMatrix4fv(shaderVMatrix, false, vMatrix);
  globals.gl.uniformMatrix4fv(shaderMMatrix, false, mMatrix);
  globals.gl.uniform3fv(shaderLightPosition, lightPosition);
  globals.gl.uniform4fv(shaderMaterialAmbient, materialAmbient);
  globals.gl.uniform4fv(shaderLightAmbient, lightAmbient);
  globals.gl.uniform4fv(shaderMaterialDiffuse, materialDiffuse);
  globals.gl.uniform4fv(shaderLightDiffuse, lightDiffuse);
  globals.gl.uniform4fv(shaderMaterialSpecular, materialSpecular);

  globals.gl.uniform1i(shaderIsTexture, false);
  globals.gl.uniform1i(shaderTexture, 0);

  globals.gl.drawArrays(globals.gl.LINES, 0, 6);

  globals.gl.uniform1i(shaderIsLight, true);

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
