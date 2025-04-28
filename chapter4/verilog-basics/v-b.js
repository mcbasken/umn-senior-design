document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value;
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = "";

  let errors = [];

  // Check 4.1 Module structure
  if (!/module\s+\w+\s*\(.*\)\s*;/.test(code)) {
    errors.push("Missing or incorrect module declaration.");
  }
  if (!/endmodule/.test(code)) {
    errors.push("Missing 'endmodule'.");
  }
  if (!/assign\s+.*=/.test(code)) {
    errors.push("Missing or incorrect 'assign' statement.");
  }

  // Check 4.2 Data Types
  if (!/(wire|reg|integer|real)\s/.test(code)) {
    errors.push("Missing data type declaration (wire, reg, integer, real).");
  }

  // Check 4.3 Instantiation (optional)
  if (/^\s*\w+\s+\w+\s*\(.*\);/m.test(code)) {
    feedback.innerHTML += "<p class='correct'>Detected module instantiation ✅</p>";
  }

  // Check 4.4 Inputs and Outputs
  if (!/input\s+/.test(code)) {
    errors.push("Missing 'input' port declaration.");
  }
  if (!/output\s+/.test(code)) {
    errors.push("Missing 'output' port declaration.");
  }

  // Final result
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Great job! Your Verilog structure looks correct.</p>";
  } else {
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
