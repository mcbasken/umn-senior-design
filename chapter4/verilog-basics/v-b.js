// Verilog Concepts Microsim (p5.js-based interactive simulation with practice mode)
let mode = 0;
let modes = ["Introduction", "Syntax & Structure", "Data Types", "Module Instantiation", "I/O Ports", "Practice"];
let switchBtn, nextBtn, prevBtn;
let currentLine = 0;
let slideLines = [];
let userInput, submitBtn, feedback = "";

function setup() {
  let canvas = createCanvas(500, 420);
  canvas.parent("canvas-container");
  textAlign(LEFT, CENTER);
  textSize(14);

  switchBtn = createButton("Switch Topic");
  switchBtn.position(20, 380);
  switchBtn.size(100, 25);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
    currentLine = 0;
    generateSlide();
    resetPractice();
  });

  prevBtn = createButton("← Prev");
  prevBtn.position(140, 380);
  prevBtn.size(70, 25);
  prevBtn.mousePressed(() => {
    if (currentLine > 0) currentLine--;
  });

  nextBtn = createButton("Next →");
  nextBtn.position(220, 380);
  nextBtn.size(70, 25);
  nextBtn.mousePressed(() => {
    if (currentLine < slideLines.length - 1) currentLine++;
  });

  userInput = createInput();
  userInput.position(40, 380);
  userInput.size(300);
  userInput.hide();

  submitBtn = createButton("Submit");
  submitBtn.position(350, 380);
  submitBtn.size(70, 25);
  submitBtn.mousePressed(checkPractice);
  submitBtn.hide();

  generateSlide();
}

function draw() {
  background(245);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text(modes[mode], width / 2, 30);
  textSize(14);
  textAlign(LEFT);

  if (mode === 5) {
    drawPractice();
  } else {
    for (let i = 0; i <= currentLine && i < slideLines.length; i++) {
      fill(i === currentLine ? "red" : 0);
      text(slideLines[i], 40, 70 + i * 20);
    }
  }
}

function generateSlide() {
  slideLines = [];
  switch (mode) {
    case 0:
      slideLines.push("Verilog is a hardware description language (HDL).");
      slideLines.push("It models the structure and behavior of digital circuits.");
      slideLines.push("You can simulate functionality before physical implementation.");
      slideLines.push("Used in FPGAs, ASICs, and system modeling.");
      break;
    case 1:
      slideLines.push("module and_gate(input A, input B, output Y);");
      slideLines.push("  assign Y = A & B;");
      slideLines.push("endmodule");
      slideLines.push("Modules encapsulate logic with inputs and outputs.");
      slideLines.push("Use semicolons and 'endmodule' to define structure.");
      break;
    case 2:
      slideLines.push("reg [7:0] byte_reg;   // Stores 8-bit value");
      slideLines.push("wire valid_signal;    // Combinational signal");
      slideLines.push("integer counter;      // Used in testbenches");
      slideLines.push("real delay_time;      // Simulation only");
      slideLines.push("'reg' holds values; 'wire' is for connections.");
      break;
    case 3:
      slideLines.push("// Define module");
      slideLines.push("module inverter(input A, output Y);");
      slideLines.push("  assign Y = ~A;");
      slideLines.push("endmodule");
      slideLines.push("// Instantiate module");
      slideLines.push("inverter u1 (.A(signal_in), .Y(signal_out));");
      slideLines.push("Instantiation allows reuse of logic blocks.");
      break;
    case 4:
      slideLines.push("module my_module(");
      slideLines.push("  input clk,");
      slideLines.push("  input rst,");
      slideLines.push("  output reg done");
      slideLines.push(");");
      slideLines.push("// Internal logic goes here");
      slideLines.push("endmodule");
      slideLines.push("Use input/output/inout to define communication.");
      break;
  }
  userInput.hide();
  submitBtn.hide();
}

function drawPractice() {
  textAlign(LEFT);
  fill(0);
  text("Practice Mode: Complete the Verilog statement.", 40, 80);
  text("Question: What keyword defines a block of hardware logic?", 40, 120);
  userInput.show();
  submitBtn.show();
  fill(feedback === "Correct!" ? "green" : "red");
  text(feedback, 40, 160);
}

function checkPractice() {
  const answer = userInput.value().trim().toLowerCase();
  if (answer === "module") {
    feedback = "Correct!";
  } else {
    feedback = "Try again. Hint: starts with 'm'.";
  }
}

function resetPractice() {
  feedback = "";
  userInput.hide();
  submitBtn.hide();
}
