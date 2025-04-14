// Verilog Concepts Microsim (p5.js-based simulation)
// Covers Syntax, Data Types, Modules, I/O
let mode = 0;
let modes = ["Syntax & Structure", "Data Types", "Module Instantiation", "I/O Ports"];

let switchBtn;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  switchBtn = createButton("Switch Mode");
  switchBtn.position((width - 100) / 2, 360);
  switchBtn.size(100, 25);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });

  createP("Use the button to explore Verilog concepts interactively.")
    .style("font-size", "12px").position(10, 380);
}

function draw() {
  background(250);
  textSize(16);
  text(modes[mode], width / 2, 30);
  textSize(14);

  switch (mode) {
    case 0: drawSyntax(); break;
    case 1: drawDataTypes(); break;
    case 2: drawModuleInstantiation(); break;
    case 3: drawIOPorts(); break;
  }
}

function drawSyntax() {
  textAlign(LEFT);
  text("module and_gate(input A, input B, output Y);", 20, 80);
  text("  assign Y = A & B;", 20, 100);
  text("endmodule", 20, 120);

  textAlign(CENTER);
  text("Modules define design blocks.", width / 2, 180);
  text("Use semicolons and endmodule.", width / 2, 200);
}

function drawDataTypes() {
  textAlign(LEFT);
  text("reg [7:0] byte_reg;", 20, 80);
  text("wire valid_signal;", 20, 100);
  text("integer count;", 20, 120);
  text("real delay_time;", 20, 140);

  textAlign(CENTER);
  text("'reg' holds state; 'wire' is combinational.", width / 2, 200);
  text("'integer' and 'real' used in simulation.", width / 2, 220);
}

function drawModuleInstantiation() {
  textAlign(LEFT);
  text("// Define", 20, 60);
  text("module inverter(input A, output Y);", 20, 80);
  text("  assign Y = ~A;", 20, 100);
  text("endmodule", 20, 120);

  text("// Instantiate", 20, 160);
  text("inverter u1 (.A(signal_in), .Y(signal_out));", 20, 180);

  textAlign(CENTER);
  text("Modules can be reused by instantiating them.", width / 2, 240);
}

function drawIOPorts() {
  textAlign(LEFT);
  text("module my_module(", 20, 60);
  text("  input clk,", 20, 80);
  text("  input rst,", 20, 100);
  text("  output reg done", 20, 120);
  text(");", 20, 140);

  textAlign(CENTER);
  text("Ports define module interfaces.", width / 2, 200);
  text("Use input/output/inout in headers.", width / 2, 220);
}
