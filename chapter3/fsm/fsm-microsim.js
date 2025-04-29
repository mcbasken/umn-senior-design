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
  drawButton(width/2 - 60, 140, 120, 50, "Clock Tick");

  // Draw FSM Diagram
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

  let stateRadius = 40; // RADIUS now (not diameter)

  textSize(18);

  // Draw states
  drawState(idleX, stateY, "IDLE", currentState === "IDLE" ? 'gold' : 'white', "Ready");
  drawState(readX, stateY, "READ", currentState === "READ" ? 'gold' : 'white', "Reading...");
  drawState(writeX, stateY, "WRITE", currentState === "WRITE" ? 'gold' : 'white', "Writing...");

  stroke(0);
  strokeWeight(2);
  noFill();

  // IDLE ➔ READ (straight right)
  line(idleX + stateRadius, stateY, readX - stateRadius, stateY);
  drawArrowHead(readX - stateRadius, stateY, 0); // angle 0 radians (pointing right)

  // READ ➔ WRITE (straight right)
  line(readX + stateRadius, stateY, writeX - stateRadius, stateY);
  drawArrowHead(writeX - stateRadius, stateY, 0); // angle 0 radians (pointing right)

  // WRITE ➔ IDLE (up, across, down)
  let archHeight = 120;

  // UP from WRITE
  line(writeX - stateRadius, stateY, writeX - stateRadius, stateY - archHeight);

  // ACROSS from WRITE to IDLE
  line(writeX - stateRadius, stateY - archHeight, idleX + stateRadius, stateY - archHeight);

  // DOWN into IDLE
  line(idleX + stateRadius, stateY - archHeight, idleX + stateRadius, stateY);
  drawArrowHead(idleX + stateRadius, stateY, HALF_PI); // angle down (90 degrees = HALF_PI)
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


function drawArrowHead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  fill(0);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}



function mousePressed() {
  // Toggle Start Input
  if (mouseX > width/2 - 150 && mouseX < width/2 - 50 &&
      mouseY > 100 && mouseY < 140) {
    startInput = startInput ? 0 : 1;
  }
  // Toggle Done Input
  if (mouseX > width/2 + 50 && mouseX < width/2 + 150 &&
      mouseY > 100 && mouseY < 140) {
    doneInput = doneInput ? 0 : 1;
  }
  // Clock Tick Button
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
