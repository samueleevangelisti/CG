function elementFromConfigObj(configObj) {
  let tag = configObj.tag;
  let classArr = configObj.classArr || [];
  let attributeObj = configObj.attributeObj || {};
  let styleObj = configObj.styleObj || {};
  let handlerFnObj = configObj.handlerFnObj || {};
  let childElementArr = configObj.childElementArr || [];
  delete configObj.tag;
  delete configObj.classArr;
  delete configObj.attributeObj;
  delete configObj.styleObj;
  delete configObj.handlerFnObj;
  delete configObj.childElementArr;
  let element = document.createElement(tag);
  Object.entries(configObj).forEach(([key, value]) => {
    element[key] = value;
  });
  if(classArr.length) {
    element.classList.add(...classArr);
  }
  Object.entries(attributeObj).forEach(([attribute, value]) => {
    element.setAttribute(attribute, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    element.style[key] = value;
  });
  Object.entries(handlerFnObj).forEach(([event, handlerFn]) => {
    element.addEventListener(event, handlerFn);
  });
  childElementArr.forEach((childElement) => {
    element.append(childElement);
  });
  return element;
}

////////////////////////////////////////////////////////////////////////////////

var utils = {
  center: function(pointArr) {
    return [
      pointArr.reduce((returnValue, currentValue) => {
        return returnValue + currentValue[0];
      }, 0) / pointArr.length,
        pointArr.reduce((returnValue, currentValue) => {
        return returnValue + currentValue[1];
      }, 0) / pointArr.length,
      pointArr.reduce((returnValue, currentValue) => {
        return returnValue + currentValue[2];
      }, 0) / pointArr.length
    ];
  },
  // credit: CG
  degToRad: function(d) {
    return d * Math.PI / 180;
  },
  // credit: CG
  radToDeg: function(r) {
    return r * 180 / Math.PI;
  },
  // credit: CG
  isPowerOf2: function(value) {
    return (value & (value - 1)) === 0;
  },
  // credit: CG
  loadTexture: function(index, textureSource) {
    let texture = globals.gl.createTexture();
    globals.gl.activeTexture(globals.textureUnitArr[index]);
    globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
    globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, 1, 1, 0, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
    if(textureSource) {
      let image = new Image();
      image.addEventListener('load', (event) => {
        globals.gl.activeTexture(globals.textureUnitArr[index]);
        // globals.gl.pixelStorei(globals.gl.UNPACK_FLIP_Y_WEBGL, true);
        globals.gl.bindTexture(globals.gl.TEXTURE_2D, texture);
        globals.gl.texImage2D(globals.gl.TEXTURE_2D, 0, globals.gl.RGBA, globals.gl.RGBA, globals.gl.UNSIGNED_BYTE, image);
        if(utils.isPowerOf2(image.width) && utils.isPowerOf2(image.height)) {
          globals.gl.generateMipmap(globals.gl.TEXTURE_2D);
        } else {
          globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_S, globals.gl.CLAMP_TO_EDGE);
          globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_WRAP_T, globals.gl.CLAMP_TO_EDGE);
          globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_MIN_FILTER, globals.gl.LINEAR);
          // globals.gl.texParameteri(globals.gl.TEXTURE_2D, globals.gl.TEXTURE_MAG_FILTER, globals.gl.LINEAR);
        }
      });
      image.src = textureSource;
    }
  }
};
