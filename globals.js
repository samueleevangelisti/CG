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
  vertexObj: {},
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
    [0, 0, 0, 1], [5, 0, 0, 1],
    [0, 0, 0, 1], [0, 5, 0, 1],
    [0, 0, 0, 1], [0, 0, 5, 1]
  ],
  surfaceNormalArr: [
    [0, 0, 0], [0, 0, 0],
    [0, 0, 0], [0, 0, 0],
    [0, 0, 0], [0, 0, 0]
  ],
  normalArr: [
    [0, 0, 0], [0, 0, 0],
    [0, 0, 0], [0, 0, 0],
    [0, 0, 0], [0, 0, 0]
  ],
  // array di colori da passare a webgl
  colorArr: [
    [1, 0, 0, 1], [1, 0, 0, 1],
    [0, 1, 0, 1], [0, 1, 0, 1],
    [0, 0, 1, 1], [0, 0, 1, 1]
  ],
  // array di coordinate della texture
  textureArr: [
    [0, 0], [0, 0],
    [0, 0], [0, 0],
    [0, 0], [0, 0]
  ]

  // ---------- parametri prospettici ----------

  // ---------- shader program ----------
};

// ---------- parametri prospettici ----------

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
// angolo rispetto all'asse x sul piano xy
var theta;
// angolo rispetto all'asse z sul piano zx
var phi;
// obiettivo della camera
var target;
// vettore view up
var viewUp;
// posizione della camera
var cameraPosition;

// ---------- shader program ----------

// shader program
var shaderProgram;
// vertex buffer
var vertexBuffer;
// vertex position nello shader program
var shaderVertexPosition;
// surface normal buffer
var surfaceNormalBuffer;
// surface normal nello shader program
var shaderVertexSurfaceNormal;
// normal buffer
var normalBuffer;
// vertex normal nello shader program
var shaderVertexNormal;
// color buffer
var colorBuffer;
// vertex color nello shader program
var shaderVertexColor;
// buffer di coordinate della texture
var textureBuffer;
// coordinate della texture nello shader program
var shaderVertexTexture;
// isLight nello shader program
var shaderIsLight;
// camera position nello shader program
var shaderCameraPosition;
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

// TODO DSE tentativo con la luce
// posizione della luce
var lightPosition = [5, 5, 5];
// posizione della luce nello shader program
var shaderLightPosition;
// materiale per luce ambientale
var materialAmbient = [0.02, 0.02, 0.02, 1];
// materiale per luce ambientale nello shader program
var shaderMaterialAmbient;
// luce ambientale
var lightAmbient;
// luce ambientale nello shader program
var shaderLightAmbient;
// materiale per luce diffusa
var materialDiffuse = [0.4, 0.4, 0.4, 1];
// materiale per luce diffusa nello shader program
var shaderMaterialDiffuse;
// luce diffusa
var lightDiffuse = [1, 1, 1, 1];
// luce diffusa nello shader program
var shaderLightDiffuse;
// materiale per luce speculare
var materialSpecular = [0.774597, 0.774597, 0.774597, 1];
// material per luce speculare nello shader program
var shaderMaterialSpecular;
