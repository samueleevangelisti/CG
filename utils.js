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
    oTmp[0] = axisLength;
    return oTmp;
  })());
  colorArr.push(colorObj[color1]);
  colorArr.push(colorObj[color1]);

  // asse y
  vertexArr.push(o);
  vertexArr.push((() => {
    let oTmp = JSON.parse(JSON.stringify(o));
    oTmp[1] = axisLength;
    return oTmp;
  })());
  colorArr.push(colorObj[color2]);
  colorArr.push(colorObj[color2]);

  // asse z
  vertexArr.push(o);
  vertexArr.push((() => {
    let oTmp = JSON.parse(JSON.stringify(o));
    oTmp[2] = axisLength;
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
function colorCube(a, b, c, d, a1, b1, c1, d1, color1, color2, color3, color4, color5, color6){
  quad(a, b, c, d, color1);
  quad(a1, b1, c1, d1, color2);
  quad(a, b, b1, a1, color3);
  quad(b, c, c1, b1, color4);
  quad(c, d, d1, c1, color5);
  quad(d, a, a1, d1, color6);
  let pointArr = [a, b, c, d, a1, b1, c1, d1];
  let m = center(pointArr);
  let axisLength = pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[0] - m[0]), returnValue);
  }, pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[1] - m[1]), returnValue);
  }, pointArr.reduce((returnValue, currentValue) => {
    return Math.max(Math.abs(currentValue[2] - m[2]), returnValue);
  }, 0))) + 1;

  axis(m, 'red', 'green', 'blue', axisLength);
}
