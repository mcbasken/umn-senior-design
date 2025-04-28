<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verilog Syntax MicroSim</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #eef6ff;
      padding: 20px;
    }
    textarea {
      width: 100%;
      height: 300px;
      font-family: monospace;
      font-size: 14px;
      margin-bottom: 10px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #1f77b4;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #155a8a;
    }
    #feedback {
      margin-top: 20px;
      padding: 10px;
      border-radius: 5px;
      background: white;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    }
    .correct {
      color: green;
    }
    .error {
      color: red;
    }
  </style>
</head>
<body>

  <h1>Verilog MicroSim: Syntax Checker</h1>
  <p>Type your Verilog module below and click "Check Code"!</p>

  <textarea id="verilogInput" placeholder="Type your Verilog code here..."></textarea><br>
  <button onclick="checkVerilog()">Check Code</button>

  <div id="feedback"></div>

  <script>
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

      // Check 4.3 Instantiation (optional presence)
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

      // Display final results
      if (errors.length === 0) {
        feedback.innerHTML += "<p class='correct'>✅ Great job! Your Verilog structure looks correct.</p>";
      } else {
        errors.forEach(err => {
          feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
        });
      }
    }
  </script>

</body>
</html>
