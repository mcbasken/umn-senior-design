// Digital Design MicroSim
let mode = 0;
let modes = ["Number Systems", "Boolean Logic"];
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
