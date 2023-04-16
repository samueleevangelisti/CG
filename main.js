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

globals.textureUnitArr = [
  globals.gl.TEXTURE0,
  globals.gl.TEXTURE1,
  globals.gl.TEXTURE2,
  globals.gl.TEXTURE3,
  globals.gl.TEXTURE4,
  globals.gl.TEXTURE5,
  globals.gl.TEXTURE6,
  globals.gl.TEXTURE7,
  globals.gl.TEXTURE8,
  globals.gl.TEXTURE9
];

////////////////////////////// inizializzazione geometria //////////////////////////////

globals.textureObj = {
  grass: {
    src: 'resources/grass.avif'
  },
  gioconda: {
    src: 'resources/gioconda.jpg'
  }
};

Object.values(globals.textureObj).forEach((value, index) => {
  value.index = index;
  let texture = globals.gl.createTexture();
  globals.gl.activeTexture(globals.textureUnitArr[index]);
  globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
  globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, 1, 1, 0, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
  let image = new Image();
  image.addEventListener('load', (event) => {
    globals.gl.activeTexture(globals.textureUnitArr[index]);
    globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
    globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, image);
    if(utils.isPowerOf2(image.width) && utils.isPowerOf2(image.height)) {
      globals.gl.generateMipmap(globals.gl.TEXTURE_2D);
    } else {
      globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_S, globals.gl.CLAMP_TO_EDGE);
      globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_T, globals.gl.CLAMP_TO_EDGE);
      globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_MIN_FILTER, globals.gl.LINEAR);
    }
  });
  image.src = value.src;
});

// TODO DSE gli attributi degli oggetti dovrebbero essere impostabili da interfaccia
globals.itemObj = {
  ...globals.itemObj,
  square1: {
    isFlat: true,
    isTexture: true,
    texture: globals.textureObj.grass.index,
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
    isFlat: true,
    isTexture: false,
    texture: 0,
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

Object.values(globals.itemObj).forEach((value) => {
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

  value.center = utils.center(value.vertexArr);
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
var aspectRatio = globals.canvas.width / globals.canvas.height;
setNear(1);
setFar(100);

setDistance(10);
setTheta(30);
setPhi(60);
setTarget([0, 0, 0]);
setViewUp([0, 0, 1]);

setLightPosition([5, 5, 5]);
setMaterialAmbient([0.02, 0.02, 0.02, 1]);
setLightAmbient([1, 1, 1, 1]);
setMaterialDiffuse([0.4, 0.4, 0.4, 1]);
setMaterialSpecular([0.774597, 0.774597, 0.774597, 1]);
setLightSpecular([1, 1, 1, 1]);
setShininess(100);

Object.keys(globals.itemObj).forEach((key) => {
  setYRotationAngle(key, 0);
  setZRotationAngle(key, 0);
  setXRotationAngle(key, 0);
});

////////////////////////////// shader program //////////////////////////////

globals.shaderProgram = webglUtils.createProgramFromScripts(globals.gl, ['vertex-shader', 'fragment-shader']);
globals.gl.useProgram(globals.shaderProgram);

globals.vertexBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.vertexBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.vertexArr, globals.gl.STATIC_DRAW);

globals.shaderVertexPosition = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexPosition');
globals.gl.vertexAttribPointer(globals.shaderVertexPosition, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(globals.shaderVertexPosition);

globals.surfaceNormalBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.surfaceNormalBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.surfaceNormalArr, globals.gl.STATIC_DRAW);

globals.shaderVertexSurfaceNormal = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexSurfaceNormal');
globals.gl.vertexAttribPointer(globals.shaderVertexSurfaceNormal, 3, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(globals.shaderVertexSurfaceNormal);

globals.normalBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.normalBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.normalArr, globals.gl.STATIC_DRAW);

globals.shaderVertexNormal = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexNormal');
globals.gl.vertexAttribPointer(globals.shaderVertexNormal, 3, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(globals.shaderVertexNormal);

globals.colorBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.colorBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.colorArr, globals.gl.STATIC_DRAW);

globals.shaderVertexColor = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexColor');
globals.gl.vertexAttribPointer(globals.shaderVertexColor, 4, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(globals.shaderVertexColor);

globals.textureBuffer = globals.gl.createBuffer();
globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.textureBuffer);
globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.textureArr, globals.gl.STATIC_DRAW);

globals.shaderVertexTexture = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexTexture');
globals.gl.vertexAttribPointer(globals.shaderVertexTexture, 2, globals.gl.FLOAT, false, 0, 0);
globals.gl.enableVertexAttribArray(globals.shaderVertexTexture);

globals.shaderIsFlat = globals.gl.getUniformLocation(globals.shaderProgram, 'isFlat');
globals.shaderCameraPosition = globals.gl.getUniformLocation(globals.shaderProgram, 'cameraPosition');
globals.shaderPMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'PMatrix');
globals.shaderVMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'VMatrix');
globals.shaderMMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'MMatrix');
globals.shaderLightPosition = globals.gl.getUniformLocation(globals.shaderProgram, 'lightPosition');
globals.shaderMaterialAmbient = globals.gl.getUniformLocation(globals.shaderProgram, 'materialAmbient');
globals.shaderLightAmbient = globals.gl.getUniformLocation(globals.shaderProgram, 'lightAmbient');
globals.shaderMaterialDiffuse = globals.gl.getUniformLocation(globals.shaderProgram, 'materialDiffuse');
shaderMaterialSpecular = globals.gl.getUniformLocation(globals.shaderProgram, 'materialSpecular');
globals.shaderLightSpecular = globals.gl.getUniformLocation(globals.shaderProgram, 'lightSpecular');
globals.shaderShininess = globals.gl.getUniformLocation(globals.shaderProgram, 'shininess');

globals.shaderIsTexture = globals.gl.getUniformLocation(globals.shaderProgram, 'isTexture');
globals.shaderIsLight = globals.gl.getUniformLocation(globals.shaderProgram, 'isLight');
globals.shaderTexture = globals.gl.getUniformLocation(globals.shaderProgram, 'texture');

////////////////////////////// rendering //////////////////////////////

function render(time) {
  // conversione da clip space a pixel
  globals.gl.clear(globals.gl.COLOR_BUFFER_BIT | globals.gl.DEPTH_BUFFER_BIT); 

  // calcolo della matrice P tramite m4.js
  let pMatrix = m4.perspective(globals.fovy, aspectRatio, globals.near, globals.far);

  setCameraPosition([
    distance * Math.cos(globals.theta) * Math.sin(globals.phi), 
    distance * Math.sin(globals.theta) * Math.sin(globals.phi),
    distance * Math.cos(globals.phi)
  ]);

  // calcolo della posizione della camera tramite m4.js
  let cameraMatrix = m4.lookAt(globals.cameraPosition, globals.target, globals.viewUp);
  // calcolo della matrice V dalla matrice della camera tramite m4.js
  let vMatrix = m4.inverse(cameraMatrix);

  // matrice M inizialmente come identità
  let mMatrix = m4.identity();

  globals.gl.uniform3fv(globals.shaderCameraPosition, globals.cameraPosition);
  globals.gl.uniformMatrix4fv(globals.shaderPMatrix, false, pMatrix);
  globals.gl.uniformMatrix4fv(globals.shaderVMatrix, false, vMatrix);
  globals.gl.uniformMatrix4fv(globals.shaderMMatrix, false, mMatrix);
  globals.gl.uniform3fv(globals.shaderLightPosition, globals.lightPosition);
  globals.gl.uniform4fv(globals.shaderMaterialAmbient, globals.materialAmbient);
  globals.gl.uniform4fv(globals.shaderLightAmbient, globals.lightAmbient);
  globals.gl.uniform4fv(globals.shaderMaterialDiffuse, globals.materialDiffuse);
  globals.gl.uniform4fv(shaderMaterialSpecular, globals.materialSpecular);
  globals.gl.uniform4fv(globals.shaderLightSpecular, globals.lightSpecular);
  globals.gl.uniform1f(globals.shaderShininess, globals.shininess);

  globals.gl.uniform1i(globals.shaderIsTexture, false);
  globals.gl.uniform1i(globals.shaderIsLight, false);
  globals.gl.uniform1i(globals.shaderTexture, 0);

  globals.gl.drawArrays(globals.gl.LINES, 0, 6);

  globals.gl.uniform1i(globals.shaderIsLight, true);

  Object.entries(globals.itemObj).forEach(([key, value]) => {
    globals.gl.uniform1i(globals.shaderIsFlat, value.isFlat);
    // model matrix identità tramite m4.js
    mMatrix = m4.identity();
    mMatrix = m4.translate(mMatrix, value.center[0], value.center[1], value.center[2])
    mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
    mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
    mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
    mMatrix = m4.translate(mMatrix, -value.center[0], -value.center[1], -value.center[2])

    globals.gl.uniformMatrix4fv(globals.shaderMMatrix, false, mMatrix);

    globals.gl.uniform1i(globals.shaderIsTexture, value.isTexture);
    globals.gl.uniform1i(globals.shaderTexture, value.texture);

    // disegna l'ogetto
    globals.gl.drawArrays(globals.gl.TRIANGLES, value.vertexArrStart, value.vertexArrStop - value.vertexArrStart);
  });

  requestAnimationFrame(render);
}

render(0);
