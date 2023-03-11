window.addEventListener('load', (event) => {
  // Inizializzazione contesto grafico
  let canvas = document.getElementById('my-canvas'); 
  let gl = canvas.getContext('experimental-webgl');

  ////////////////////////////// Geometria del cubo //////////////////////////////

  // Definizione dei vertici
  let vertexArr = [
    -1, -1, -1,      1, -1, -1,      1, 1, -1,      -1, 1, -1,
    -1, -1, 1,       1, -1, 1,       1, 1, 1,       -1, 1, 1,
    -1, -1, -1,      -1, 1, -1,      -1, 1, 1,      -1, -1, 1,
    1, -1, -1,       1, 1, -1,       1, 1, 1,       1, -1, 1,
    -1, -1, -1,      -1, -1, 1,      1, -1, 1,      1, -1, -1,
    -1, 1, -1,       -1, 1, 1,       1, 1, 1,       1, 1, -1
  ];

  // Definizioe delle facce
  let indexArr = [
    0, 1, 2,         0, 2, 3,
    4, 5, 6,         4, 6, 7,
    8, 9, 10,        8, 10, 11,
    12, 13, 14,      12, 14, 15,
    16, 17, 18,      16, 18, 19,
    20, 21, 22,      20, 22, 23
  ];

  // Definizione dei colori
  let colorArr = [
    1, 0, 1,      1, 0, 1,      1, 0, 1,      1, 0, 1,
    1, 0, 0,      1, 0, 0,      1, 0, 0,      1, 0, 0,
    0 ,0, 1,      0, 0, 1,      0, 0, 1,      0, 0, 1,
    0, 1, 1,      0, 1, 1,      0, 1, 1,      0, 1, 1,
    1, 1, 0,      1, 1, 0,      1, 1, 0,      1, 1, 0,
    0, 1, 0,      0, 1, 0,      0, 1, 0,      0, 1, 0
  ];

  ////////////////////////////// Buffer //////////////////////////////

  // Vertex buffer
  let vertexBuffer = gl.createBuffer (); 
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexArr), gl.STATIC_DRAW);

  // Index buffer
  let indexBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer); 
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArr), gl.STATIC_DRAW);

  // Color buffer
  let colorBuffer = gl.createBuffer(); 
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer); 
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorArr), gl.STATIC_DRAW);

////////////////////////////// Shader //////////////////////////////

  // Vertex
  let vertexCode =
    'uniform mat4 PMatrix;' +
    'uniform mat4 VMatrix;' +
    'uniform mat4 MMatrix;' +
    'attribute vec3 position;' +
    'attribute vec3 color;' +
    'varying vec3 vColor;' +
    'void main(void) {' +
      'gl_Position = PMatrix*VMatrix*MMatrix*vec4(position, 1.0);' +
      'vColor = color;' +
    '}';
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexCode);
  gl.compileShader(vertexShader);

  // Fragment
  let fragmentCode =
    'precision mediump float;' +
    'varying vec3 vColor;' +
    'void main(void) {' +
      'gl_FragColor = vec4(vColor, 1.0);' +
    '}';
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentCode);
  gl.compileShader(fragmentShader);

  // Program
  let shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // Matrici uniform
  let PMatrix = gl.getUniformLocation(shaderProgram, "PMatrix"); 
  let VMatrix = gl.getUniformLocation(shaderProgram, "VMatrix"); 
  let MMatrix = gl.getUniformLocation(shaderProgram, "MMatrix");

  // Position
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  let position = gl.getAttribLocation(shaderProgram, "position");
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(position);

  // Color
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  let color = gl.getAttribLocation(shaderProgram, "color"); 
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
  gl.enableVertexAttribArray(color);

  // Uso del program
  gl.useProgram(shaderProgram);

  ////////////////////////////// Matrix //////////////////////////////

  // Credit: Giulio Casciola
  function getProjection(angle, a, zMin, zMax) {
    let ang = Math.tan(0.5 * angle * Math.PI / 180);// 0.5*angle
    return [
      1 / (a * ang), 0,       0,                                  0,
      0,             1 / ang, 0,                                  0,
      0,             0,       -(zMax + zMin) / (zMax - zMin),     -1,
      0,             0,       -(2 * zMax * zMin) / (zMax - zMin), 0
    ];
  } 

  ////////////////////////////// Rotation //////////////////////////////

  // Credit: Giulio Casciola
  function rotateZ(m, angle) {
  let c = Math.cos(angle);
  let s = Math.sin(angle);
  let mv0 = m[0];
  let mv4 = m[4];
  let mv8 = m[8];
  m[0] = c * m[0] - s * m[1];
  m[4] = c * m[4] - s * m[5];
  m[8] = c * m[8] - s * m[9];
  m[1] = c * m[1] + s * mv0;
  m[5] = c * m[5] + s * mv4;
  m[9] = c * m[9] + s * mv8;
  }

  // Credit: Giulio Casciola
  function rotateX(m, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let mv1 = m[1];
    let mv5 = m[5];
    let mv9 = m[9];
    m[1] = m[1] * c - m[2] * s;
    m[5] = m[5] * c - m[6] * s;
    m[9] = m[9] * c - m[10] * s;
    m[2] = m[2] * c + mv1 * s;
    m[6] = m[6] * c + mv5 * s;
    m[10] = m[10] * c + mv9 * s;
  }

function rotateY(m, angle) {
var c=Math.cos(angle);
var s=Math.sin(angle);
var mv0=m[0], mv4=m[4], mv8=m[8]; m[0]=c*m[0]+s*m[2]; m[4]=c*m[4]+s*m[6]; m[8]=c*m[8]+s*m[10];
   m[2]=c*m[2]-s*mv0;
   m[6]=c*m[6]-s*mv4;
   m[10]=c*m[10]-s*mv8;
}

/*================= Drawing ===========================*/ 

var animate=function(time) {
  var dt=time-time_old; 
  rotateZ(mov_matrix, dt*0.0005);//time 
  rotateY(mov_matrix, dt*0.0005); 
  rotateX(mov_matrix, dt*0.0005);
  time_old=time;
  gl.enable(gl.DEPTH_TEST); 
  gl.depthFunc(gl.LEQUAL); 
  gl.clearColor(0.75, 0.75, 0.75, 7.5); 
  gl.clearDepth(1.0);
  gl.viewport(0.0, 0.0, canvas.width, canvas.height); 
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
  gl.uniformMatrix4fv(PMatrix, false, proj_matrix); 
  gl.uniformMatrix4fv(VMatrix, false, view_matrix); 
  gl.uniformMatrix4fv(MMatrix, false, mov_matrix);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.drawElements(gl.TRIANGLES, indexArr.length, gl.UNSIGNED_SHORT, 0);
  window.requestAnimationFrame(animate); 
}

var mov_matrix=
  [1,0,0,0,
   0,1,0,0,
   0,0,1,0,
   0,0,0,1];

var proj_matrix=getProjection(40, canvas.width/canvas.height, 1, 100);

var view_matrix=
  [1,0,0,0,
   0,1,0,0,
   0,0,1,0,
   0,0,0,1];
// translating z 
view_matrix[14]=view_matrix[14]-5;//zoom

var time_old=0;

animate(0);
});
