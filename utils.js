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

// credit: CG
function degToRad(d) {
  return d * Math.PI / 180;
}

// credit: CG
function radToDeg(r) {
  return r * 180 / Math.PI;
}

function axis(o, color1, color2, color3, axisLength) {
  // asse x
  vertexArr.push(o);
  vertexArr.push((() => {
    let oTmp = JSON.parse(JSON.stringify(o));
    oTmp[0] += axisLength;
    return oTmp;
  })());
  colorArr.push(colorObj[color1]);
  colorArr.push(colorObj[color1]);

  // asse y
  vertexArr.push(o);
  vertexArr.push((() => {
    let oTmp = JSON.parse(JSON.stringify(o));
    oTmp[1] += axisLength;
    return oTmp;
  })());
  colorArr.push(colorObj[color2]);
  colorArr.push(colorObj[color2]);

  // asse z
  vertexArr.push(o);
  vertexArr.push((() => {
    let oTmp = JSON.parse(JSON.stringify(o));
    oTmp[2] += axisLength;
    return oTmp;
  })());
  colorArr.push(colorObj[color3]);
  colorArr.push(colorObj[color3]);
}

function center(pointArr) {
  return [
    pointArr.reduce((returnValue, currentValue) => {
      return returnValue + currentValue[0];
    }, 0) / pointArr.length,
      pointArr.reduce((returnValue, currentValue) => {
      return returnValue + currentValue[1];
    }, 0) / pointArr.length,
    pointArr.reduce((returnValue, currentValue) => {
      return returnValue + currentValue[2];
    }, 0) / pointArr.length,
    1
  ];
}

// credit: CG [updated] creazione di un quadrato
function quad(a, b, c, d, color) {
  vertexArr.push(a);
  vertexArr.push(b);
  vertexArr.push(c);
  vertexArr.push(a);
  vertexArr.push(c);
  vertexArr.push(d);
  colorArr.push(colorObj[color]);
  colorArr.push(colorObj[color]);
  colorArr.push(colorObj[color]);
  colorArr.push(colorObj[color]);
  colorArr.push(colorObj[color]);
  colorArr.push(colorObj[color]);
}

// credit: CG [updated] creazione del cubo
function colorCube(itemId, a, b, c, d, a1, b1, c1, d1, color1, color2, color3, color4, color5, color6){
  let pointArr = [a, b, c, d, a1, b1, c1, d1];
  globals.itemObj[itemId] = {
    vertexArr: pointArr,
    vertexArrStart: vertexArr.length,
    colorArrStart: colorArr.length
  };
  let m = center(pointArr);
  let axisLength = pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[0] - m[0]), returnValue);
  }, pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[1] - m[1]), returnValue);
  }, pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[2] - m[2]), returnValue);
  }, 0))) + 1;
  axis(m, 'red', 'green', 'blue', axisLength);
  quad(a, b, c, d, color1);
  quad(a1, b1, c1, d1, color2);
  quad(a, b, b1, a1, color3);
  quad(b, c, c1, b1, color4);
  quad(c, d, d1, c1, color5);
  quad(d, a, a1, d1, color6);
  globals.itemObj[itemId] = {
    ...globals.itemObj[itemId],
    vertexArrStop: vertexArr.length,
    colorArrStop: colorArr.length
  };
}
