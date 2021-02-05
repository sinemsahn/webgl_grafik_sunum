var gl;
var theta;
var thetaLoc;

window.onload = function init() {

    const canvas = document.querySelector("#glcanvas");
    // Initialize the GL context
     gl = canvas.getContext("webgl");
    // Only continue if WebGL is available and working
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }


    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //initial square vertex coordianes
        var vertices = [
            vec2(-0.6, -0.6), 
            vec2(0.6, -0.6),
            vec2(0.6, 0.6),
            vec2(-0.6, 0.6)
        ];

    
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); //current buffer� de�i�tiren bu
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);


    thetaLoc = gl.getUniformLocation(program, "theta");
    theta = 0;
    gl.uniform1f(thetaLoc, theta); //burada e�er olmazasa s�k�nt� olabilir s�nersin l-1 fark�ndan 

    // Set clear color to black, fully opaque
    gl.clearColor(1.0, 1.0, 1.0, 1.0); //bu arka plan rengi i�in
    setInterval(render, 60);


};
function render() {
    
        gl.clear(gl.COLOR_BUFFER_BIT);
        theta += 0.1;
        gl.uniform1f(thetaLoc, theta);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);

       // render();


}




//vertex olanlar felan triangles olan �iezce�in �ekli de�i�tiriyorsun onun d���na
//hepsi ayn� atama i�lemleri i�in
