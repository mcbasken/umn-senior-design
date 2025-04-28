let inputA = 0;
let inputB = 0;
let selectedGate = "AND";
let gateOptions = ["AND", "OR", "XOR", "NOT"];
let gateDropdown;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);

  // Dropdown to select logic gate
  gateDropdown = createSelect();
  gateDropdown.parent('p5-sketch');
  gateDropdown.position(width/2 - 50, height - 60);
  for (let option of gateOptions) {
    gateDropdown.option(option);
  }
  gateDropdown.changed(() => {
    selectedGate = gateDropdown.value();
  });
}

function draw() {
  background(240);

  fill(0);
  text("Logic Gate MicroSim", width/2, 30);

  // Draw Inputs
  drawInput(100, 150, "A", inputA);
  drawInput(100, 250, "B", inputB);

  // Draw gate symbol
  drawGate(width/2, 200, selectedGate);

  // Draw output wire
  let output = calculateOutput(inputA, inputB, selectedGate);
  stroke(0);
  line(width/2 + 70, 200, width - 100, 200);

  // Draw output bubble
  fill(output ? 'limegreen' : 'red');
  ellipse(width - 80, 200, 40, 40);
  fill(255);
  text(output, width - 80, 200);
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

function mousePressed() {
  // Check if clicking input A
  if (dist(mouseX, mouseY, 100, 150) < 25) {
    inputA = inputA ? 0 : 1;
  }
  // Check if clicking input B
  if (dist(mouseX, mouseY, 100, 250) < 25) {
    inputB = inputB ? 0 : 1;
  }
}

function calculateOutput(a, b, gate) {
  switch(gate) {
    case "AND": return a & b;
    case "OR": return a | b;
    case "XOR": return a ^ b;
    case "NOT": return a ^ 1; // Treat NOT A only
    default: return 0;
  }
}
