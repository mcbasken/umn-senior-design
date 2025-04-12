let A = [0, 0, 0, 0];
let B = [0, 0, 0, 0];
let opcode = [0, 0, 0];
let buttonsA = [], buttonsB = [], opButtons = [];

let result = [0, 0, 0, 0];
let carryOut = 0;
let zero = 0;

// MUX stuff
let muxInputs = [0, 0, 0, 0];  // I0–I3
let muxSelect = [0, 0];        // S1, S0
let muxButtons = [], muxSelButtons = [];
let muxY = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(14);

  // ALU A inputs
  for (let i = 0; i < 4; i++) {
    buttonsA[i] = createButton('0');
    buttonsA[i].position(40 + i * 40, 20);
    buttonsA[i].mousePressed(() => toggleBit(A, i, buttonsA[i]));
  }

  // ALU B inputs
  for (let i = 0; i < 4; i++) {
    buttonsB[i] = createButton('0');
    buttonsB[i].position(40 + i * 40, 60);
    buttonsB[i].mousePressed(() => toggleBit(B, i, buttonsB[i]));
  }

  // Opcode switches
  for (let i = 0; i < 3; i++) {
    opButtons[i] = createButton('0');
    opButtons[i].position(250 + i * 30, 20);
    opButtons[i].mousePressed(() => toggleBit(opcode, i, opButtons[i]));
  }

  // MUX inputs I0–I3
  for (let i = 0; i < 4; i++) {
    muxButtons[i] = createButton('0');
    muxButtons[i].position(40 + i * 40, 280);
    muxButtons[i].mousePressed(() => toggleBit(muxInputs, i, muxButtons[i]));
  }

  // MUX select S0, S1
  for (let i = 0; i < 2; i++) {
    muxSelButtons[i] = createButton('0');
    muxSelButtons[i].position(250 + i * 30, 280);
    muxSelButtons[i].mousePressed(() => toggleBit(muxSelect, i, muxSelButtons[i]));
  }
}

function draw() {
  background(255);
  drawALU();
  drawALUOutput();
  drawMUX();
}

function drawALU() {
  fill(200);
  stroke(0);
  rectMode(CENTER);
  rect(width / 2, height / 2 - 40, 160, 100, 10);
  fill(0);
  textSize(16);
  text("4-Bit ALU", width / 2, height / 2 - 40);

  // Labels
  fill(0);
  textSize(12);
  text("A Input", 20, 35);
  text("B Input", 20, 75);
  text("Opcode", 280, 10);

  text("000: AND", 310, 60);
  text("001: OR", 310, 75);
  text("010: XOR", 310, 90);
  text("011: NOT A", 310, 105);
  text("100: ADD", 310, 120);
  text("101: SUB", 310, 135);
}

function drawALUOutput() {
  let op = parseInt(opcode.join(''), 2);
  let aVal = parseInt(A.join(''), 2);
  let bVal = parseInt(B.join(''), 2);
  let res = 0;

  switch (op) {
    case 0: res = aVal & bVal; break;
    case 1: res = aVal | bVal; break;
    case 2: res = aVal ^ bVal; break;
    case 3: res = (~aVal) & 0b1111; break;
    case 4: res = aVal + bVal; break;
    case 5: res = (aVal - bVal + 16) % 16; break;
    default: res = 0;
  }

  result = res.toString(2).padStart(4, '0').split('').map(Number);
  carryOut = (op === 4 && aVal + bVal > 15) ? 1 : 0;
  zero = res === 0 ? 1 : 0;

  fill(0);
  textSize(14);
  text("Y = " + result.join(''), width / 2, 170);
  drawLED(width / 2 - 30, 200, zero, "Zero");
  drawLED(width / 2 + 30, 200, carryOut, "Carry");

  console.log(`ALU: A=${A.join('')} B=${B.join('')} OPCODE=${opcode.join('')} => Y=${result.join('')} | Z=${zero} C=${carryOut}`);
}

function drawMUX() {
  fill(0);
  text("4:1 MUX Inputs", width / 2, 260);
  text(`Select: S1=${muxSelect[0]} S0=${muxSelect[1]}`, width / 2, 300);

  // MUX logic
  let S1 = muxSelect[0], S0 = muxSelect[1];
  let notS1 = S1 ^ 1;
  let notS0 = S0 ^ 1;

  let and0 = muxInputs[0] & notS1 & notS0;
  let and1 = muxInputs[1] & notS1 & S0;
  let and2 = muxInputs[2] & S1 & notS0;
  let and3 = muxInputs[3] & S1 & S0;

  muxY = and0 | and1 | and2 | and3;

  drawLED(width - 40, 360, muxY, "MUX Y");

  console.log(`MUX: I=${muxInputs.join('')} S=${muxSelect.join('')} => Y=${muxY}`);
}

function drawLED(x, y, on, label) {
  fill(on ? 'green' : 'red');
  ellipse(x, y, 20);
  fill(0);
  textSize(12);
  text(label, x, y + 20);
}

function toggleBit(arr, index, button) {
  arr[index] = arr[index] ? 0 : 1;
  button.html(arr[index]);
}
