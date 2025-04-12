// Digital Design MicroSim
let mode = 0;
let modes = ["Number Systems", "Boolean Logic", "Truth Table"];
let inputBits = [0, 0, 0, 0]; // 4-bit input
let baseLabels = ["Binary", "Octal", "Decimal", "Hex"];
let switchModeBtn;
let inputButtons = [];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Input toggle buttons
  for (let i = 0; i < 4; i++) {
    inputButtons[i] = createButton("0");
    inputButtons[i].position(80 + i * 60, 50); // Evenly spaced across center
    inputButtons[i].mousePressed(() => {
      inputBits[i] = inputBits[i] ? 0 : 1;
      inputButtons[i].html(inputBits[i]);
    });
  }

  // Mode toggle button at bottom of canvas
  switchModeBtn = createButton("Switch Mode");
  switchModeBtn.position(140, 370);
  switchModeBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });
}

function draw() {
  background(245);
  fill(0);
  textSize(16);
  text(modes[mode], width / 2, 20);

  // Label A, B, C, D under each button
  textSize(12);
  let labels = ["A", "B", "C", "D"];
  for (let i = 0; i < 4; i++) {
    text(labels[i], 95 + i * 60, 90);
  }

  switch (mode) {
    case 0:
      drawNumberSystems();
      break;
    case 1:
      drawBooleanLogic();
      break;
    case 2:
      drawTruthTable();
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
  let B = inputBits[1];
  let C = inputBits[2];
  let andBC = B & C;
  let orBC = B | C;
  let notB = B ^ 1;
  let xorBC = B ^ C;

  textSize(16);
  text("B = " + B + "    C = " + C, width / 2, 130);
  text("B AND C = " + andBC, width / 2, 160);
  text("B OR  C = " + orBC, width / 2, 190);
  text("B XOR C = " + xorBC, width / 2, 220);
  text("NOT B   = " + notB, width / 2, 250);
}

function drawTruthTable() {
  let B = inputBits[1];
  let C = inputBits[2];
  textSize(16);
  text("Inputs: B = " + B + "  C = " + C, width / 2, 110);
  text("Truth Table for B AND C:", width / 2, 140);
  text("B C | Y", width / 2, 170);
  let yVals = ["0 0 | 0", "0 1 | 0", "1 0 | 0", "1 1 | 1"];
  for (let i = 0; i < 4; i++) {
    text(yVals[i], width / 2, 200 + i * 20);
  }
} 
