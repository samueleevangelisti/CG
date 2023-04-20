function loadMeshFromOBJ(mesh) {
  return new Promise((resolve, reject) => {
    ajaxUtils.get(mesh.sourceMesh)
      .then((response) => {
        logUtils.debug('(load_mesh.loadMeshFromOBJ)', response);
        // TODO DSE questa cosa andrebbe controllata meglio
        // scommentare/commentare per utilizzare o meno la LoadSubdivMesh
        // mesh.data = LoadSubdivMesh(result.mesh);
        let result = glmReadOBJ(response,new subd_mesh());
        mesh.data = result.mesh;
        mesh.fileMTL = result.fileMtl;
        resolve(response);
      })
      .catch((error) => {
        logUtils.error('(load_mesh.loadMeshFromOBJ)', error);
        reject(error);
      });
  });
}



function readMTLFile(MTLfileName, mesh){
  return new Promise((resolve, reject) => {
    ajaxUtils.get(MTLfileName)
      .then((response) => {
        logUtils.debug('(load_mesh.readMTLFile)', response);
        glmReadMTL(response, mesh);
        resolve(response);
      })
      .catch((error) => {
        logUtils.error('(load_mesh.readMTLFile)', error);
        reject(error);
      });
  });
}



function retrieveDataFromSource(mesh){
  return new Promise((resolve, reject) => {
    loadMeshFromOBJ(mesh)
      .then((response) => {
        logUtils.debug('(load_mesh.retrieveDataFromSource)', response);
        if(mesh.fileMTL) {
          readMTLFile(mesh.sourceMesh.substring(0, mesh.sourceMesh.lastIndexOf("/")+1) + mesh.fileMTL, mesh.data)
            .then((response) => {
              logUtils.debug('(load_mesh.retrieveDataFromSource)', response);
              mesh.materials = mesh.data.materials;
              delete mesh.data.materials;
              resolve(response);
            })
            .catch((error) => {
              logUtils.error('(load_mesh.retrieveDataFromSource)', error);
              reject(error);
            }); 
        } else {
          resolve(response);
        }
      })
      .catch((error) => {
        logUtils.error('(load_mesh.retrieveDataFromSource)', error);
        reject(error);
      });
  });
}



function loadTexture(gl, path, fileName) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([255, 255, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, srcFormat, srcType, pixel);
  
  if(fileName){
    const image = new Image();
    image.onload = function() {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image);
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) 
        gl.generateMipmap(gl.TEXTURE_2D); // Yes, it's a power of 2. Generate mips.
      else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      }
    };
    image.src = path + fileName;
  }
  return texture;
  
  function isPowerOf2(value) {
     return (value & (value - 1)) == 0;
  }
}



function LoadMesh(gl,mesh) {
  let returnObj = {
    positions: [],
    normals: [],
    texcoords: []
  };
  retrieveDataFromSource(mesh)
    .then((response) => {
      Unitize(mesh.data);
      //Ora che ho la mesh e il/i materiali associati, mi occupo di caricare 
      //la/le texture che tali materiali contengono
      var map = mesh.materials[1].parameter;
      var path = mesh.sourceMesh.substring(0, mesh.sourceMesh.lastIndexOf("/")+1);
      map.set("map_Kd", loadTexture(gl, path, map.get("map_Kd")));

      var x=[], y=[], z=[];
      var xt=[], yt=[];
      var i0,i1,i2;
      var nvert=mesh.data.nvert;
      var nface=mesh.data.nface;
      var ntexcoord=mesh.data.textCoords.length;

      for (var i=0; i<nvert; i++){
        x[i]=mesh.data.vert[i+1].x;
        y[i]=mesh.data.vert[i+1].y;
        z[i]=mesh.data.vert[i+1].z;       
      }
      for (var i=0; i<ntexcoord-1; i++){
        xt[i]=mesh.data.textCoords[i+1].u;
        yt[i]=mesh.data.textCoords[i+1].v;      
      }
      for (var i=1; i<=nface; i++){
        i0=mesh.data.face[i].vert[0]-1;
        i1=mesh.data.face[i].vert[1]-1;
        i2=mesh.data.face[i].vert[2]-1;
        returnObj.positions.push(x[i0],y[i0],z[i0],x[i1],y[i1],z[i1],x[i2],y[i2],z[i2]); 
        i0=mesh.data.facetnorms[i].i;
        i1=mesh.data.facetnorms[i].j;
        i2=mesh.data.facetnorms[i].k;
        returnObj.normals.push(i0,i1,i2,i0,i1,i2,i0,i1,i2); 
        i0=mesh.data.face[i].textCoordsIndex[0]-1;
        i1=mesh.data.face[i].textCoordsIndex[1]-1;
        i2=mesh.data.face[i].textCoordsIndex[2]-1;
        returnObj.texcoords.push(xt[i0],yt[i0],xt[i1],yt[i1],xt[i2],yt[i2]);
      }         
      returnObj.numVertices=3*nface;

      if (mesh.fileMTL == null){
        returnObj.ambient=mesh.materials[0].parameter.get("Ka");
        returnObj.diffuse=mesh.materials[0].parameter.get("Kd");
        returnObj.specular=mesh.materials[0].parameter.get("Ks");
        returnObj.emissive=mesh.materials[0].parameter.get("Ke");
        returnObj.shininess=mesh.materials[0].parameter.get("Ns");
        returnObj.opacity=mesh.materials[0].parameter.get("Ni");
      }
      else{
        returnObj.ambient=mesh.materials[1].parameter.get("Ka");
        returnObj.diffuse=mesh.materials[1].parameter.get("Kd");
        returnObj.specular=mesh.materials[1].parameter.get("Ks");
        returnObj.emissive=mesh.materials[1].parameter.get("Ke");
        returnObj.shininess=mesh.materials[1].parameter.get("Ns");
        returnObj.opacity=mesh.materials[1].parameter.get("Ni");
      }
      return returnObj;
    })
    .catch((error) => {
      logUtils.error('(load_mesh.LoadMesh)', error);
    });
}
