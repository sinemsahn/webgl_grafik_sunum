var gl;
var indices;
var canvas;

var theta;
var thetaLoc;
var shaderProgram;
 function init() {

        /*============  canvas oluşturulur =================*/
      
  const canvas = document.getElementById('my_Canvas');
  gl = canvas.getContext('webgl');

  /*========== şeklin geometrik koorinatları =========*/

  var vertices = [
      -0.3,0.025,0.0, //0 vertex
      -0.3,-0.125,0.0, //1.vertex
      -0.250,-0.125,0.0, //2.
      -0.250,0.025,0.0,  //3.

      -0.250,0.025,0.0, //4 vertex
      -0.250,-0.025,0.0, //5.vertex //2.
      -0.1,-0.025,0.0,//6
      -0.1,0.025,0.0, //7

      -0.3,-0.125,0.0, //8 vertex
      -0.3,-0.175,0.0, //9.vertex
      -0.1,-0.175,0.0, //10.
      -0.1,-0.125,0.0,  // 11

      -0.150,-0.175,0.0, //12 vertex
      -0.150,-0.325,0.0, //13.vertex
      -0.1,-0.325,0.0, //14.
      -0.1,-0.175,0.0, //15

      -0.3,-0.275,0.0, //16 vertex
      -0.3,-0.325,0.0, //17.vertex
      -0.150,-0.325,0.0, //18.
      -0.150,-0.275,0.0, //19

      0,0.025,0.0, //20 vertex
      0,-0.325,0.0, //21.vertex
      0.05,-0.325,0.0, //22.
      0.05,0.025,0.0, //23

      0.05,0.025,0.0, //24 vertex
      0.05,-0.025,0.0, //25.vertex
      0.25,-0.325,0.0, //26.
      0.3,0.-0.325,0.0, //27

      0.25,0.025,0.0,
      0.25,-0.325,0.0, //28 vertex
      0.3,-0.325,0.0, //29.vertex
      0.3,0.025,0.0, //31

  ];

  indices = [3,2,1,3,1,0,7,6,5,7,5,4,11,10,9,11,9,8,15,14,13,15,13,12,19,18,17,19,17,16,23,22,21,23,21,20,27,26,25,27,25,24,31,30,29,31,29,28];
  var d = Math.random();
  var b = Math.random();
  var c = Math.random();
  a= [b,d,c];
 colors=[b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c,b,d,c];
  // Köşe arabelleğini depolamak için boş bir arabellek nesnesi oluşturun
  var vertex_buffer = gl.createBuffer();

  // Uygun bind bufferı  ona bağlayın
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Köşe verilerini arabelleğe iletin
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Arabelleği buffer çöz
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Index buffer için boş bffer
  var Index_Buffer = gl.createBuffer();

  // Uygun dizi tamponunu ona bağlayın
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

  // Köşe verilerini arabelleğe iletin
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  // Arabelleği çöz
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  var color_buffer = gl.createBuffer ();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  /*====================== Shaders =======================*/

  // Vertex shader source code
  
  var vertexShaderSource = document.querySelector("#vertex-shader").text;
  var fragmentShaderSource = document.querySelector("#fragment-shader").text;
  
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

 
 



  // Bir gölgelendirici program nesnesi oluşturun
   // birleşik gölgelendirici programını depolayın
   shaderProgram = gl.createProgram();

  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertexShader);

  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragmentShader);

  // Link both the programs
  gl.linkProgram(shaderProgram);

  // Use the combined shader program object
  gl.useProgram(shaderProgram);



  
  

  /* ======= Associating shaders to buffer objects =======*/

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Bind index buffer object
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); 

  // Get the attribute location
  var coord = gl.getAttribLocation(shaderProgram, "coordinates");

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coord);
  
// bind the color buffer
gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
         
// get the attribute location
var color = gl.getAttribLocation(shaderProgram, "color");

// point attribute to the volor buffer object
gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

// enable the color attribute
gl.enableVertexAttribArray(color);

  
  var slider = document.getElementById("x_myRange");
  var output = document.getElementById("x_demo");
  output.innerHTML = slider.value;

  slider.oninput = function() {
  output.innerHTML = this.value/100;
  }
  var sliderr = document.getElementById("y_myRange");
  var outputt = document.getElementById("y_demo");
  outputt.innerHTML = sliderr.value;

  sliderr.oninput = function() {
  outputt.innerHTML = this.value/100;
  }
   
   var Tx = output.innerHTML;
   var Ty = outputt.innerHTML;
   var  Tz = 0.0;
   var translation = gl.getUniformLocation(shaderProgram, 'translation');
   gl.uniform4f(translation, Tx, Ty, Tz, 0.0);

   var slider = document.getElementById("xs_myRange");
    var output = document.getElementById("xs_demo");
    output.innerHTML = slider.value;
 
    slider.oninput = function() {
    output.innerHTML = this.value/100;
    }
    var sliderr = document.getElementById("ys_myRange");
    var outputt = document.getElementById("ys_demo");
    outputt.innerHTML = sliderr.value;
 
    sliderr.oninput = function() {
    outputt.innerHTML = this.value/100;
    }
    var Sx = output.innerHTML;
    var Sy = outputt.innerHTML;
    var  Sz = 1.0;
    var xformMatrix = new Float32Array([
    Sx,   0.0,  0.0,  0.0,
    0.0,  Sy,   0.0,  0.0,
    0.0,  0.0,  Sz,   0.0,
    0.0,  0.0,  0.0,  1.0  
    ]);

    var u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    

    
    thetaLoc = gl.getUniformLocation(shaderProgram, "theta");
    theta = 0;
    gl.uniform1f(thetaLoc, theta);
    //setInterval(render,90);

    //rendera kullanıcıdan almış olduğunu göndermeli çizdirmeliyim
    var sli = document.getElementById("Range");
    var out = document.getElementById("demo");
    out.innerHTML = sli.value/100;

    sli.oninput = function() {
    out.innerHTML = this.value/100;
    }
    
    var degree = out.innerHTML;

   gl.clearColor(0.5, 0.5, 0.5, 0.9);
   render(degree);
  

    
  


  
  
 
}
init();


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);

}

function render(degree){
  
  
        gl.clear(gl.COLOR_BUFFER_BIT);
        theta = degree;
        gl.uniform1f(thetaLoc, theta);
         
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);


  
}

function rende(){
  
  
    gl.clear(gl.COLOR_BUFFER_BIT);
    //theta = degree;
    gl.uniform1f(thetaLoc, theta);
     
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);



}
function otele(){
   
    var slide = document.getElementById("x_myRange");
   var outpu = document.getElementById("x_demo");
   outpu.innerHTML = slide.value;

   slide.oninput = function() {
   outpu.innerHTML = this.value/100;
   }
   var slid = document.getElementById("y_myRange");
   var outp = document.getElementById("y_demo");
   outp.innerHTML = slid.value;

   slid.oninput = function() {
   outp.innerHTML = this.value/100;
   }
   
    var Tx = outpu.innerHTML/100;
    var Ty = outp.innerHTML/100;
    var  Tz = 0.0;
    var translation = gl.getUniformLocation(shaderProgram, 'translation');
    gl.uniform4f(translation, Tx, Ty, Tz, 0.0);
    //gl.clearColor(0.5, 0.5, 0.5, 0.9);
    rende();
  
}


function buyut(){
    //alert("tamam");
    var slider = document.getElementById("xs_myRange");
    var output = document.getElementById("xs_demo");
    output.innerHTML = slider.value;
 
    slider.oninput = function() {
    output.innerHTML = this.value/100;
    }
    var sliderr = document.getElementById("ys_myRange");
    var outputt = document.getElementById("ys_demo");
    outputt.innerHTML = sliderr.value;
 
    sliderr.oninput = function() {
    outputt.innerHTML = this.value/100;
    }
    var Sx = output.innerHTML/100;
    var Sy = outputt.innerHTML/100;
    var  Sz = 1.0;
    //alert(Sx);
    //alert(Sy);
    var xformMatrix = new Float32Array([
    Sx,   0.0,  0.0,  0.0,
    0.0,  Sy,   0.0,  0.0,
    0.0,  0.0,  Sz,   0.0,
    0.0,  0.0,  0.0,  1.0  
    ]);

    var u_xformMatrix = gl.getUniformLocation(shaderProgram, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    rende();

}
//https://www.geeksforgeeks.org/creating-range-slider-html-using-javascript/#:~:text=Range%20Sliders%20are%20used%20on,is%20represented%20as%20a%20slider.

function degre(){

    var sl = document.getElementById("Range");
    var ou = document.getElementById("demo");
    ou.innerHTML = sl.value/100;

    sl.oninput = function() {
    ou.innerHTML = this.value/100;
    }
    
    var degree = ou.innerHTML;

  //gl.clearColor(0.5, 0.5, 0.5, 0.9);
   render(degree);
}