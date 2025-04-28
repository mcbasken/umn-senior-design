// Digital Design MicroSim
let mode = 0;
let modes = ["Number Systems", "Boolean Logic"];
let inputBits = [0, 0, 0, 0]; // 4-bit input
let baseLabels = ["Binary", "Octal", "Decimal", "Hex"];
let switchModeBtn;
let inputButtons = [];

function setup() {
  let canvas = createCanvas(600, 600); // bigger canvas
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(18); // bump text size a bit too

  // Input toggle buttons
  for (let i = 0; i < 4; i++) {
    inputButtons[i] = createButton("0");
    inputButtons[i].position(100 + i * 100, 80); // spread across wider area
    inputButtons[i].mousePressed(() => {
      inputBits[i] = inputBits[i] ? 0 : 1;
      inputButtons[i].html(inputBits[i]);
    });
  }

  // Mode toggle button
  switchModeBtn = createButton("Switch Mode");
  switchModeBtn.position(width / 2 - 60, height - 50);
  switchModeBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });
}


function draw() {
  background(220, 235, 255);
  fill(0);
  textSize(18);
  text(modes[mode], width / 2, 20);

  // Show/hide input buttons depending on mode
  if (mode === 0) {
    for (let i = 0; i < 4; i++) {
      inputButtons[i].show();
    }
  } else if (mode === 1) {
    for (let i = 0; i < 2; i++) {
      inputButtons[i].show();
    }
    for (let i = 2; i < 4; i++) {
      inputButtons[i].hide();
    }
  }

  switch (mode) {
    case 0:
      drawNumberSystems();
      break;
    case 1:
      drawBooleanLogic();
      break;
  }
}


function drawNumberSystems() {
  let bin = inputBits.join("");
  let dec = parseInt(bin, 2);
  let oct = dec.toString(8);
  let hex = dec.toString(16).toUpperCase();

  textSize(16);
  text("Binary:    " + bin, width / 2, 140);
  text("Octal:     " + oct, width / 2, 170);
  text("Decimal:   " + dec, width / 2, 200);
  text("Hex:       0x" + hex, width / 2, 230);
}

function drawBooleanLogic() {
  let A = inputBits[0];
  let B = inputBits[1];
  let andAB = A & B;
  let orAB = A | B;
  let notA = A ^ 1;
  let xorAB = A ^ B;

  textSize(16);
  text("A AND B = " + andAB, width / 2, 160);
  text("A OR  B = " + orAB, width / 2, 190);
  text("A XOR B = " + xorAB, width / 2, 220);
  text("NOT A   = " + notA, width / 2, 250);
} 
