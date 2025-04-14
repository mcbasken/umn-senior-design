// Combinational Logic MicroSim (400x400 canvas)
let mode = 0;
let modes = [
  "Basic Gates",
  "Half Adder",
  "Full Adder",
  "2-to-1 MUX",
  "2-to-4 Decoder",
  "2-bit Comparator",
  "4-bit ALU"
];

let inputBits = [0, 0, 0, 0]; // A, B, Cin, Sel0
let switchBtn;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Toggle buttons for input bits
  for (let i = 0; i < inputBits.length; i++) {
    let btn = createButton("0");
    btn.position(60 + i * 60, 50);
    btn.mousePressed(() => {
      inputBits[i] = inputBits[i] ? 0 : 1;
      btn.html(inputBits[i]);
    });
  }

  // Switch mode button
  switchBtn = createButton("Switch Mode");
  switchBtn.position(140, 370);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });
}

function draw() {
  background(245);
  textSize(16);
  fill(0);
  text(modes[mode], width / 2, 20);

  switch (mode) {
    case 0: basicGates(); break;
    case 1: halfAdder(); break;
    case 2: fullAdder(); break;
    case 3: mux2to1(); break;
    case 4: decoder2to4(); break;
    case 5: comparator(); break;
    case 6: alu4bit(); break;
  }
}

function basicGates() {
  let A = inputBits[0];
  let B = inputBits[1];
  text(`A = ${A}, B = ${B}`, width / 2, 100);
  text(`A AND B = ${A & B}`, width / 2, 130);
  text(`A OR B = ${A | B}`, width / 2, 160);
  text(`NOT A = ${A ^ 1}`, width / 2, 190);
  text(`A XOR B = ${A ^ B}`, width / 2, 220);
}

function halfAdder() {
  let A = inputBits[0];
  let B = inputBits[1];
  let sum = A ^ B;
  let carry = A & B;
  text(`A = ${A}, B = ${B}`, width / 2, 120);
  text(`Sum = ${sum}`, width / 2, 150);
  text(`Carry = ${carry}`, width / 2, 180);
}

function fullAdder() {
  let A = inputBits[0];
  let B = inputBits[1];
  let Cin = inputBits[2];
  let sum = A ^ B ^ Cin;
  let carry = (A & B) | (Cin & (A ^ B));
  text(`A = ${A}, B = ${B}, Cin = ${Cin}`, width / 2, 110);
  text(`Sum = ${sum}`, width / 2, 140);
  text(`Cout = ${carry}`, width / 2, 170);
}

function mux2to1() {
  let I0 = inputBits[0];
  let I1 = inputBits[1];
  let Sel = inputBits[3];
  let Y = Sel ? I1 : I0;
  text(`I0 = ${I0}, I1 = ${I1}, Sel = ${Sel}`, width / 2, 120);
  text(`Output Y = ${Y}`, width / 2, 150);
}

function decoder2to4() {
  let I0 = inputBits[0];
  let I1 = inputBits[1];
  let sel = (I1 << 1) | I0;
  for (let i = 0; i < 4; i++) {
    text(`Y${i} = ${i === sel ? 1 : 0}`, width / 2, 130 + i * 20);
  }
}

function comparator() {
  let A = (inputBits[0] << 1) | inputBits[1];
  let B = (inputBits[2] << 1) | inputBits[3];
  text(`A = ${A} (${inputBits[0]}${inputBits[1]}), B = ${B} (${inputBits[2]}${inputBits[3]})`, width / 2, 100);
  text(`A = B: ${A === B ? 1 : 0}`, width / 2, 140);
  text(`A > B: ${A > B ? 1 : 0}`, width / 2, 170);
  text(`A < B: ${A < B ? 1 : 0}`, width / 2, 200);
}

function alu4bit() {
  let A = (inputBits[0] << 3) | (inputBits[1] << 2);
  let B = (inputBits[2] << 1) | inputBits[3];
  let sum = A + B;
  let and = A & B;
  let or = A | B;
  text(`A = ${A}, B = ${B}`, width / 2, 100);
  text(`Sum = ${sum & 0xF}`, width / 2, 130);
  text(`AND = ${and}`, width / 2, 160);
  text(`OR = ${or}`, width / 2, 190);
  text(`Zero Flag = ${(sum & 0xF) === 0 ? 1 : 0}`, width / 2, 220);
  text(`Carry = ${sum > 15 ? 1 : 0}`, width / 2, 250);
}

