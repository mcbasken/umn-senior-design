document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value;
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = "";

  let errors = [];

  // 4.1 Check Behavioral and Structural Modeling
  const hasAlways = /always\s*@/.test(code);
  const hasAssign = /assign\s+.*=/.test(code);

  if (!hasAlways && !hasAssign) {
    errors.push("Missing behavioral or structural modeling (use 'always' or 'assign').");
  }

  // 4.2 Check Continuous Assignment (assign must drive wire)
  if (hasAssign) {
    if (!/wire\s+/.test(code)) {
      errors.push("Continuous assignments (assign) must drive a 'wire' type.");
    }
  }

  // 4.3 Check Procedural Blocks (initial / always)
  if (!/(initial|always)/.test(code)) {
    errors.push("Missing procedural block (initial or always).");
  }

  // 4.4 Check Blocking (=) vs Non-blocking (<=) Assignments
  const insideAlways = code.match(/always\s*@\(.*\)[\s\S]*?begin([\s\S]*?)end/);
  if (insideAlways) {
    const body = insideAlways[1];
    if (body.includes("=") && !body.includes("<=")) {
      errors.push("Use '<=' (non-blocking) for assignments inside always @(posedge clk) blocks.");
    }
  }

  // Display final results
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Great job! Your Verilog structure matches the requirements.</p>";
  } else {
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
