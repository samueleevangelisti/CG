var globals = {
  // canvas
  canvas: null,
  // contesto grafico
  gl: null,
  // struttura gnerale contenente gli items visualizzati
  itemObj: {},
  // vertici
  vertexObj: {
    O: [0, 0, 0, 1],
    A: [0, 0, 0, 1],
    B: [1, 0, 0, 1],
    C: [1, 1, 0, 1],
    D: [0, 1, 0, 1],
    A1: [0, 0, 1, 1],
    B1: [1, 0, 1, 1],
    C1: [1, 1, 1, 1],
    D1: [0, 1, 1, 1],
    E: [0, 2, 0, 1],
    F: [1, 2, 0, 1],
    G: [1, 3, 0, 1],
    H: [0, 3, 0, 1],
    E1: [0, 2, 1, 1],
    F1: [1, 2, 1, 1],
    G1: [1, 3, 1, 1],
    H1: [0, 3, 1, 1]
  },
  // colori
  colorObj: {
    red: [1, 0, 0, 1],
    red05: [1, 0, 0, 0.5],
    green: [0, 1, 0, 1],
    green05: [0, 1, 0, 0.5],
    blue: [0, 0, 1, 1],
    blue05: [0, 0, 1, 0.5],
    yellow05: [1, 1, 0, 0.5],
    magenta05: [1, 0, 1, 0.5],
    cyan05: [0, 1, 1, 0.5]
  },
  // array di vertici da passare a webgl
  vertexArr: [],
  // array di colori da passare a webgl
  colorArr: [],
  // array di coordinate della texture
  textureArr: [
    // axis
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    // select the top left image
    0   , 0  ,
    0   , 0.5,
    0.25, 0  ,
    0   , 0.5,
    0.25, 0.5,
    0.25, 0  ,
    // select the top middle image
    0.25, 0  ,
    0.5 , 0  ,
    0.25, 0.5,
    0.25, 0.5,
    0.5 , 0  ,
    0.5 , 0.5,
    // select to top right image
    0.5 , 0  ,
    0.5 , 0.5,
    0.75, 0  ,
    0.5 , 0.5,
    0.75, 0.5,
    0.75, 0  ,
    // select the bottom left image
    0   , 0.5,
    0.25, 0.5,
    0   , 1  ,
    0   , 1  ,
    0.25, 0.5,
    0.25, 1  ,
    // select the bottom middle image
    0.25, 0.5,
    0.25, 1  ,
    0.5 , 0.5,
    0.25, 1  ,
    0.5 , 1  ,
    0.5 , 0.5,
    // select the bottom right image
    0.5 , 0.5,
    0.75, 0.5,
    0.5 , 1  ,
    0.5 , 1  ,
    0.75, 0.5,
    0.75, 1  ,
    // axis
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    0, 0,
    // select the top left image
    0   , 0  ,
    0   , 0.5,
    0.25, 0  ,
    0   , 0.5,
    0.25, 0.5,
    0.25, 0  ,
    // select the top middle image
    0.25, 0  ,
    0.5 , 0  ,
    0.25, 0.5,
    0.25, 0.5,
    0.5 , 0  ,
    0.5 , 0.5,
    // select to top right image
    0.5 , 0  ,
    0.5 , 0.5,
    0.75, 0  ,
    0.5 , 0.5,
    0.75, 0.5,
    0.75, 0  ,
    // select the bottom left image
    0   , 0.5,
    0.25, 0.5,
    0   , 1  ,
    0   , 1  ,
    0.25, 0.5,
    0.25, 1  ,
    // select the bottom middle image
    0.25, 0.5,
    0.25, 1  ,
    0.5 , 0.5,
    0.25, 1  ,
    0.5 , 1  ,
    0.5 , 0.5,
    // select the bottom right image
    0.5 , 0.5,
    0.75, 0.5,
    0.5 , 1  ,
    0.5 , 1  ,
    0.75, 0.5,
    0.75, 1  
  ]
};

// campo visivo rispetto all'asse y
var fovy;
// aspect ratio della viewport
var aspectRatio;
// distanza minima renderizzata
var near;
// distanza massima renderizzata
var far;
// distanza della camera
var distance;
// angolo rispetto all'asse x
var theta;
// angolo rispetto all'asse z
var phi;
// obiettivo della camera
var target;
// vettore view up
var viewUp;

// projection matrix
var pMatrix;
// posizione della camera
var cameraPosition;
// matrice della camera
var cameraMatrix;
// view matrix
var vMatrix;
// model matrix
var mMatrix;

// shader program
var shaderProgram;
// vertex buffer
var vertexBuffer;
// vertex position nello shader program
var shaderVertexPosition;
// color buffer
var colorBuffer;
// vertex color nello shader program
var shaderVertexColor;
// buffer di coordinate della texture
var textureBuffer;
// coordinate della texture nello shader program
var shaderVertexTexture;
// projection matrix nello shader program
var shaderPMatrix;
// view matrix nello shader program
var shaderVMatrix;
// model matrix nello shader program
var shaderMMatrix;
