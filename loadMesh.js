function loadMeshFromOBJ(mesh) {
  return new Promise((resolve, reject) => {
    ajaxUtils.get(mesh.sourceMesh)
      .then((response) => {
        logUtils.debug('(loadMesh.loadMeshFromOBJ)', response);
        // TODO DSE questa cosa andrebbe controllata meglio
        // scommentare/commentare per utilizzare o meno la LoadSubdivMesh
        // mesh.data = LoadSubdivMesh(result.mesh);
        let result = glmReadOBJ(response,new subd_mesh());
        mesh.data = result.mesh;
        mesh.fileMTL = result.fileMtl;
        resolve(response);
      })
      .catch((error) => {
        logUtils.error('(loadMesh.loadMeshFromOBJ)', error);
        reject(error);
      });
  });
}



function readMTLFile(MTLfileName, mesh){
  return new Promise((resolve, reject) => {
    ajaxUtils.get(MTLfileName)
      .then((response) => {
        logUtils.debug('(loadMesh.readMTLFile)', response);
        glmReadMTL(response, mesh);
        resolve(response);
      })
      .catch((error) => {
        logUtils.error('(loadMesh.readMTLFile)', error);
        reject(error);
      });
  });
}



function retrieveDataFromSource(mesh){
  return new Promise((resolve, reject) => {
    loadMeshFromOBJ(mesh)
      .then((response) => {
        logUtils.debug('(loadMesh.retrieveDataFromSource)', response);
        if(mesh.fileMTL) {
          readMTLFile(mesh.sourceMesh.substring(0, mesh.sourceMesh.lastIndexOf("/")+1) + mesh.fileMTL, mesh.data)
            .then((response) => {
              logUtils.debug('(loadMesh.retrieveDataFromSource)', response);
              mesh.materials = mesh.data.materials;
              delete mesh.data.materials;
              resolve(response);
            })
            .catch((error) => {
              logUtils.error('(loadMesh.retrieveDataFromSource)', error);
              reject(error);
            }); 
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        logUtils.error('(loadMesh.retrieveDataFromSource)', error);
        reject(error);
      });
  });
}



function LoadMesh(itemId, meshSource) {
  return new Promise((resolve, reject) => {
    let returnObj = {
      isFlat: false,
      isTesture: false,
      materialEmissive: [0, 0, 0],
      materialAmbient: [0, 0, 0],
      materialDiffuse: [0, 0, 0],
      materialSpecular: [0, 0, 0],
      shininess: 0,
      opacity: 0,
      texture: 0,
      vertexArr: [],
      colorArr: [],
      textureArr: [],
      surfaceNormalArr: [],
      normalArr: [],
      center: [0, 0, 0],
      xTraslation: 0,
      yTraslation: 0,
      zTraslation: 0,
      yRotationAngle: 0,
      zRotationAngle: 0,
      xRotationAngle: 0,
      vertexArrStart: 0,
      vertexArrStop: 0
    };
    let mesh = {
      sourceMesh: meshSource
    };
    retrieveDataFromSource(mesh)
      .then((response) => {
        Unitize(mesh.data);
        // Ora che ho la mesh e il/i materiali associati, mi occupo di caricare la/le texture che tali materiali contengono
        let map = mesh.materials[1].parameter;
        let path = mesh.sourceMesh.substring(0, mesh.sourceMesh.lastIndexOf('/') + 1);
        returnObj.texture = globals.textureSourceArr.indexOf(null);
        globals.textureSourceArr[returnObj.texture] = path + map.get('map_Kd');
        let x = [];
        let y = [];
        let z = [];
        let xt = [];
        let yt = [];
        let i0;
        let i1;
        let i2;
        let nvert = mesh.data.nvert;
        let nface = mesh.data.nface;
        let ntexcoord = mesh.data.textCoords.length;
        for(let i = 0; i < nvert; i++){
          x[i] = mesh.data.vert[i + 1].x;
          y[i] = mesh.data.vert[i + 1].y;
          z[i] = mesh.data.vert[i + 1].z;
        }
        for(let i = 0; i < ntexcoord - 1; i++) {
          xt[i] = mesh.data.textCoords[i + 1].u;
          yt[i] = mesh.data.textCoords[i + 1].v;
        }
        for(let i = 1; i <= nface; i++) {
          i0 = mesh.data.face[i].vert[0] - 1;
          i1 = mesh.data.face[i].vert[1] - 1;
          i2 = mesh.data.face[i].vert[2] - 1;
          returnObj.vertexArr.push([x[i0], y[i0], z[i0]], [x[i1], y[i1], z[i1]], [x[i2], y[i2], z[i2]]);
          i0 = mesh.data.facetnorms[i].i;
          i1 = mesh.data.facetnorms[i].j;
          i2 = mesh.data.facetnorms[i].k;
          returnObj.normalArr.push([i0, i1, i2], [i0, i1, i2], [i0, i1, i2]); 
          i0 = mesh.data.face[i].textCoordsIndex[0] - 1;
          i1 = mesh.data.face[i].textCoordsIndex[1] - 1;
          i2 = mesh.data.face[i].textCoordsIndex[2] - 1;
          returnObj.textureArr.push([xt[i0], yt[i0]], [xt[i1], yt[i1]], [xt[i2], yt[i2]]);
        }
        // TODO DSE dubbia l'utilità di questa riga di codice
        returnObj.numVertices = 3 * nface;
        if(mesh.fileMTL == null) {
          returnObj.materialEmissive = mesh.materials[0].parameter.get('Ke');
          returnObj.materialAmbient = mesh.materials[0].parameter.get('Ka');
          returnObj.materialDiffuse = mesh.materials[0].parameter.get('Kd');
          returnObj.materialSpecular = mesh.materials[0].parameter.get('Ks');
          returnObj.shininess = mesh.materials[0].parameter.get('Ns');
          returnObj.opacity = mesh.materials[0].parameter.get('Ni');
        }
        else {
          returnObj.materialEmissive = mesh.materials[1].parameter.get('Ke');
          returnObj.materialAmbient = mesh.materials[1].parameter.get('Ka');
          returnObj.materialDiffuse = mesh.materials[1].parameter.get('Kd');
          returnObj.materialSpecular = mesh.materials[1].parameter.get('Ks');
          returnObj.shininess = mesh.materials[1].parameter.get('Ns');
          returnObj.opacity = mesh.materials[1].parameter.get('Ni');
        }
        globals.itemObj[itemId] = returnObj;
        resolve(response);
      })
      .catch((error) => {
        logUtils.error('(loadMesh.LoadMesh)', error);
        reject(error);
      });
  });
}
