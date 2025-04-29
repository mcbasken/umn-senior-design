let states = ["IDLE", "READ", "WRITE"];
let currentState = "IDLE";
let nextState = "IDLE";

let startInput = 0;
let doneInput = 0;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  textSize(28);
  fill(0);
  text("FSM MicroSim", width/2, 40);

  // Draw Inputs
  drawInputToggle(width/2 - 150, 100, "Start", startInput);
  drawInputToggle(width/2 + 50, 100, "Done", doneInput);

  // Draw Clock Button
  drawButton(width/2 - 60, 180, 120, 50, "Clock Tick");

  // Draw States
  drawFSM();

  // Show Current State
  fill(0);
  textSize(24);
  text("Current State: " + currentState, width/2, height - 60);
}

function drawInputToggle(x, y, label, value) {
  fill(255);
  stroke(0);
  rect(x, y, 100, 40, 8);
  fill(value ? 'limegreen' : 'red');
  ellipse(x + 80, y + 20, 20, 20);

  fill(0);
  noStroke();
  textSize(16);
  text(label, x + 40, y + 20);
}

function drawButton(x, y, w, h, label) {
  fill(255);
  stroke(0);
  rect(x, y, w, h, 10);
  fill(0);
  noStroke();
  textSize(18);
  text(label, x + w/2, y + h/2);
}

function drawFSM() {
  let cx = width/2;
  let cy = 350;

  let idleX = cx - 200;
  let readX = cx;
  let writeX = cx + 200;
  let stateY = cy;

  let stateRadius = 80;

  textSize(18);

  // Draw state circles
  drawState(idleX, stateY, "IDLE", currentState === "IDLE" ? 'gold' : 'white', "Ready");
  drawState(readX, stateY, "READ", currentState === "READ" ? 'gold' : 'white', "Reading...");
  drawState(writeX, stateY, "WRITE", currentState === "WRITE" ? 'gold' : 'white', "Writing...");

  stroke(0);
  strokeWeight(2);
  noFill();

  // Draw IDLE ➔ READ transition
  line(idleX + stateRadius/2, stateY, readX - stateRadius/2, stateY);
  drawArrowHead(readX - stateRadius/2 - 10, stateY);

  // Draw READ ➔ WRITE transition
  line(readX + stateRadius/2, stateY, writeX - stateRadius/2, stateY);
  drawArrowHead(writeX - stateRadius/2 - 10, stateY);

  // Draw WRITE ➔ IDLE (small arch above)
  beginShape();
  vertex(writeX - stateRadius/2, stateY);
  bezierVertex(writeX + 50, stateY - 100, idleX - 50, stateY - 100, idleX + stateRadius/2, stateY);
  endShape();
  drawArrowHead(idleX + stateRadius/2 - 10, stateY);
}

function drawState(x, y, label, fillColor, outputLabel) {
  fill(fillColor);
  stroke(0);
  ellipse(x, y, 80, 80);

  fill(0);
  noStroke();
  text(label, x, y - 10);
  textSize(14);
  text(outputLabel, x, y + 15);
}

function drawArrowHead(x, y) {
  fill(0);
  noStroke();
  triangle(x, y, x-10, y-5, x-10, y+5);
}

function mousePressed() {
  // Check if clicked Start
  if (mouseX > width/2 - 150 && mouseX < width/2 - 50 &&
      mouseY > 100 && mouseY < 140) {
    startInput = startInput ? 0 : 1;
  }
  // Check if clicked Done
  if (mouseX > width/2 + 50 && mouseX < width/2 + 150 &&
      mouseY > 100 && mouseY < 140) {
    doneInput = doneInput ? 0 : 1;
  }
  // Check if clicked Clock Tick
  if (mouseX > width/2 - 60 && mouseX < width/2 + 60 &&
      mouseY > 180 && mouseY < 230) {
    clockTick();
  }
}

function clockTick() {
  if (currentState === "IDLE") {
    nextState = startInput ? "READ" : "IDLE";
  } else if (currentState === "READ") {
    nextState = doneInput ? "WRITE" : "READ";
  } else if (currentState === "WRITE") {
    nextState = doneInput ? "IDLE" : "WRITE";
  } else {
    nextState = "IDLE";
  }
  currentState = nextState;
}
