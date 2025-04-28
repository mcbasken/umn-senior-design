document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value;
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = "";

  let errors = [];

  // Check module structure
  if (!/module\s+\w+\s*\(.*\)\s*;/.test(code)) {
    errors.push("Missing or incorrect module declaration.");
  }
  if (!/endmodule/.test(code)) {
    errors.push("Missing 'endmodule'.");
  }
  if (!/assign\s+.*=/.test(code)) {
    errors.push("Missing or incorrect 'assign' statement.");
  }

  // Check data types
  if (!/(wire|reg|integer|real)\s/.test(code)) {
    errors.push("Missing data type declaration.");
  }

  // Check instantiation
  if (/^\s*\w+\s+\w+\s*\(.*\);/m.test(code)) {
    feedback.innerHTML += "<p class='correct'>Detected module instantiation ✅</p>";
  }

  // Check inputs and outputs
  if (!/input\s+/.test(code)) {
    errors.push("Missing 'input' port declaration.");
  }
  if (!/output\s+/.test(code)) {
    errors.push("Missing 'output' port declaration.");
  }

  // Display final results
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Great job! Your Verilog structure looks correct.</p>";
  } else {
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
