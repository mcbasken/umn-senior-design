// Finite State Machine (FSM) Microsim - 400x400 canvas
let mode = 0;
let modes = ["Moore FSM", "Mealy FSM"];
let switchBtn, clkBtn, inputBtn;
let state = 0;
let input = 0;
let output = 0;
let nextState = 0;
let clock = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Mode switch
  switchBtn = createButton("Switch Mode");
  switchBtn.position((width - 100) / 2, 360);
  switchBtn.size(100, 25);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
    state = 0;
    clock = 0;
  });

  // Input button
  inputBtn = createButton("Toggle Input");
  inputBtn.position((width - 100) / 2, 320);
  inputBtn.size(100, 25);
  inputBtn.mousePressed(() => {
    input = input ? 0 : 1;
  });

  // Clock button
  clkBtn = createButton("Clock");
  clkBtn.position((width - 100) / 2, 280);
  clkBtn.size(100, 25);
  clkBtn.mousePressed(() => {
    clock++;
    state = nextState;
  });
}

function draw() {
  background(245);
  fill(0);
  textSize(16);
  text(modes[mode], width / 2, 30);

  fill(0);
  textSize(14);
  text("Input = " + input, width / 2, 70);
  text("Clock = " + clock, width / 2, 90);
  text("Current State = S" + state, width / 2, 120);

  if (mode === 0) {
    // Moore FSM: output depends only on state
    if (state === 0) output = 0;
    else if (state === 1) output = 1;
    nextState = input ? 1 : 0;
  } else {
    // Mealy FSM: output depends on state and input
    if (state === 0) {
      output = input ? 1 : 0;
      nextState = input ? 1 : 0;
    } else {
      output = input ? 0 : 1;
      nextState = input ? 1 : 0;
    }
  }

  fill("black");
  text("Next State = S" + nextState, width / 2, 150);
  text("Output = " + output, width / 2, 180);

  drawFSMGraph();
}

function drawFSMGraph() {
  stroke(0);
  fill(200);
  ellipse(120, 240, 60, 60);
  ellipse(280, 240, 60, 60);

  fill(0);
  text("S0", 120, 240);
  text("S1", 280, 240);

  stroke(0);
  fill("black");
  textAlign(LEFT);
  text("S0 → S1: input = 1", 40, 240);
  text("S1 → S0: input = 0", 210, 270);

  if (mode === 0) {
    text("Moore Outputs:", width / 2, 310);
    text("S0 = 0", width / 2, 330);
    text("S1 = 1", width / 2, 350);
  } else {
    text("Mealy Transitions:", width / 2, 310);
    text("S0/input=1 → output=1", width / 2, 330);
    text("S1/input=0 → output=1", width / 2, 350);
  }
}
