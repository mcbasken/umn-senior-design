
// Sequential Logic MicroSim (400x400 canvas)
let mode = 0;
let modes = [
  "SR Flip-Flop",
  "D Flip-Flop",
  "JK Flip-Flop",
  "T Flip-Flop",
  "Shift Register",
  "Synchronous Counter",
  "Memory Register"
];

let state = 0;
let clk = 0;
let inputs = [0, 0]; // Generic inputs like S, R, D, J, K, T, etc.
let reg = [0, 0, 0, 0];
let switchBtn;
let inputButtons = [];
let clockBtn;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Create input switches
  for (let i = 0; i < inputs.length; i++) {
    inputButtons[i] = createButton("0");
    inputButtons[i].position(120 + i * 60, 60);
    inputButtons[i].mousePressed(() => {
      inputs[i] = inputs[i] ? 0 : 1;
      inputButtons[i].html(inputs[i]);
    });
  }

  // Clock button
  clockBtn = createButton("Clock");
  clockBtn.position(150, 100);
  clockBtn.mousePressed(() => clkTick());

  // Mode switcher
  switchBtn = createButton("Switch Mode");
  switchBtn.position((width - 100) / 2, 370);
  switchBtn.size(100, 25);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
    state = 0;
    reg = [0, 0, 0, 0];
  });
}

function draw() {
  background(245);
  fill(0);
  textSize(16);
  text(modes[mode], width / 2, 20);
  textSize(14);

  switch (mode) {
    case 0: drawSR(); break;
    case 1: drawD(); break;
    case 2: drawJK(); break;
    case 3: drawT(); break;
    case 4: drawShift(); break;
    case 5: drawCounter(); break;
    case 6: drawMemory(); break;
  }
}

function clkTick() {
  switch (mode) {
    case 0:
      if (inputs[0] && !inputs[1]) state = 1;
      else if (!inputs[0] && inputs[1]) state = 0;
      else if (inputs[0] && inputs[1]) state = -1;
      break;
    case 1:
      state = inputs[0];
      break;
    case 2:
      let j = inputs[0], k = inputs[1];
      if (j && !k) state = 1;
      else if (!j && k) state = 0;
      else if (j && k) state ^= 1;
      break;
    case 3:
      if (inputs[0]) state ^= 1;
      break;
    case 4:
      reg.pop();
      reg.unshift(inputs[0]);
      break;
    case 5:
      for (let i = 3; i >= 0; i--) {
        if (reg[i] === 0) {
          reg[i] = 1;
          for (let j = i + 1; j < 4; j++) reg[j] = 0;
          break;
        }
      }
      break;
    case 6:
      reg = inputs.map(x => x);
      break;
  }
}

function drawSR() {
  text(`S = ${inputs[0]}, R = ${inputs[1]}`, width / 2, 140);
  text(`Q = ${state}`, width / 2, 170);
  if (state === -1) text("Invalid: S = R = 1", width / 2, 200);
}

function drawD() {
  text(`D = ${inputs[0]}`, width / 2, 140);
  text(`Q = ${state}`, width / 2, 170);
}

function drawJK() {
  text(`J = ${inputs[0]}, K = ${inputs[1]}`, width / 2, 140);
  text(`Q = ${state}`, width / 2, 170);
}

function drawT() {
  text(`T = ${inputs[0]}`, width / 2, 140);
  text(`Q = ${state}`, width / 2, 170);
}

function drawShift() {
  text(`Serial In = ${inputs[0]}`, width / 2, 140);
  text(`Register = ${reg.join(' ')}`, width / 2, 170);
}

function drawCounter() {
  text(`Count = ${reg.join('')}`, width / 2, 140);
}

function drawMemory() {
  text(`D = ${inputs[0]}, CLK = ${clk}`, width / 2, 140);
  text(`Stored = ${inputs[0]}`, width / 2, 170);
}
