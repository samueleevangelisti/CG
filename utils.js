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
      }, 0) / pointArr.length,
      1
    ];
  },
  // credit: CG
  isPowerOf2: function(value) {
    return (value & (value - 1)) === 0;
  }
};

// credit: CG
function degToRad(d) {
  return d * Math.PI / 180;
}

// credit: CG
function radToDeg(r) {
  return r * 180 / Math.PI;
}
