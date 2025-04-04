# Chapter 3: Designing FSMs and Memory Integration

## FSM Design and Verilog Implementation

Designing a Finite State Machine (FSM) involves defining a set of states, identifying the inputs that affect transitions, and determining the outputs. The design process typically includes the following steps:

1. **Define the States**  
   Clearly label each state and assign it a binary encoding.

2. **Draw the State Diagram**  
   Use circles for states and arrows for transitions, labeled with input/output conditions.

3. **Create the State Table**  
   Convert the diagram into a table showing current states, inputs, next states, and outputs.

4. **Implement in Verilog**  
   Use `always` blocks, `case` statements, and state registers to model the FSM.

### Example: Simple Traffic Light Controller (Moore Machine)

```verilog
module traffic_light (
    input clk, reset,
    output reg [1:0] light
);
    typedef enum reg [1:0] {RED, GREEN, YELLOW} state_t;
    state_t current_state, next_state;

    // State transition logic
    always @(posedge clk or posedge reset) begin
        if (reset)
            current_state <= RED;
        else
            current_state <= next_state;
    end

    // Next state logic
    always @(*) begin
        case (current_state)
            RED:    next_state = GREEN;
            GREEN:  next_state = YELLOW;
            YELLOW: next_state = RED;
            default: next_state = RED;
        endcase
    end

    // Output logic
    always @(*) begin
        case (current_state)
            RED:    light = 2'b00;
            GREEN:  light = 2'b01;
            YELLOW: light = 2'b10;
        endcase
    end
endmodule
```

---

## Integrating FSMs with Memory

FSMs can also control memory operations, such as **read/write control**, **address sequencing**, or **data validation**. In a typical digital system, an FSM may:

- Select between memory modules (e.g., ROM vs. RAM)  
- Control memory timing signals  
- Track memory address pointers for reads/writes  
- Trigger interrupts or wait states based on memory flags  

### Example: FSM Controlling a Simple Memory Read Process

A **Mealy FSM** can be used to initiate a read from memory only when a `read_enable` signal is asserted. This allows for outputs that depend on both **current state** and **input conditions**.

---

## Memory Addressing and Timing

Memory is accessed using **address lines**, which specify the location of data. The process of reading or writing data requires careful coordination of:

- **Address setup time**  
- **Read/write enable signals**  
- **Clock synchronization**  

Modern systems often include **memory controllers** managed by FSMs to ensure proper timing and sequencing.

---

## ✅ Quiz: FSM & Memory Interaction

1. **Which step in FSM design comes immediately after drawing the state diagram?**  
   a. Implement in Verilog  
   b. Assign state encodings  
   c. Create the state table  
   d. Determine output values  

2. **Which FSM model has outputs that depend on both the current state and inputs?**  
   a. Moore  
   b. Mealy  
   c. Combinational  
   d. Synchronous  

3. **What is the primary purpose of an FSM in memory access?**  
   a. Storing data  
   b. Minimizing latency  
   c. Sequencing control operations  
   d. Enhancing capacity  

4. **Which Verilog construct is typically used for next-state logic?**  
   a. `assign`  
   b. `initial`  
   c. `always @(*)`  
   d. `always @(posedge clk)`  

5. **What component does an FSM typically control during a memory read operation?**  
   a. Address decoder  
   b. Data multiplexer  
   c. Read enable signal  
   d. All of the above  

**Answers:**

> 1. c  
> 2. b  
> 3. c  
> 4. c  
> 5. d  

---

## 🧪 MicroSim Prompt

### 🎯 Simulation Prompt: FSM-Controlled Memory Reader

**Design and simulate a Mealy FSM** that performs the following:

- Waits for a `start_read` input signal  
- Cycles through a memory address range (e.g., `0x00` to `0x0F`)  
- Asserts `read_enable` and outputs the address  
- Goes to an idle state after all addresses have been read  

### MicroSim Requirements

- **Inputs:** `clk`, `reset`, `start_read`  
- **Outputs:** `address`, `read_enable`  
- **Optional:** Simulate a simple memory module with fixed data for readout  

📌 **Learning Outcome:** Understand how FSMs manage sequential memory access with proper timing and control.
