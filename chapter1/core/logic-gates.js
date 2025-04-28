let inputA = 0;
let inputB = 0;
let selectedGate = "AND";
let gateOptions = ["AND", "OR", "XOR", "NOT"];
let gateIndex = 0; // Tracks current selected gate

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  fill(0);
  text("Logic Gate Simulation", width/2, 30);

  // Draw Inputs
  drawInput(100, 150, "A", inputA);
  drawInput(100, 300, "B", inputB);

  // Draw wires from Inputs to Gate
  stroke(0);
  strokeWeight(2);
  
  // Wire from A
  line(125, 150, 250, 150);   // horizontal
  line(250, 150, 250, 200);   // vertical down
  line(250, 200, 350, 200);   // horizontal into gate

  // Wire from B
  line(125, 300, 250, 300);   // horizontal
  line(250, 300, 250, 250);   // vertical up
  line(250, 250, 350, 250);   // horizontal into gate

  // Gate block
  drawGate(400, 225, selectedGate);

  // Wire from Gate to Output
  line(450, 225, 600, 225);   // horizontal wire

  // Output circle
  let output = calculateOutput(inputA, inputB, selectedGate);
  drawOutput(650, 225, output);

  // Draw Gate Selector inside canvas
  drawGateSelector();
}

function drawInput(x, y, label, value) {
  fill(value ? 'limegreen' : 'red');
  ellipse(x, y, 50, 50);
  fill(0);
  text(label, x, y - 40);
  text(value, x, y);
}

function drawGate(x, y, type) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(x - 50, y - 40, 100, 80, 20);
  fill(0);
  noStroke();
  text(type, x, y);
}

function drawOutput(x, y, value) {
  fill(value ? 'limegreen' : 'red');
  ellipse(x, y, 50, 50);
  fill(255);
  text(value, x, y);
}

function drawGateSelector() {
  fill(255);
  stroke(0);
  rect(width/2 - 80, height - 70, 160, 40, 8);
  fill(0);
  noStroke();
  text("Gate: " + selectedGate, width/2, height - 50);
}

function mousePressed() {
  // Click input A
  if (dist(mouseX, mouseY, 100, 150) < 25) {
    inputA = inputA ? 0 : 1;
  }
  // Click input B
  if (dist(mouseX, mouseY, 100, 300) < 25) {
    inputB = inputB ? 0 : 1;
  }
  // Click "dropdown" inside canvas
  if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
      mouseY > height - 70 && mouseY < height - 30) {
    gateIndex = (gateIndex + 1) % gateOptions.length;
    selectedGate = gateOptions[gateIndex];
  }
}

function calculateOutput(a, b, gate) {
  switch(gate) {
    case "AND": return a & b;
    case "OR": return a | b;
    case "XOR": return a ^ b;
    case "NOT": return a ^ 1; // Only NOT A
    default: return 0;
  }
}
