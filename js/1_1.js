let bits = [0, 0, 0, 0];
let buttons = [];

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
  
  // Create toggle buttons for 4-bit input
  for (let i = 0; i < 4; i++) {
    buttons[i] = createButton('0');
    buttons[i].position(50 + i * 60, 50);
    buttons[i].mousePressed(() => toggleBit(i));
  }
}

function draw() {
  background(240);
  fill(0);
  text("4-Bit Input (A B C D)", width / 2, 20);

  // Count how many bits are 1
  let ones = bits.reduce((sum, b) => sum + b, 0);

  // Binary string
  let binStr = bits.join('');
  let dec = parseInt(binStr, 2);
  let hex = dec.toString(16).toUpperCase();

  // Display conversions
  text(`Binary: ${binStr}`, width / 2, 120);
  text(`Decimal: ${dec}`, width / 2, 150);
  text(`Hexadecimal: 0x${hex}`, width / 2, 180);

  // Logic: Y = 1 if exactly two inputs are 1
  let output = ones === 2 ? 1 : 0;

  // Visual output gate style
  textSize(18);
  fill(output === 1 ? 'green' : 'red');
  text(`Output Y = ${output}`, width / 2, 230);
  textSize(14);
  fill(0);
  text("Logic Condition: Y = 1 if exactly two inputs are 1", width / 2, 270);

  // Draw simple "gate"
  stroke(0);
  fill(output === 1 ? 'green' : 'white');
  ellipse(width / 2, 320, 40);
  fill(0);
  text(output, width / 2, 320);
}

function toggleBit(index) {
  bits[index] = bits[index] === 0 ? 1 : 0;
  buttons[index].html(bits[index]);
}
