let clbGrid = [];
let gridRows = 4;
let gridCols = 4;
let clbSize = 100;

let gridWidth;
let gridHeight;
let offsetX;
let offsetY;

let progress = 0;
let uploading = false;
let phase = "Idle"; // Synthesis -> Placement -> Routing

function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);

  // ✅ Now it's safe to calculate after canvas is created:
  gridWidth = gridCols * clbSize + (gridCols - 1) * 20;
  gridHeight = gridRows * clbSize + (gridRows - 1) * 20;
  offsetX = (width - gridWidth) / 2;
  offsetY = (height - gridHeight) / 2 + 50; // slightly lower for title

  // Create CLB grid
  for (let i = 0; i < gridRows; i++) {
    clbGrid[i] = [];
    for (let j = 0; j < gridCols; j++) {
      clbGrid[i][j] = {
        lut: false,
        ff: false,
        routed: false
      };
    }
  }
}

function draw() {
  background(245);

  textSize(28);
  fill(0);
  text("FPGA Architecture MicroSim", width/2, 40);

  drawUploadButton();
  drawProgressBar();
  drawGrid();
  drawPhaseLabel();

  if (uploading) {
    simulateUpload();
  }
}

function drawUploadButton() {
  fill(255);
  stroke(0);
  rect(width/2 - 100, 80, 200, 50, 10);
  fill(0);
  noStroke();
  textSize(20);
  text("Upload Bitstream", width/2, 105);
}

function drawProgressBar() {
  fill(220);
  rect(width/2 - 200, 150, 400, 30, 8);
  fill('#1f77b4');
  rect(width/2 - 200, 150, progress * 4, 30, 8);
}

function drawGrid() {
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      let x = offsetX + j * (clbSize + 20);
      let y = offsetY + i * (clbSize + 20);

      stroke(0);
      fill(255);
      rect(x, y, clbSize, clbSize, 10);

      if (clbGrid[i][j].lut) {
        fill('limegreen');
        ellipse(x + 30, y + 30, 20, 20);
        textSize(12);
        fill(0);
        text("LUT", x + 30, y + 50);
      }

      if (clbGrid[i][j].ff) {
        fill('orange');
        ellipse(x + 70, y + 30, 20, 20);
        textSize(12);
        fill(0);
        text("FF", x + 70, y + 50);
      }

      if (clbGrid[i][j].routed) {
        stroke('red');
        strokeWeight(4);
        noFill();
        rect(x + 10, y + 10, clbSize - 20, clbSize - 20, 6);
      }
    }
  }
}

function drawPhaseLabel() {
  textSize(24);
  fill(0);
  text("Current Phase: " + phase, width/2, 750);
}

function simulateUpload() {
  if (progress < 100) {
    progress += 0.5;
  } else {
    // Change phases
    if (phase === "Idle") {
      phase = "Synthesis";
      configureLUTs();
    } else if (phase === "Synthesis") {
      phase = "Placement";
      configureFlipFlops();
    } else if (phase === "Placement") {
      phase = "Routing";
      configureRouting();
    } else if (phase === "Routing") {
      phase = "Complete!";
      uploading = false;
    }
    progress = 0; // Reset for next phase
  }
}

function configureLUTs() {
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      clbGrid[i][j].lut = random() < 0.6; // 60% chance LUT is configured
    }
  }
}

function configureFlipFlops() {
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      if (clbGrid[i][j].lut) {
        clbGrid[i][j].ff = true;
      }
    }
  }
}

function configureRouting() {
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      if (clbGrid[i][j].lut && clbGrid[i][j].ff) {
        clbGrid[i][j].routed = true;
      }
    }
  }
}

function mousePressed() {
  if (mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > 80 && mouseY < 130) {
    startUpload();
  }
}

function startUpload() {
  if (!uploading) {
    uploading = true;
    phase = "Idle";
    progress = 0;
    // Clear previous grid
    for (let i = 0; i < gridRows; i++) {
      for (let j = 0; j < gridCols; j++) {
        clbGrid[i][j] = { lut: false, ff: false, routed: false };
      }
    }
  }
}
