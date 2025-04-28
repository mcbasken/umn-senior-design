let inputA = 0;
let inputB = 0;
let selectedGate = "AND";
let gateOptions = ["AND", "OR", "XOR", "NOT"];
let gateIndex = 0; // Tracks current selected gate

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  fill(0);
  text("Logic Gate Simulation", width/2, 30);

  // Input A
  drawInput(100, 150, "A", inputA);
  // Input B
  drawInput(100, 250, "B", inputB);

  // Wires from inputs to gate
  stroke(0);
  line(125, 150, 300, 150);
  line(125, 250, 300, 250);

  // Gate block
  drawGate(400, 200, selectedGate);

  // Wire from gate to output
  line(500, 200, 650, 200);

  // Output display
  let output = calculateOutput(inputA, inputB, selectedGate);
  drawOutput(700, 200, output);

  // Draw "dropdown" selector inside canvas
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
  rect(x - 50, y - 50, 100, 100, 20);
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
  if (dist(mouseX, mouseY, 100, 250) < 25) {
    inputB = inputB ? 0 : 1;
  }
  // Click "dropdown" inside canvas
  if (mouseX > width/2 - 80 && mouseX < width/2 + 80 &&
      mouseY > height - 70 && mouseY < height - 30) {
    // Cycle to next gate
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
