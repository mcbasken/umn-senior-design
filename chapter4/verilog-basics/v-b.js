const verilogSnippets = {
  "Module Syntax": `
module and_gate(input A, input B, output Y);
  assign Y = A & B;
endmodule
  `,
  "Data Types": `
reg [7:0] byte_reg;
wire valid_signal;
integer counter;
real time_delay;
  `,
  "Module Instantiation": `
// Define
module inverter(input A, output Y);
  assign Y = ~A;
endmodule

// Instantiate
inverter u1 (.A(signal_in), .Y(signal_out));
  `,
  "IO Ports": `
module my_module(
  input clk,
  input rst,
  output reg done
);
  // Module body
endmodule
  `
};

function showVerilogConcept(title) {
  if (verilogSnippets[title]) {
    console.log("=== " + title + " ===");
    console.log(verilogSnippets[title]);
  } else {
    console.log("Concept not found. Try: " + Object.keys(verilogSnippets).join(", "));
  }
}

// Example usage
showVerilogConcept("Module Syntax");
showVerilogConcept("Data Types");
showVerilogConcept("Module Instantiation");
showVerilogConcept("IO Ports");
