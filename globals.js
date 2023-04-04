var globals = {

  // ---------- contesto grafico ----------

  // canvas
  canvas: null,
  // contesto grafico
  gl: null,

  // ---------- geometria 3d ----------

  // struttura gnerale contenente gli items visualizzati
  itemObj: {},
  // vertici
  vertexObj: {
    O: [0, 0, 0, 1]
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

  // ---------- array buffer ----------

  // array di vertici da passare a webgl
  vertexArr: [
    [0, 0, 0, 1],
    [5, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 5, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 5, 1]
  ],
  normalArr: [
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ],
  // array di colori da passare a webgl
  colorArr: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 0, 1],
    [0, 1, 0, 1],
    [0, 0, 1, 1],
    [0, 0, 1, 1]
  ],
  // array di coordinate della texture
  textureArr: [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0]
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
// posizione della camera
var cameraPosition;

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
// flag se la texture è abilitata
var shaderIsTexture;
// texture nello shader program
var shaderTexture;
// texture caricata
var texture;
