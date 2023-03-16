var canvas;
var ctx;
var WIDTH = 500;
var HEIGHT = 500;
var dragok = false;

var loc, bbox;
var point=[]; 
var fxt=[], fyt=[]; //lista cp in coord. floating point
var ixt=[], iyt=[]; //lista cp in coord. intere
var vxp=[], vyp=[]; //lista punti curva in coord. floating point
var ixp=[], iyp=[]; //lista punti curva in coord. viewport
var n=5, np=0, flag=0;
var m=100; //vogliamo disegnare m+1 punti

var view = {
    vxmin: 0,
    vxmax: 0,
    vymin: 0,
    vymax: 0 }
var win = {
    wxmin: -1.0,
    wxmax: 1.0,
    wymin: -1.0,
    wymax: 1.0 }
var scx, scy;
var sxy=0.25;

function win_view(px,py,scx,scy,view,win) {
var ixp,iyp;
    ixp = scx * (px - win.wxmin) + view.vxmin;
    iyp = scy * (win.wymin - py) + view.vymax;
    return {ixp: ixp, iyp: iyp};
  }

function view_win(ixp,iyp,scx,scy,view,win) {
var px,py;
    px = (ixp - view.vxmin) / scx + win.wxmin;
    py = (view.vymax - iyp) / scy + win.wymin;
    return {px: px,py: py};
  }

function init() {
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext("2d");
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);
    view.vxmin=0;
    view.vxmax=canvas.width;
    view.vymin=0;
    view.vymax=canvas.height;
    scx=(view.vxmax-view.vxmin)/(win.wxmax-win.wxmin);
    scy=(view.vymax-view.vymin)/(win.wymax-win.wymin);
    document.getElementById("Button1").onclick = function(){
        win.wxmin=win.wxmin+sxy;
        win.wxmax=win.wxmax-sxy;
        win.wymin=win.wymin+sxy;
        win.wymax=win.wymax-sxy;
        console.log('window');
        console.log(win.wxmin,win.wxmax,win.wymin,win.wymax);
        scx=(view.vxmax-view.vxmin)/(win.wxmax-win.wxmin);
        scy=(view.vymax-view.vymin)/(win.wymax-win.wymin);
        convert();
    };
    document.getElementById("Button2").onclick = function(){
        win.wxmin=win.wxmin-sxy;
        win.wxmax=win.wxmax+sxy;
        win.wymin=win.wymin-sxy;
        win.wymax=win.wymax+sxy;
        console.log('window');
        console.log(win.wxmin,win.wxmax,win.wymin,win.wymax);
        scx=(view.vxmax-view.vxmin)/(win.wxmax-win.wxmin);
        scy=(view.vymax-view.vymin)/(win.wymax-win.wymin);
        convert();
    };
    return setInterval(draw, 10);
 }

function restart(){
    np=0;
    flag=0;
    clear();
}

function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: Math.round(x - bbox.left * (canvas.width  / bbox.width)),
             y: Math.round(y - bbox.top  * (canvas.height / bbox.height))
           };
}

function draw() {
   if (flag==1){
      clear();
      ctx.fillStyle = "#FAF7F8";
      rect(0,0,WIDTH,HEIGHT);

      ctx.strokeStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(ixt[0],iyt[0]);
      for (var i=1;i<n;i++)
        ctx.lineTo(ixt[i],iyt[i]);
      ctx.stroke();

      for (var i=0;i<n;i++) 
        draw_marker(ixt[i],iyt[i]);

      draw_bezier();
   }
}

//algoritmo di de Casteljau per valutazione
//curva di Bézier di grado generico n in coordinate floating point
function compute_bezier(){
    var h=1/m;
    var fxp=[], fyp=[]; //copia dei cp per de Casteljau
    var t,d1,d2; 

//primo punto della curva
    vxp[0]=fxt[0];
    vyp[0]=fyt[0];
//calcola gli m-1 punti interni
    for (var k=1; k<m; k++){
        fxp=Array.from(fxt);
        fyp=Array.from(fyt);
        t=k*h;
        d1=t;
        d2=1.0-t;
        for (var j=1; j<n; j++)
           for (var i=0; i<n-j; i++){
              fxp[i]=d1*fxp[i+1]+d2*fxp[i];
              fyp[i]=d1*fyp[i+1]+d2*fyp[i]; 
        }
        vxp[k]=fxp[0];
        vyp[k]=fyp[0];
    }
//ultimo punto della curva
   vxp[m]=fxt[n-1];
   vyp[m]=fyt[n-1];
   convert();
}

function convert(){
var p;
    for (var k=0; k<n; k++){
      p=win_view(fxt[k],fyt[k],scx,scy,view,win);
      ixt[k]=p.ixp;
      iyt[k]=p.iyp;
    }
    for (var k=0; k<=m; k++){
      p=win_view(vxp[k],vyp[k],scx,scy,view,win);
      ixp[k]=p.ixp;
      iyp[k]=p.iyp;
   }
}
 

//algoritmo di de Casteljau per valutazione
//curva di Bézier di grado generico n
function draw_bezier(){
var p;
    ctx.strokeStyle ="#000000";
    ctx.beginPath();
//     p=win_view(vxp[0],vyp[0],scx,scy,view,win);
//     ctx.moveTo(p.ixp,p.iyp);
// //disegna gli m segmenti definiti dagli m+1 punti campioni dalla curva
//     for (var k=1; k<=m; k++){
//         p=win_view(vxp[k],vyp[k],scx,scy,view,win);
//         ctx.lineTo(p.ixp,p.iyp);
//     }
    ctx.moveTo(ixp[0],iyp[0]);
    for (var k=1; k<=m; k++)
       ctx.lineTo(ixp[k],iyp[k]);
    ctx.stroke();
  }

function draw_marker(pAx, pAy){
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(pAx, pAy, 4, 0, Math.PI*2, true); 
    ctx.fill();
}

function draw_line(pAx, pAy, pBx, pBy){
    //  ctx.strokeStyle = "#0095cd";
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(pAx,pAy);
    ctx.lineTo(pBx,pBy);
    ctx.stroke();
}

function myMove(e){
var fp;
 if (dragok){
   for (i=0; i<n; i++)
     if (point[i]){
       loc = windowToCanvas(canvas,e.pageX,e.pageY);
       ixt[i]=loc.x;
       iyt[i]=loc.y;
       fp=view_win(ixt[i],iyt[i],scx,scy,view,win);
       fxt[i]=fp.px;
       fyt[i]=fp.py;
     }
     compute_bezier();
 }
}

function myUp(){
    point=[];
    dragok = false;
//    canvas.onmousemove = null;
}

function myDown(e){
var fp; 
    if (np==0){
        flag=0;
        clear();
    }
    if (np<n && flag==0) {  
       loc = windowToCanvas(canvas,e.pageX,e.pageY);
       ixt[np]=loc.x;
       iyt[np]=loc.y;
       if (np>0)
          draw_line(ixt[np-1],iyt[np-1],ixt[np],iyt[np]);
       // disegna punto selezionato
       draw_marker(ixt[np], iyt[np]); 
       np++;
   
       if(np==n)   {
           for (var i=0; i<n; i++){
               fp=view_win(ixt[i],iyt[i],scx,scy,view,win);
               fxt[i]=fp.px;
               fyt[i]=fp.py;
           }
// disegna poligonale fra 10 millisecondi
          compute_bezier();
          flag=1;
       }
    }
    else{
        point=[];
        for (var i=0; i<n; i++)
         if (e.pageX < ixt[i] + 5 + canvas.offsetLeft && e.pageX > ixt[i] - 5 +
            canvas.offsetLeft && e.pageY < iyt[i] + 5 + canvas.offsetTop &&
            e.pageY > iyt[i] -5 + canvas.offsetTop){
            loc = windowToCanvas(canvas,e.pageX,e.pageY);
            ixt[i]=loc.x;
            iyt[i]=loc.y;
            fp=view_win(ixt[i],iyt[i],scx,scy,view,win);
            fxt[i]=fp.px;
            fyt[i]=fp.py;
            point[i] = true;
        }
        compute_bezier();
        dragok=true;
//         canvas.onmousemove = myMove;
    }
}

init();
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;
