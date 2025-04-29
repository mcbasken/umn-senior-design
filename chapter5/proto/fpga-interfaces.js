let modes = ["GPIO", "UART", "SPI", "I2C", "AXI"];
let selectedMode = "GPIO";

let buttonHovered = false;
let dropdownOpen = false;

let ledOn = false;
let uartBits = [];
let uartIndex = 0;
let uartTimer = 0;

function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(245);

  textSize(28);
  fill(0);
  text("FPGA Interfaces MicroSim", width/2, 40);

  drawDropdown();
  drawSimulation();
}

function drawDropdown() {
  // Dropdown box
  fill('#ddd');
  stroke(0);
  rect(width/2 - 100, 80, 200, 40, 8);

  fill(0);
  noStroke();
  textSize(18);
  text(selectedMode, width/2, 100);

  if (dropdownOpen) {
    for (let i = 0; i < modes.length; i++) {
      fill('#eee');
      stroke(0);
      rect(width/2 - 100, 120 + i*40, 200, 40, 8);

      fill(0);
      noStroke();
      text(modes[i], width/2, 140 + i*40);
    }
  }
}

function drawSimulation() {
  textSize(24);
  fill(0);
  text("Mode: " + selectedMode, width/2, 160);

  if (selectedMode === "GPIO") {
    drawGPIO();
  } else if (selectedMode === "UART") {
    drawUART();
  } else if (selectedMode === "SPI") {
    drawSPI();
  } else if (selectedMode === "I2C") {
    drawI2C();
  } else if (selectedMode === "AXI") {
    drawAXI();
  }
}

function drawGPIO() {
  // Button
  fill(ledOn ? 'limegreen' : '#ccc');
  stroke(0);
  rect(width/2 - 150, 300, 100, 50, 8);
  fill(0);
  noStroke();
  text("Button", width/2 - 100, 325);

  // LED
  fill(ledOn ? 'limegreen' : 'red');
  ellipse(width/2 + 150, 325, 50, 50);
  fill(0);
  text("LED", width/2 + 150, 375);
}

function drawUART() {
  textSize(18);
  fill(0);
  text("UART Transmission (TX)", width/2, 250);

  stroke(0);
  line(width/2 - 300, 300, width/2 + 300, 300);

  if (frameCount % 10 === 0 && uartIndex < uartBits.length) {
    uartIndex++;
  }

  for (let i = 0; i < uartIndex; i++) {
    let x = width/2 - 280 + i*40;
    fill(uartBits[i] ? 'limegreen' : 'red');
    ellipse(x, 300, 20, 20);
  }
}

function drawSPI() {
  textSize(18);
  fill(0);
  text("SPI Master-Slave Communication", width/2, 250);

  stroke(0);
  line(width/2 - 300, 300, width/2 + 300, 300);
  line(width/2 - 300, 350, width/2 + 300, 350);

  fill(0);
  text("MOSI", width/2 - 350, 300);
  text("MISO", width/2 - 350, 350);
}

function drawI2C() {
  textSize(18);
  fill(0);
  text("I2C Address and Data over SDA/SCL", width/2, 250);

  stroke(0);
  line(width/2 - 300, 300, width/2 + 300, 300);
  line(width/2 - 300, 350, width/2 + 300, 350);

  fill(0);
  text("SCL", width/2 - 350, 300);
  text("SDA", width/2 - 350, 350);
}

function drawAXI() {
  textSize(18);
  fill(0);
  text("AXI Valid/Ready Handshake", width/2, 250);

  stroke(0);
  line(width/2 - 300, 300, width/2 + 300, 300);

  fill('limegreen');
  ellipse(width/2 - 100, 300, 30, 30);
  fill('blue');
  ellipse(width/2 + 100, 300, 30, 30);

  fill(0);
  text("Valid", width/2 - 100, 340);
  text("Ready", width/2 + 100, 340);
}

function mousePressed() {
  if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > 80 && mouseY < 120) {
    dropdownOpen = !dropdownOpen;
  } else if (dropdownOpen) {
    for (let i = 0; i < modes.length; i++) {
      if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
          mouseY > 120 + i*40 && mouseY < 160 + i*40) {
        selectedMode = modes[i];
        dropdownOpen = false;
        resetUART();
      }
    }
  } else if (selectedMode === "GPIO" &&
             mouseX > width/2 - 150 && mouseX < width/2 - 50 &&
             mouseY > 300 && mouseY < 350) {
    ledOn = !ledOn;
  }
}

function resetUART() {
  if (selectedMode === "UART") {
    uartBits = [0,1,0,1,1,0,1,0]; // fake "H" letter
    uartIndex = 0;
  }
}
