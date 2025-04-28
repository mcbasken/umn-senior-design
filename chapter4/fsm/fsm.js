document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value;
  const feedback = document.getElementById('feedback');
  const inputBox = document.getElementById('verilogInput');
  feedback.innerHTML = "";

  let errors = [];

  // 4.1 Moore vs Mealy FSMs
  const hasOutputDependence = /(output|assign)\s+.*=/.test(code);
  const hasInputInOutputLogic = /(assign\s+\w+\s*=.*input)/.test(code);

  if (!hasOutputDependence) {
    errors.push("Missing output logic ('assign' or output statements).");
  } else {
    if (hasInputInOutputLogic) {
      feedback.innerHTML += "<p class='correct'>Detected possible Mealy FSM behavior ✅</p>";
    } else {
      feedback.innerHTML += "<p class='correct'>Detected possible Moore FSM behavior ✅</p>";
    }
  }

  // 4.2 State Encoding (parameters, reg for state)
  if (!/parameter\s+\w+\s*=/.test(code)) {
    errors.push("Missing 'parameter' declarations for state encoding.");
  }
  if (!/reg\s+\[.*\]\s+state/.test(code)) {
    errors.push("Missing 'reg' declaration for state or next_state.");
  }

  // 4.3 FSM Implementation Tips
  if (!/always\s*@\(posedge\s+clk\)/.test(code)) {
    errors.push("Missing 'always @(posedge clk)' for state transitions.");
  }
  if (!/(reset|rst)/.test(code)) {
    errors.push("Missing reset logic (look for 'reset' or 'rst').");
  }

  // Display final results + Highlight
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Excellent! Your FSM Verilog code covers all key elements.</p>";
    inputBox.style.border = "3px solid green";
  } else {
    inputBox.style.border = "3px solid red";
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
