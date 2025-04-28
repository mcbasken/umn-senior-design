let aBits = [0, 0, 0, 0];
let bBits = [0, 0, 0, 0];
let operations = ["ADD", "SUB", "AND", "OR", "XOR", "COMPARE"];
let currentOperation = "ADD";
let operationIndex = 0;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(240);

  fill(0);
  textSize(24);
  text("Unified Logic MicroSim", width/2, 30);

  textSize(18);
  text("Click bits to toggle inputs A and B", width/2, 70);

  drawInputs();
  drawOperationSelector();
  drawOutput();
}

function drawInputs() {
  fill(0);
  text("Input A", width/4, 120);
  text("Input B", 3*width/4, 120);

  for (let i = 0; i < 4; i++) {
    drawBit(width/4 - 75 + i*50, 160, aBits[i], "A", i);
    drawBit(3*width/4 - 75 + i*50, 160, bBits[i], "B", i);
  }
}

function drawBit(x, y, bit, group, index) {
  fill(bit ? 'limegreen' : 'red');
  rect(x, y, 40, 40, 8);
  fill(255);
  text(bit, x + 20, y + 20);
}

function drawOperationSelector() {
  fill(255);
  stroke(0);
  rect(width/2 - 100, 250, 200, 50, 10);
  fill(0);
  noStroke();
  text("Operation: " + currentOperation, width/2, 275);
}

function drawOutput() {
  let output = calculateOutput();
  let outputStr = output.toString(2).padStart(4, "0");

  fill(0);
  text("Output", width/2, 350);

  for (let i = 0; i < 4; i++) {
    fill(outputStr[i] === "1" ? 'limegreen' : 'red');
    rect(width/2 - 75 + i*50, 380, 40, 40, 8);
    fill(255);
    text(outputStr[i], width/2 - 75 + i*50 + 20, 400);
  }
}

function mousePressed() {
  // Toggle A bits
  for (let i = 0; i < 4; i++) {
    if (mouseX > width/4 - 75 + i*50 && mouseX < width/4 - 35 + i*50 &&
        mouseY > 160 && mouseY < 200) {
      aBits[i] = aBits[i] ? 0 : 1;
    }
  }
  // Toggle B bits
  for (let i = 0; i < 4; i++) {
    if (mouseX > 3*width/4 - 75 + i*50 && mouseX < 3*width/4 - 35 + i*50 &&
        mouseY > 160 && mouseY < 200) {
      bBits[i] = bBits[i] ? 0 : 1;
    }
  }
  // Change operation
  if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > 250 && mouseY < 300) {
    operationIndex = (operationIndex + 1) % operations.length;
    currentOperation = operations[operationIndex];
  }
}

function calculateOutput() {
  let aVal = parseInt(aBits.join(""), 2);
  let bVal = parseInt(bBits.join(""), 2);

  switch (currentOperation) {
    case "ADD":
      return (aVal + bVal) & 0b1111; // 4-bit adder
    case "SUB":
      return (aVal - bVal) & 0b1111; // 4-bit subtractor
    case "AND":
      return aVal & bVal;
    case "OR":
      return aVal | bVal;
    case "XOR":
      return aVal ^ bVal;
    case "COMPARE":
      return (aVal === bVal) ? 0b0001 : (aVal > bVal ? 0b0010 : 0b0100);
    default:
      return 0;
  }
}
