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

  // Draw states in a line
  for (let i = 0; i < states.length; i++) {
    let x = cx - 200 + i * 200;
    let y = cy;

    // Highlight current state
    if (states[i] === currentState) {
      fill('gold');
    } else {
      fill('white');
    }

    stroke(0);
    ellipse(x, y, 80, 80);

    fill(0);
    noStroke();
    textSize(18);
    text(states[i], x, y);
  }

  // Draw arrows
  stroke(0);
  strokeWeight(2);
  noFill();
  for (let i = 0; i < states.length - 1; i++) {
    let x1 = cx - 200 + i * 200 + 40;
    let x2 = cx - 200 + (i + 1) * 200 - 40;
    line(x1, cy, x2, cy);
    drawArrowHead(x2 - 10, cy);
  }
  // Wrap around back to IDLE
  arc(cx, cy + 100, 300, 200, PI*1.5, PI*0.5);
  drawArrowHead(cx - 140, cy + 100);
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
