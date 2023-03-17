// creazione canvas
var canvas = document.getElementById('my-canvas');
gl = canvas.getContext('webgl');

////////////////////////////// geometria //////////////////////////////

// definizione dei vertici
var vertices = [
   -1,-1,-1,   1,-1,-1,   1,1,-1,   -1,1,-1,
   -1,-1,1,   1,-1,1,   1,1,1,   -1,1,1,
   -1,-1,-1,   -1,1,-1,   -1, 1,1,   -1,-1,1,
   1,-1,-1,   1,1,-1,   1,1,1,   1,-1,1,
   -1,-1,-1,   -1,-1,1,   1,-1,1,   1,-1,-1,
   -1,1,-1,   -1,1,1,   1,1,1,   1,1,-1
];

// definizione delle facce
var indices = [
   0,1,2,   0,2,3,
   4,5,6,   4,6,7,
   8,9,10,   8,10,11,
   12,13,14,   12,14,15,
   16,17,18,   16,18,19,
   20,21,22,   20,22,23
];

// definizione dei colori
var colors = [
   1,0,1,    1,0,1,    1,0,1,    1,0,1,
   1,0,0,    1,0,0,    1,0,0,    1,0,0,
   0,0,1,    0,0,1,    0,0,1,    0,0,1,
   0,1,1,    0,1,1,    0,1,1,    0,1,1,
   1,1,0,    1,1,0,    1,1,0,    1,1,0,
   0,1,0,    0,1,0,    0,1,0,    0,1,0
];

////////////////////////////// buffer //////////////////////////////

// creazione vertex buffer
var vertex_buffer = gl.createBuffer(); 
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); 
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// creazione index buffer
var index_buffer= gl.createBuffer(); 
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer); 
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW); 

// creazione color buffer
var color_buffer = gl.createBuffer(); 
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer); 
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

////////////////////////////// programma //////////////////////////////

// creazione shader program
var shaderprogram = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"]);

////////////////////////////// variabili webgl //////////////////////////////
    
// associazione attributi al vertex shader
var _Pmatrix = gl.getUniformLocation(shaderprogram, "Pmatrix"); 
var _Vmatrix = gl.getUniformLocation(shaderprogram, "Vmatrix"); 
var _Mmatrix = gl.getUniformLocation(shaderprogram, "Mmatrix");

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
var _position = gl.getAttribLocation(shaderprogram, "position"); 
gl.vertexAttribPointer(_position, 3, gl.FLOAT, false,0,0); 
gl.enableVertexAttribArray(_position);

// associazione attributi al fragment shader
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
var _color = gl.getAttribLocation(shaderprogram, "color"); 
gl.vertexAttribPointer(_color, 3, gl.FLOAT, false,0,0) ; 
gl.enableVertexAttribArray(_color);

gl.useProgram(shaderprogram);   

////////////////////////////// utility //////////////////////////////

// conversione gradi a radianti
function degToRad(angle) {
   return angle * Math.PI / 180;
}

////////////////////////////// variabili globali //////////////////////////////

// rotazione rispetto all'asse y
var yRotationAngle = 0;

// rotazione rispetto all'asse x
var xRotationAngle = 0;

// rotazione rispetto all'asse z
var zRotationAngle = 0;

// definizione della projection matrix tramite libreria m4.js
var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
var zNear = 1;
var zFar = 100;
var fov = 40;
var proj_matrix = m4.perspective(degToRad(fov), aspect, zNear, zFar);

// definizione della view matrix tramite m4.js
var THETA = 0;
var PHI = 0;
var D = 5;
// posizione della camera
var camera = [
   D * Math.sin(PHI) * Math.cos(THETA),
   D * Math.sin(PHI) * Math.sin(THETA),
   D * Math.cos(PHI)
];
// target della camera
var target = [0, 0, 0];
// view up vector
var up = [0, 1, 0];
// view matrix
var view_matrix = m4.inverse(m4.lookAt(camera, target, up));

gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix); 
gl.uniformMatrix4fv(_Vmatrix, false, view_matrix); 

////////////////////////////// button handlers //////////////////////////////
var interval;
var intervalDelta = 10;
var angleDelta = 1;

function buttonOnMouseDown(fn, paramArr) {
   fn(...paramArr);
   interval = setInterval(fn, intervalDelta, ...paramArr);
}

function buttonOnMouseUp() {
   clearInterval(interval);
}

function rotateYButtonOnClick(direction) {
   yRotationAngle += (direction * degToRad(angleDelta));
}

function rotateXButtonOnClick(direction) {
   xRotationAngle += (direction * degToRad(angleDelta));
}

function rotateZButtonOnClick(direction) {
   zRotationAngle += (direction * degToRad(angleDelta));
}

/*================= Mouse events ======================*/
 var AMORTIZATION=0.95;
 var drag=false;
 var old_x, old_y;
 var dX=0, dY=0;

 var mouseDown=function(e) {
    drag=true;
    old_x=e.pageX, old_y=e.pageY;
    e.preventDefault();
    return false;
 };
var mouseUp=function(e){
   drag=false;
};
var mouseMove=function(e) {
if (!drag) return false; 
dX=(e.pageX-old_x)*2*Math.PI/canvas.width, 
dY=(e.pageY-old_y)*2*Math.PI/canvas.height; 
THETA+=dX;
PHI+=dY;
old_x=e.pageX, old_y=e.pageY; 
e.preventDefault();
};

canvas.onmousedown=mouseDown;
canvas.onmouseup=mouseUp;
canvas.mouseout=mouseUp;
canvas.onmousemove=mouseMove;

var time_old = 0;

function render(time) {
   var dt = time - time_old;
      // if (!drag) {
      //    dX*=AMORTIZATION, dY*=AMORTIZATION;
      //    THETA+=dX, PHI+=dY;
      // }

   // definizione delle rotazioni tramite la libreria m4.js
   var mo_matrix = [];
   m4.identity(mo_matrix);
   m4.yRotate(mo_matrix, yRotationAngle, mo_matrix);
   m4.xRotate(mo_matrix, xRotationAngle, mo_matrix);
   m4.zRotate(mo_matrix, zRotationAngle, mo_matrix);

   time_old = time;          
   gl.enable(gl.DEPTH_TEST);
   // gl.depthFunc(gl.LEQUAL); 
   gl.clearColor(0.75, 0.75, 0.75, 1); 
   gl.clearDepth(1.0);
   gl.viewport(0.0, 0.0, canvas.width, canvas.height); 
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   // gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix); 
   // gl.uniformMatrix4fv(_Vmatrix, false, view_matrix); 
   gl.uniformMatrix4fv(_Mmatrix, false, mo_matrix);

   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);

   gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

   window.requestAnimationFrame(render); 
}

render(0);