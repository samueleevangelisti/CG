var meshLoader = {
  _parseObj: function(text) {
    let returnObj = {
      mtllib: null,
      o: null,
      v: [],
      vt: [],
      vn: [],
      f: []
    };
    let usemtl = 'default';
    text.replace('\r', '').replace(/\ +/g, ' ').replace(/\ *\n/g, '\n').split('\n').filter((line) => {
      return line;
    }).filter((line) => {
      return line[0] != '#';
    }).forEach((line) => {
      let lineArr = line.split(' ');
      switch(lineArr[0]) {
        case 'mtllib':
          returnObj.mtllib = lineArr[1];
          break;
        case 'o':
          returnObj.o = lineArr[1];
          usemtl = 'default';
          break;
        case 'v':
          returnObj.v.push(lineArr.slice(1).map((e) => {
            return parseFloat(e);
          }));
          break;
        case 'vt':
          returnObj.vt.push(lineArr.slice(1).map((e) => {
            return parseFloat(e);
          }));
          break;
        case 'vn':
          returnObj.vn.push(lineArr.slice(1).map((e) => {
            return parseFloat(e);
          }));
          break;
        case 'usemtl':
          usemtl = lineArr[1];
          break;
        case 'f':
          returnObj.f.push({
            usemtl: usemtl,
            f: lineArr.slice(1).map((e) => {
              return e.split('/').map((e) => {
                return parseInt(e);
              });
            })
          });
          break;
        default:
          break;
      }
    });
    return returnObj;
  },
  _parseMtl: function(text) {
    let returnObj = {
      default: {
        Ke: [0, 0, 0],
        Ka: [0.2, 0.2, 0.2],
        Kd: [0.5, 0.5, 0.5],
        Ks: [0, 0, 0],
        Ns: 1,
        Ni: 1,
        map_Kd: null,
        isTexture: false,
        index: 0,
        color: [0, 0, 0]
      }
    };
    let newmtl = null;
    text.replace('\r', '').replace(/\ +/g, ' ').replace(/\ *\n/g, '\n').split('\n').filter((line) => {
      return line;
    }).filter((line) => {
      return line[0] != '#';
    }).forEach((line) => {
      let lineArr = line.split(' ');
      switch(lineArr[0]) {
        case 'newmtl':
          newmtl = lineArr[1];
          returnObj[newmtl] = {
            Ke: [0, 0, 0],
            Ka: [0, 0, 0],
            Kd: [0, 0, 0],
            Ks: [0, 0, 0],
            Ns: 1,
            Ni: 1,
            map_Kd: null,
            isTexture: false,
            index: 0,
            color: [0, 0, 0]
          };
          break;
        case 'Ke':
          returnObj[newmtl].Ke = lineArr.slice(1).map((e) => {
            return parseFloat(e);
          });
          break;
        case 'Ka':
          returnObj[newmtl].Ka = lineArr.slice(1).map((e) => {
            return parseFloat(e);
          });
          break;
        case 'Kd':
          returnObj[newmtl].Kd = lineArr.slice(1).map((e) => {
            return parseFloat(e);
          });
          break;
        case 'Ks':
          returnObj[newmtl].Ks = lineArr.slice(1).map((e) => {
            return parseFloat(e);
          });
          break;
        case 'Ns':
          returnObj[newmtl].Ns = parseFloat(lineArr[1]);
          break;
        case 'Ni':
          returnObj[newmtl].Ni = parseFloat(lineArr[1]);
          break;
        case 'map_Kd':
          returnObj[newmtl].map_Kd = lineArr[1];
          break;
        default:
          break;
      }
    });
    return returnObj;
  },
  computeItem: function(sourcePath, objObj, mtlObj, configObj={}) {
    let isFlat = configObj.isFlat || false;
    let xTraslation = configObj.xTraslation || 0;
    let yTraslation = configObj.yTraslation || 0;
    let zTraslation = configObj.zTraslation || 0;
    let returnObjObj = {};
    Object.values(mtlObj).forEach((value) => {
      if(value.map_Kd) {
        value.isTexture = true;
        value.index = globals.textureSourceArr.indexOf(null);
        globals.textureSourceArr[value.index] = `${sourcePath.split('/').slice(0, -1).join('/')}/${value.map_Kd}`;
      } else {
        value.isTexture = false;
        value.color = value.Kd;
        value.Kd = [1, 1, 1];
      }
    });
    objObj.f.forEach((f) => {
      if(!Object.keys(returnObjObj).includes(f.usemtl)) {
        returnObjObj[f.usemtl] = {
          isFlat: isFlat,
          isTexture: mtlObj[f.usemtl].isTexture,
          materialEmissive: mtlObj[f.usemtl].Ke,
          materialAmbient: mtlObj[f.usemtl].Ka,
          materialDiffuse: mtlObj[f.usemtl].Kd,
          materialSpecular: mtlObj[f.usemtl].Ks,
          shininess: mtlObj[f.usemtl].Ns,
          opacity: mtlObj[f.usemtl].Ni,
          texture: mtlObj[f.usemtl].index,
          vertexArr: [],
          colorArr: [],
          textureArr: [],
          surfaceNormalArr: [],
          normalArr: [],
          center: [0, 0, 0],
          xTraslation: xTraslation,
          yTraslation: yTraslation,
          zTraslation: zTraslation,
          yRotationAngle: 0,
          zRotationAngle: 0,
          xRotationAngle: 0,
          vertexArrStart: 0,
          vertexArrStop: 0
        };
      }
      for(let i = 0; i < f.f.length - 2; i++) {
        returnObjObj[f.usemtl].vertexArr.push(objObj.v[f.f[0][0] - 1], objObj.v[f.f[i + 1][0] - 1], objObj.v[f.f[i + 2][0] - 1]);
        returnObjObj[f.usemtl].colorArr.push(mtlObj[f.usemtl].color, mtlObj[f.usemtl].color, mtlObj[f.usemtl].color);
        if(mtlObj[f.usemtl].isTexture) {
          returnObjObj[f.usemtl].textureArr.push(objObj.vt[f.f[0][1] - 1], objObj.vt[f.f[i + 1][1] - 1], objObj.vt[f.f[i + 2][1] - 1]);
        } else {
          returnObjObj[f.usemtl].textureArr.push([0, 0], [0, 0], [0, 0]);
        }
      }
    });
    if(Object.keys(returnObjObj).length == 1) {
      globals.itemObj[objObj.o] = returnObjObj[Object.keys(returnObjObj)[0]];
    } else {
      Object.entries(returnObjObj).forEach(([key, value]) => {
        globals.itemObj[`${objObj.o}_${key}`] = value;
      });
    }
    return returnObjObj;
  },
  load: function(sourcePath, configObj={}) {
    return new Promise((resolve, reject) => {
      ajaxUtils.get(sourcePath)
        .then((response) => {
          logUtils.debug('(meshLoader.load)', response);
          let objObj = meshLoader._parseObj(response, configObj);
          if(objObj.mtllib) {
            ajaxUtils.get(`${sourcePath.split('/').slice(0, -1).join('/')}/${objObj.mtllib}`)
              .then((response) => {
                logUtils.debug('(meshLoader.load)', response);
                let mtlObj = meshLoader._parseMtl(response);
                resolve([sourcePath, objObj, mtlObj, configObj]);
              })
              .catch((error) => {
                logUtils.error('(meshLoader.load)', error);
                reject(error);
              });
          } else {
            resolve([sourcePath, objObj, mtlObj, configObj]);
          }
        })
        .catch((error) => {
          logUtils.error('(meshLoader.load)', error);
          reject(error);
        })
    });
  }
};
