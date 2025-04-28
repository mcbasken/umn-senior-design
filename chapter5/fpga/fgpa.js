document.getElementById('checkButton').addEventListener('click', checkVerilog);

function checkVerilog() {
  const code = document.getElementById('verilogInput').value.toLowerCase(); // Make lowercase to match
  const feedback = document.getElementById('feedback');
  const inputBox = document.getElementById('verilogInput');
  feedback.innerHTML = "";

  let errors = [];

  // 5.1 FPGA vs ASIC
  if (!(code.includes('fpga') && code.includes('asic'))) {
    errors.push("Missing discussion about both FPGA and ASIC trade-offs.");
  }

  // 5.2 Look-Up Tables (LUTs), Flip-Flops, Interconnects
  if (!code.includes('lut')) {
    errors.push("Missing mention of LUTs (Look-Up Tables).");
  }
  if (!code.includes('flip-flop') && !code.includes('flipflop')) {
    errors.push("Missing mention of Flip-Flops.");
  }
  if (!code.includes('interconnect')) {
    errors.push("Missing mention of Interconnects.");
  }

  // 5.3 Configurable Logic Blocks (CLBs)
  if (!code.includes('clb')) {
    errors.push("Missing mention of CLBs (Configurable Logic Blocks).");
  }

  // 5.4 FPGA Programming and Bitstream
  if (!code.includes('bitstream')) {
    errors.push("Missing discussion about Bitstream generation.");
  }
  if (!code.includes('synthesis')) {
    errors.push("Missing discussion about Synthesis.");
  }

  // 5.5 FPGA Placement and Routing
  if (!code.includes('placement') || !code.includes('routing')) {
    errors.push("Missing discussion about Placement and Routing.");
  }

  // Display results + Highlight
  if (errors.length === 0) {
    feedback.innerHTML += "<p class='correct'>✅ Excellent! You covered FPGA/ASIC concepts, LUTs, CLBs, Bitstream, and P&R correctly!</p>";
    inputBox.style.border = "3px solid green";
  } else {
    inputBox.style.border = "3px solid red";
    errors.forEach(err => {
      feedback.innerHTML += `<p class="error">❌ ${err}</p>`;
    });
  }
}
