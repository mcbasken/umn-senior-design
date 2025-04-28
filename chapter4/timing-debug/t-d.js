document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value;
  const feedback = document.getElementById('feedback');
  const inputBox = document.getElementById('verilogInput');
  feedback.innerHTML = "";

  let errors = [];

  // 4.1 Clocking and Timing Techniques
  const hasClockToggle = /(initial\s+begin\s+.*clk\s*=.*;.*forever\s+#\d+\s+clk\s*=\s*~clk)/s.test(code);
  if (!hasClockToggle) {
    errors.push("Missing initial block generating a clock signal (forever toggling clk).");
  }

  // 4.2 Timing Constraints (Hard to check fully, but detect timing constraint keywords)
  const mentionsTiming = /(input delay|output delay|setup time|hold time|clock period)/i.test(code);
  if (!mentionsTiming) {
    feedback.innerHTML += "<p class='error'>⚠️ No mention of timing constraints keywords (input delay, output delay, setup time, etc.).</p>";
  }

  // 4.3 Setup and Hold Time Concepts
  const talksAboutFlipFlop = /(posedge|negedge)/.test(code);
  if (!talksAboutFlipFlop) {
    errors.push("Missing clock edge triggering (posedge/negedge) in always blocks.");
  }

  // 4.4 Static Timing Analysis
  if (/setup|hold|skew|slack/.test(code)) {
    feedback.innerHTML += "<p class='correct'>✅ Mentions setup/hold/skew/slack timing terms!</p>";
  } else {
    feedback.innerHTML += "<p class='error'>⚠️ No mention of setup/hold/slack terms for STA concepts.</p>";
  }

  // 4.5 Testbench Structure
  const hasMonitorOrDisplay = /\$(monitor|display)/.test(code);
  if (!hasMonitorOrDisplay) {
    errors.push("Missing $monitor or $display statements for observing outputs.");
  }

  // 4.6 Waveform Dumping
  if (!/\$dumpfile|\$dumpvars/.test(code)) {
    errors.push("Missing $dumpfile or $dumpvars for waveform generation.");
  }

  // 4.7 Assertions and Verification
  if (!/assert\s*\(/.test(code)) {
    errors.push("Missing 'assert' statements for verification.");
  }

  // Display results + Highlight
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Excellent! Your code covers clocking, timing, testbenching, and verification!</p>";
    inputBox.style.border = "3px solid green";
  } else {
    inputBox.style.border = "3px solid red";
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
