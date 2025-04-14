const timingConcepts = {
  "Introduction": `
Clocking and timing are critical for reliable digital system design.

Key areas:
- Clocking strategies (single/multi-clock, gating)
- Timing constraints (setup/hold, delays)
- Debugging tools (waveform viewers, assertions)
  `,

  "4.1 Clocking and Timing Techniques": `
Clock Types:
- Single-clock: Simple, used in synchronous designs
- Multi-clock: Used in SoCs, requires synchronization
- Clock gating: Disables unused sections to save power

Design Techniques:
- Trigger on correct clock edge
- Avoid glitches in logic
- Use clock buffers to fan out clocks to registers
  `,

  "4.2 Timing Constraints": `
Timing Constraints Guide Tools:
- Clock Period: Max frequency (e.g., 10ns → 100MHz)
- Input Delay: Time input arrives before clock edge
- Output Delay: Time output stabilizes after clock

Used by:
- Synopsys Design Compiler
- Xilinx Vivado
  `,

  "4.3 Setup and Hold Time Considerations": `
Flip-Flop Requirements:
- Setup Time: Data stable *before* clock edge
- Hold Time: Data stable *after* clock edge

If violated → Metastability (unstable outputs)

Timing analysis ensures valid setup/hold margins
  `,

  "4.4 Static Timing Analysis (STA)": `
What STA Does:
- Analyzes all paths without simulation
- Flags worst-case delays, setup/hold violations
- Reports timing slack, clock skew

Essential in ASIC/FPGA flow
  `,

  "4.5 Testbenches": `
Testbench Basics:
- Verilog module that applies stimulus and checks outputs
- Uses 'initial' blocks for timing and control

Example Clock Gen:
initial begin
  clk = 0;
  forever #5 clk = ~clk;
end
  `,

  "4.6 Waveform Analysis Tools": `
Waveform Tools:
- GTKWave, ModelSim visualize simulation output
- Useful for tracing bugs and verifying signal timing

To enable:
$dumpfile("wave.vcd");
$dumpvars;
  `,

  "4.7 Assertions and Verification": `
Assertions (SystemVerilog):
- assert (expr): Checks condition at runtime
- assume, cover: Used in formal tools

Example:
always @(posedge clk)
  assert (ready || reset) else $fatal("Ready not asserted!");
  `
};

function showTimingConcept(topic) {
  if (timingConcepts[topic]) {
    console.log("=== " + topic + " ===");
    console.log(timingConcepts[topic]);
  } else {
    console.log("Topic not found. Try one of these:");
    console.log(Object.keys(timingConcepts).join("\n"));
  }
}

// Example usage
showTimingConcept("Introduction");
showTimingConcept("4.1 Clocking and Timing Techniques");
showTimingConcept("4.2 Timing Constraints");
showTimingConcept("4.3 Setup and Hold Time Considerations");
showTimingConcept("4.4 Static Timing Analysis (STA)");
showTimingConcept("4.5 Testbenches");
showTimingConcept("4.6 Waveform Analysis Tools");
showTimingConcept("4.7 Assertions and Verification");
