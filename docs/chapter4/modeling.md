# Chapter 4: Modeling Logic and Simulating Verilog Designs

## Combinational Logic in Verilog

Combinational logic refers to circuits where the output depends only on the current input values. In Verilog, this is typically modeled using:

- **Continuous assignments** with `assign`
- **Procedural blocks** with `always @(*)`

### Example: 4-to-1 Multiplexer Using `assign`

```verilog
module mux4to1 (
    input [1:0] sel,
    input [3:0] in,
    output out
);
    assign out = (sel == 2'b00) ? in[0] :
                 (sel == 2'b01) ? in[1] :
                 (sel == 2'b10) ? in[2] :
                 in[3];
endmodule
```

### Example: 4-to-1 Multiplexer Using `always`

```verilog
module mux4to1_proc (
    input [1:0] sel,
    input [3:0] in,
    output reg out
);
    always @(*) begin
        case (sel)
            2'b00: out = in[0];
            2'b01: out = in[1];
            2'b10: out = in[2];
            2'b11: out = in[3];
        endcase
    end
endmodule
```

---

## Sequential Logic and Clocking

Sequential circuits depend on both current inputs and past states, using clock signals to update values.

### Key Elements:
- **Flip-flops and Registers** for state retention
- **Clock signals** for synchronization
- **Reset signals** to initialize states

### Example: D Flip-Flop With Reset

```verilog
module dff (
    input clk,
    input reset,
    input d,
    output reg q
);
    always @(posedge clk or posedge reset) begin
        if (reset)
            q <= 1'b0;
        else
            q <= d;
    end
endmodule
```

---

## Testbenches and Simulation

Testbenches are used to **verify Verilog modules** by applying test inputs and monitoring outputs.

### Key Concepts:
- Use `initial` blocks to define input sequences
- Use `$display`, `$monitor`, or waveform tools to observe outputs
- Simulate edge cases, timing conditions, and expected outputs

### Example: Simple Testbench for a D Flip-Flop

```verilog
module tb_dff;
    reg clk, reset, d;
    wire q;

    dff uut (.clk(clk), .reset(reset), .d(d), .q(q));

    initial begin
        clk = 0;
        forever #5 clk = ~clk;  // 10-time-unit clock period
    end

    initial begin
        reset = 1; d = 0;
        #12 reset = 0; d = 1;
        #10 d = 0;
        #10 d = 1;
        #20 $finish;
    end
endmodule
```

---

## ✅ Quiz: Combinational and Sequential Logic in Verilog

1. **What is the primary difference between blocking and non-blocking assignments?**  
   a. Blocking updates outputs immediately; non-blocking delays them  
   b. Blocking can only be used in testbenches  
   c. Non-blocking is used only for combinational logic  
   d. They both behave the same in all cases  

2. **Which keyword is used for a continuous assignment in Verilog?**  
   a. `always`  
   b. `initial`  
   c. `assign`  
   d. `module`  

3. **What does the following line do? `always @(posedge clk or posedge reset)`**  
   a. Triggers on both rising and falling edges  
   b. Only sensitive to input changes  
   c. Triggers only when both clk and reset are high  
   d. Triggers on rising edge of clk or reset  

4. **What is the purpose of a testbench in Verilog?**  
   a. To design state machines  
   b. To implement registers  
   c. To verify module functionality  
   d. To generate clock signals only  

5. **In a 4-to-1 multiplexer, how many select lines are needed?**  
   a. 1  
   b. 2  
   c. 3  
   d. 4  

> **Answers:**  
> 1. a  
> 2. c  
> 3. d  
> 4. c  
> 5. b

---

## 🧪 MicroSim Prompt

### 🎯 Simulation Prompt: 4-to-1 Multiplexer with Testbench

**Design and simulate a 4-to-1 multiplexer in Verilog. Then write a testbench to verify that each input is correctly routed to the output based on the select signal.**

#### Functional Requirements:

- Inputs: `in[3:0]`, `sel[1:0]`
- Output: `out`
- The testbench should:
  - Apply all possible select values (`00`, `01`, `10`, `11`)
  - Cycle through input combinations (e.g., 4'b1000, 4'b0100, etc.)
  - Verify correct routing by observing `out`

#### MicroSim Setup:

- Design the multiplexer module using both `assign` and `always` styles (optional).
- Create a waveform or simulation log using `$monitor` or `$display`.

📌 **Learning Outcome:**  
Practice combinational design, Verilog syntax, and how to create and simulate a functional testbench.

