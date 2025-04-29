let processors = ["ARM Cortex-M", "RISC-V", "MicroBlaze"];
let selectedProcessor = "ARM Cortex-M";
let slider;
let signalSpeed = 2;

function setup() {
  let canvas = createCanvas(1200, 900);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);

  createProcessorDropdown();
  createPerformanceSlider();
}

function draw() {
  background(245);

  textSize(28);
  fill(0);
  text("FPGA Embedded SoC MicroSim", width/2, 40);

  drawSystemDiagram();
  drawRealTimeSignals();
  drawPowerPerformanceLabels();
}

function createProcessorDropdown() {
  let dropdown = createSelect();
  dropdown.parent('p5-sketch');
  dropdown.position(width/2 - 100, 80);
  for (let p of processors) {
    dropdown.option(p);
  }
  dropdown.changed(() => {
    selectedProcessor = dropdown.value();
  });
}

function createPerformanceSlider() {
  slider = createSlider(1, 10, 5);
  slider.parent('p5-sketch');
  slider.position(width/2 - 150, height - 100);
  slider.style('width', '300px');
}

function drawSystemDiagram() {
  fill(255);
  stroke(0);

  // Draw Processor
  rect(width/2 - 300, 250, 150, 80, 10);
  fill(0);
  noStroke();
  textSize(20);
  text(selectedProcessor, width/2 - 225, 290);

  // Draw Memory
  stroke(0);
  fill(255);
  rect(width/2 + 150, 250, 150, 80, 10);
  fill(0);
  noStroke();
  text("Memory", width/2 + 225, 290);

  // Draw Peripherals
  stroke(0);
  fill(255);
  rect(width/2 - 75, 450, 150, 80, 10);
  fill(0);
  noStroke();
  text("Peripherals", width/2, 490);

  // Draw horizontal Bus
  stroke('#1f77b4');
  strokeWeight(6);
  line(width/2 - 200, 400, width/2 + 200, 400);
  fill(0);
  noStroke();
  textSize(20);
  text("Bus (AXI/Avalon)", width/2, 380);

  // Draw vertical connections
  stroke('#1f77b4');
  strokeWeight(4);
  line(width/2 - 225, 330, width/2 - 225, 400); // Processor to Bus
  line(width/2 + 225, 330, width/2 + 225, 400); // Memory to Bus
  line(width/2, 450, width/2, 400); // Peripherals to Bus
}


let signalPosition = 0;

function drawRealTimeSignals() {
  let speed = slider.value();
  stroke('limegreen');
  strokeWeight(6);

  signalPosition += speed * 0.5;
  if (signalPosition > 400) {
    signalPosition = 0;
  }

  // Moving dots from Processor -> Bus -> Memory
  let startX = width/2 - 50 + signalPosition;
  let y = 240;
  if (startX < width/2 + 50) {
    point(startX, y);
  } else if (startX < width/2 + 150) {
    point(width/2 + 50, y);
    point(width/2 + 100, y + (startX - (width/2 + 50)));
  } else {
    point(width/2 + 50, y);
    point(width/2 + 100, y + 100);
    point(width/2 + 100 + (startX - (width/2 + 150)), 340);
  }
}

function drawPowerPerformanceLabels() {
  noStroke();
  fill(0);
  textSize(18);
  text("Power vs Performance", width/2, height - 130);
  text(`Performance Level: ${slider.value()}`, width/2, height - 60);
}
