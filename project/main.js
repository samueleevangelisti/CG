window.addEventListener('load', (event) => {

  ////////////////////////////// Ottimizzazione dimensioni della canvas //////////////////////////////
  
  let canvasElement = document.getElementById('my-canvas');
  let width = canvasElement.clientWidth;
  let height = canvasElement.clientHeight;
  if(width < height) {
    height = width;
  } else {
    width = height;
  }
  canvasElement.style.width = `${width}px`;
  canvasElement.style.height = `${height}px`;
  canvasElement.width = width;
  canvasElement.height = height;
  document.getElementById('canvas-div').classList.remove('h-100');

  ////////////////////////////// inizializzazione contesto grafico //////////////////////////////

  globals.canvas = document.getElementById('my-canvas');

  globals.gl = globals.canvas.getContext('webgl');
  if(!globals.gl) {
    alert('WebGL isn\'t available');
  } 
  globals.gl.viewport(0, 0, globals.canvas.width, globals.canvas.height);

  globals.gl.clearColor(0.9, 0.9, 0.9, 1.0);

  // tbilitazione del back face culling per la non visualizzazione delle facce nascoste, BACK è il valore di default
  globals.gl.enable(globals.gl.CULL_FACE);
  // test della profondità per scartare i fragment che sopra ne hanno altri
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

  globals.textureSourceArr = [
    ...globals.textureSourceArr,
    ...new Array(globals.textureUnitArr.length - globals.textureSourceArr.length).fill(null)
  ];

  globals.itemObj = {
    ...globals.itemObj,
  };

  // Caricamento degli items da file in formato obj waveform
  Promise.allSettled([
    meshLoader.load('resources/field.obj', {
      isFlat: true
    }),
    meshLoader.load('resources/cube.obj', {
      isFlat: true,
      xTraslation: 1,
      yTraslation: 1
    }),
    meshLoader.load('resources/sphere.obj', {
      xTraslation: -1, 
      yTraslation: -1,
      zTraslation: 1
    })
  ])
    .then((responseArr) => {
      logUtils.debug('(main.Promise.allSettled) LoadMesh', responseArr);
      responseArr.forEach((response) => {
        if(response.status == 'fulfilled') {
          meshLoader.computeItem(...response.value);
        }
      });
      Object.entries(globals.itemObj).forEach(([key, value]) => {
        vertexArrLength = value.vertexArr.length;
        value.surfaceNormalArr = value.vertexArr.map((vertex, index) => {
          // TODO DSE servirebbe una barra di caricamento
          // logUtils.debug(`(main.Promise.allSettled) (surfaceNormalArr) ${key}`, `${(index + 1) / vertexArrLength * 100}%`);
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
        vertexArrLength = value.vertexArr.length;
        value.vertexArr.forEach((vertex, index) => {
          // TODO DSE servirebbe una barra di caricamento
          // logUtils.debug(`(main.Promise.allSettled) (normalArr) ${key}`, `${(index + 1) / vertexArrLength * 100}%`);
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

      // Tipizzazione array tramite m4.js
      globals.vertexArr = m4.flatten(globals.vertexArr);
      globals.surfaceNormalArr = m4.flatten(globals.surfaceNormalArr);
      globals.normalArr = m4.flatten(globals.normalArr);
      globals.colorArr = m4.flatten(globals.colorArr);
      globals.textureArr = m4.flatten(globals.textureArr);

      ////////////////////////////// inizializzazione elementi interfaccia //////////////////////////////

      globals.textureSourceArr.forEach((textureSource, index) => {
        document.getElementById('texture-ol').append(graphicUtils.TextureLi.fromConfigObj({
          index: index,
          textureSource: textureSource
        }).element);
      });

      Object.keys(globals.itemObj).forEach((key) => {
        document.getElementById('item-accordion').append(graphicUtils.AccordionItem.fromConfigObj({
          itemId: key
        }).element);
      });

      ////////////////////////////// inizializzazione vista //////////////////////////////

      setters.setFovy(40);
      let aspectRatio = globals.canvas.width / globals.canvas.height;
      setters.setNear(1);
      setters.setFar(100);
      setters.setDistance(10);
      setters.setTheta(30);
      setters.setPhi(60);
      setters.setTarget([0, 0, 0]);
      setters.setViewUp([0, 0, 1]);

      setters.setLightPosition([5, 5, 5]);
      setters.setLightColor([1, 1, 1, 1]);
      setters.setLightAmbient(20);

      globals.textureSourceArr.forEach((textureSource, index) => {
        setters.setTextureSource(index, textureSource);
      });

      Object.entries(globals.itemObj).forEach(([key, value]) => {
        setters.setIsFlat(key, value.isFlat);
        setters.setMaterialEmissive(key, value.materialEmissive);
        setters.setMaterialAmbient(key, value.materialAmbient);
        setters.setMaterialDiffuse(key, value.materialDiffuse);
        setters.setMaterialSpecular(key, value.materialSpecular);
        setters.setShininess(key, value.shininess);
        setters.setOpacity(key, value.opacity);
        setters.setTexture(key, value.texture);
        setters.setXTraslation(key, value.xTraslation);
        setters.setYTraslation(key, value.yTraslation);
        setters.setZTraslation(key, value.zTraslation);
        setters.setYRotationAngle(key, value.yRotationAngle);
        setters.setZRotationAngle(key, value.zRotationAngle);
        setters.setXRotationAngle(key, value.xRotationAngle);
      });

      ////////////////////////////// shader program //////////////////////////////

      globals.shaderProgram = webglUtils.createProgramFromScripts(globals.gl, ['vertex-shader', 'fragment-shader']);
      globals.gl.useProgram(globals.shaderProgram);

      globals.vertexBuffer = globals.gl.createBuffer();
      globals.gl.bindBuffer(globals.gl.ARRAY_BUFFER, globals.vertexBuffer);
      globals.gl.bufferData(globals.gl.ARRAY_BUFFER, globals.vertexArr, globals.gl.STATIC_DRAW);

      globals.shaderVertexPosition = globals.gl.getAttribLocation(globals.shaderProgram, 'vertexPosition');
      globals.gl.vertexAttribPointer(globals.shaderVertexPosition, 3, globals.gl.FLOAT, false, 0, 0);
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

      globals.shaderLightPosition = globals.gl.getUniformLocation(globals.shaderProgram, 'lightPosition');
      globals.shaderPMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'PMatrix');
      globals.shaderVMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'VMatrix');
      globals.shaderMMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'MMatrix');
      globals.shaderMRMatrix = globals.gl.getUniformLocation(globals.shaderProgram, 'MRMatrix');

      globals.shaderIsFlat = globals.gl.getUniformLocation(globals.shaderProgram, 'isFlat');
      globals.shaderIsTexture = globals.gl.getUniformLocation(globals.shaderProgram, 'isTexture');
      globals.shaderIsLight = globals.gl.getUniformLocation(globals.shaderProgram, 'isLight');
      globals.shaderCameraPosition = globals.gl.getUniformLocation(globals.shaderProgram, 'cameraPosition');
      globals.shaderLightColor = globals.gl.getUniformLocation(globals.shaderProgram, 'lightColor');
      globals.shaderMaterialEmissive = globals.gl.getUniformLocation(globals.shaderProgram, 'materialEmissive');
      globals.shaderMaterialAmbient = globals.gl.getUniformLocation(globals.shaderProgram, 'materialAmbient');
      globals.shaderLightAmbient = globals.gl.getUniformLocation(globals.shaderProgram, 'lightAmbient');
      globals.shaderMaterialDiffuse = globals.gl.getUniformLocation(globals.shaderProgram, 'materialDiffuse');
      shaderMaterialSpecular = globals.gl.getUniformLocation(globals.shaderProgram, 'materialSpecular');
      globals.shaderShininess = globals.gl.getUniformLocation(globals.shaderProgram, 'shininess');
      globals.shaderOpacity = globals.gl.getUniformLocation(globals.shaderProgram, 'opacity');
      globals.shaderTexture = globals.gl.getUniformLocation(globals.shaderProgram, 'texture');

      ////////////////////////////// rendering //////////////////////////////

      function render(time) {
        // conversione da clip space a pixel
        globals.gl.clear(globals.gl.COLOR_BUFFER_BIT | globals.gl.DEPTH_BUFFER_BIT); 

        // calcolo della matrice P tramite m4.js
        let pMatrix = m4.perspective(globals.fovy, aspectRatio, globals.near, globals.far);

        setters.setCameraPosition([
          globals.distance * Math.cos(globals.theta) * Math.sin(globals.phi), 
          globals.distance * Math.sin(globals.theta) * Math.sin(globals.phi),
          globals.distance * Math.cos(globals.phi)
        ]);

        // calcolo della posizione della camera tramite m4.js
        let cameraMatrix = m4.lookAt(globals.cameraPosition, globals.target, globals.viewUp);
        // calcolo della matrice V dalla matrice della camera tramite m4.js
        let vMatrix = m4.inverse(cameraMatrix);

        // matrice M inizialmente come identità
        let mMatrix = m4.identity();
        // matrice M con solo le rotazioni
        let mRMatrix = m4.identity();

        globals.gl.uniform3fv(globals.shaderLightPosition, globals.lightPosition);
        globals.gl.uniformMatrix4fv(globals.shaderPMatrix, false, pMatrix);
        globals.gl.uniformMatrix4fv(globals.shaderVMatrix, false, vMatrix);
        globals.gl.uniformMatrix4fv(globals.shaderMMatrix, false, mMatrix);

        globals.gl.uniform1i(globals.shaderIsTexture, false);
        globals.gl.uniform1i(globals.shaderIsLight, false);
        globals.gl.uniform3fv(globals.shaderCameraPosition, globals.cameraPosition);
        globals.gl.uniform4fv(globals.shaderLightColor, globals.lightColor);
        globals.gl.uniform4fv(globals.shaderLightAmbient, [
          ...globals.lightColor.slice(0, 3).map((e) => {
            return e / 100 * globals.lightAmbient;
          }),
          globals.lightColor[4]
        ]);
        globals.gl.uniform1i(globals.shaderTexture, 0);

        globals.gl.drawArrays(globals.gl.LINES, 0, 6);

        globals.gl.uniform1i(globals.shaderIsLight, true);

        Object.entries(globals.itemObj).forEach(([key, value]) => {
          // model matrix identità tramite m4.js
          mMatrix = m4.identity();
          mMatrix = m4.translate(mMatrix, value.xTraslation, value.yTraslation, value.zTraslation);
          mMatrix = m4.translate(mMatrix, value.center[0], value.center[1], value.center[2]);
          mMatrix = m4.xRotate(mMatrix, value.xRotationAngle);
          mMatrix = m4.zRotate(mMatrix, value.zRotationAngle);
          mMatrix = m4.yRotate(mMatrix, value.yRotationAngle);
          mMatrix = m4.translate(mMatrix, -value.center[0], -value.center[1], -value.center[2]);

          mRMatrix = m4.identity();
          mRMatrix = m4.xRotate(mRMatrix, value.xRotationAngle);
          mRMatrix = m4.zRotate(mRMatrix, value.zRotationAngle);
          mRMatrix = m4.yRotate(mRMatrix, value.yRotationAngle);

          globals.gl.uniformMatrix4fv(globals.shaderMMatrix, false, mMatrix);
          globals.gl.uniformMatrix4fv(globals.shaderMRMatrix, false, mRMatrix);

          globals.gl.uniform1i(globals.shaderIsFlat, value.isFlat);
          globals.gl.uniform1i(globals.shaderIsTexture, value.isTexture);
          globals.gl.uniform3fv(globals.shaderMaterialEmissive, value.materialEmissive);
          globals.gl.uniform3fv(globals.shaderMaterialAmbient, value.materialAmbient);
          globals.gl.uniform3fv(globals.shaderMaterialDiffuse, value.materialDiffuse);
          globals.gl.uniform3fv(shaderMaterialSpecular, value.materialSpecular);
          globals.gl.uniform1f(globals.shaderShininess, value.shininess);
          globals.gl.uniform1f(globals.shaderOpacity, value.opacity);
          globals.gl.uniform1i(globals.shaderTexture, value.texture);

          // disegna l'ogetto
          globals.gl.drawArrays(globals.gl.TRIANGLES, value.vertexArrStart, value.vertexArrStop - value.vertexArrStart);
        });

        requestAnimationFrame(render);
      }

      render(0);
    });
});
