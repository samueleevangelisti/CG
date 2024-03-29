var globals = {
  // ---------- contesto grafico ----------

  // canvas
  canvas: null,
  // contesto grafico
  gl: null,
  // costanti per le texture unit
  textureUnitArr: [],

  // ---------- geometria 3d ----------

  // Array contenente le texture
  textureSourceArr: [
    'resources/gioconda.avif'
  ],
  // struttura gnerale contenente gli items visualizzati
  itemObj: {},

  // ---------- array buffer ----------

  // array di vertici da passare a webgl
  vertexArr: [
    [0, 0, 0], [5, 0, 0],
    [0, 0, 0], [0, 5, 0],
    [0, 0, 0], [0, 0, 5]
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
  ],

  // ---------- parametri prospettici ----------

  // campo visivo rispetto all'asse y
  fovy: 0,
  // distanza minima renderizzata
  near: 0,
  // distanza massima renderizzata
  far: 1,
  // distanza della camera
  distance: 0,
  // angolo rispetto all'asse x sul piano xy
  theta: 0,
  // angolo rispetto all'asse z sul piano zx
  phi: 0,
  // obiettivo della camera
  target: [0, 0, 0],
  // vettore view up
  viewUp: [0, 0, 0],
  // posizione della camera
  cameraPosition: [0, 0, 0],

  // ---------- luce ----------

  // attivazione della luce
  isLight: true,
  // posizione della luce
  lightPosition: [0, 0, 0],
  // colore della luce
  lightColor: [0, 0, 0, 0],
  // luce ambientale
  lightAmbient: 0,

  // ---------- shader program ----------

  // shader program
  shaderProgram: null,
  // vertex buffer
  vertexBuffer: null,
  // vertex position nello shader program
  shaderVertexPosition: null,
  // surface normal buffer
  surfaceNormalBuffer: null,
  // surface normal nello shader program
  shaderVertexSurfaceNormal: null,
  // normal buffer
  normalBuffer: null,
  // vertex normal nello shader program
  shaderVertexNormal: null,
  // color buffer
  colorBuffer: null,
  // vertex color nello shader program
  shaderVertexColor: null,
  // buffer di coordinate della texture
  textureBuffer: null,
  // coordinate della texture nello shader program
  shaderVertexTexture: null,
  // posizione della luce nello shader program
  shaderLightPosition: null,
  // projection matrix nello shader program
  shaderPMatrix: null,
  // view matrix nello shader program
  shaderVMatrix: null,
  // model matrix nello shader program
  shaderMMatrix: null,
  // matrice m solo di rotazione nello shader program
  shaderMRMatrix: null,
  // isFlat nello shader program
  shaderIsFlat: null,
  // flag se la texture è abilitata
  shaderIsTexture: null,
  // isLight nello shader program
  shaderIsLight: null,
  // camera position nello shader program
  shaderCameraPosition: null,
  // colore della luce nello shader program
  shaderLightColor: null,
  // material emissive nello shader program
  shaderMaterialEmissive: null,
  // materiale per luce ambientale nello shader program
  shaderMaterialAmbient: null,
  // luce ambientale nello shader program
  shaderLightAmbient: null,
  // materiale per luce diffusa nello shader program
  shaderMaterialDiffuse: null,
  // material per luce speculare nello shader program
  shaderMaterialSpecular: null,
  // shininess nello shader program
  shaderShininess: null,
  // opacità nello shader program
  shaderOpacity: null,
  // texture nello shader program
  shaderTexture: null
};
