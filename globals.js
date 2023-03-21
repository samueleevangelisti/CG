// canvas
var canvas;
// contesto grafico
var gl;

// vertici
var vertexObj;
// colori
var colorObj;
// array di vertici da passare a webgl
var vertexArr;
// array di colori da passare a webgl
var colorArr;

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
// angolo di rotazione intorno a y
var yRotationAngle;
// angolo di rotazione intorno a z
var zRotationAngle;
// angolo di rotazione intorno a x
var xRotationAngle;

// XXX TODO DSE ancora il flag è in fase di test
// spostamento del target invece che della camera
var isRotateCamera;

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
// projection matrix nello shader program
var shaderPMatrix;
// view matrix nello shader program
var shaderVMatrix;
// model matrix nello shader program
var shaderMMatrix;
// color buffer
var colorBuffer;
// vertex color nello shader program
var shaderVertexColor;
