// LogicLab: Foundations of Digital Design MicroSim
let mode = 0;
let modes = ["Number Systems", "Boolean Logic", "Truth Table"];
let inputBits = [0, 0, 0, 0]; // 4-bit input
let baseLabels = ["Binary", "Octal", "Decimal", "Hex"];

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Input toggle buttons
  for (let i = 0; i < 4; i++) {
    let btn = createButton("0");
    btn.position(60 + i * 50, 50);
    btn.mousePressed(() => {
      inputBits[i] = inputBits[i] ? 0 : 1;
      btn.html(inputBits[i]);
    });
  }

  // Mode toggle button
  let modeBtn = createButton("Switch Mode");
  modeBtn.position(140, 10);
  modeBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });
}

function draw() {
  background(245);
  fill(0);
  textSize(16);
  text("LogicLab: " + modes[mode], width / 2, 20);

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
  text("Binary:    " + bin, width / 2, 120);
  text("Octal:     " + oct, width / 2, 150);
  text("Decimal:   " + dec, width / 2, 180);
  text("Hex:       0x" + hex, width / 2, 210);
}

function drawBooleanLogic() {
  let A = inputBits[2];
  let B = inputBits[3];
  let andAB = A & B;
  let orAB = A | B;
  let notA = A ^ 1;
  let xorAB = A ^ B;

  text("A = " + A + "    B = " + B, width / 2, 120);
  text("A AND B = " + andAB, width / 2, 150);
  text("A OR  B = " + orAB, width / 2, 180);
  text("A XOR B = " + xorAB, width / 2, 210);
  text("NOT A   = " + notA, width / 2, 240);
}

function drawTruthTable() {
  text("Inputs: A = " + inputBits[2] + "  B = " + inputBits[3], width / 2, 100);
  text("Truth Table for A AND B:", width / 2, 140);
  text("A B | Y", width / 2, 170);
  let yVals = ["0 0 | 0", "0 1 | 0", "1 0 | 0", "1 1 | 1"];
  for (let i = 0; i < 4; i++) {
    text(yVals[i], width / 2, 200 + i * 20);
  }
}
