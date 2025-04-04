# Chapter 5: FPGA Development Flow and Embedded Applications

## FPGA Design Flow Overview

The FPGA design process involves a series of key steps that translate a hardware design (often written in Verilog) into a working configuration on a physical chip. Each phase is supported by Electronic Design Automation (EDA) tools and follows a logical progression:

1. **Design Entry**: Write your hardware description using Verilog or VHDL.
2. **Synthesis**: Convert HDL into a netlist of logic gates.
3. **Implementation**:
   - **Placement**: Assign logic elements to physical locations on the chip.
   - **Routing**: Connect these elements using the FPGA's interconnect fabric.
4. **Bitstream Generation**: Create a binary file used to program the FPGA.
5. **Programming**: Load the bitstream into the FPGA via JTAG or configuration memory.

### Example: Simple AND Gate in Verilog

!verilog
module and_gate (
    input a,
    input b,
    output y
);
    assign y = a & b;
endmodule
!

This Verilog module can be synthesized and mapped to physical LUTs (Look-Up Tables) in the FPGA fabric.

---

## Embedded Processors in FPGAs

Many modern FPGAs include support for embedded processors. These can be:

- **Hard-core processors** (e.g., ARM Cortex-A9 in Xilinx Zynq)
- **Soft-core processors** (e.g., MicroBlaze, Nios II, RISC-V) instantiated in logic fabric

These processors enable hybrid designs where software interacts with custom logic blocks for flexibility and performance.

### Key Concepts:
- **Memory-mapped I/O**: Peripherals are accessed like memory locations.
- **On-chip memory**: Block RAMs are used for stack/data storage.
- **Real-time constraints**: Tasks must be predictable and time-bounded.

---

## I/O and Communication Interfaces

FPGAs often need to interface with external components using standard protocols:

- **UART**: Simple serial communication
- **SPI**: Synchronous serial interface, often for sensors or memory
- **I2C**: Multi-device communication using two wires
- **Parallel Interfaces**: Used for displays or high-speed buses
- **External Memory Interfaces**: SRAM, DRAM, and Flash modules

### Example: UART Transmitter (Simplified)

!verilog
module uart_tx (
    input clk,
    input tx_start,
    input [7:0] tx_data,
    output reg tx,
    output reg tx_busy
);
// Simplified state machine and logic would go here
endmodule
!

---

## ✅ Quiz: FPGA and Embedded Systems

1. **What is the purpose of the synthesis step in FPGA design?**  
   a. Generate waveforms  
   b. Map HDL to logic gates  
   c. Run simulation  
   d. Configure I/O pins  

2. **Which of the following is a soft-core processor?**  
   a. ARM Cortex-A9  
   b. RISC-V (custom core)  
   c. Intel Xeon  
   d. AMD Ryzen  

3. **What type of communication is UART?**  
   a. Parallel  
   b. Wireless  
   c. Serial  
   d. Optical  

4. **Which tool generates the .bit or .bin file to load into an FPGA?**  
   a. Compiler  
   b. Simulator  
   c. Bitstream generator  
   d. Verilog linter  

5. **Which memory type is typically used for external RAM in FPGAs?**  
   a. ROM  
   b. SRAM or DRAM  
   c. PROM  
   d. EEPROM  

> **Answers:**  
> 1. b  
> 2. b  
> 3. c  
> 4. c  
> 5. b

---

## 🧪 MicroSim Prompt

### 🎯 Simulation Prompt: UART Transmit Controller

**Design a UART transmitter module in Verilog** that supports the following:

- 1 start bit, 8 data bits, 1 stop bit (8N1 format)
- Configurable baud rate via clock divider
- `tx_start` signal triggers transmission
- Output `tx` signal to line
- `tx_busy` signal shows when transmitting

### Simulation Requirements:
- Generate a 50 MHz clock in your testbench
- Send two bytes: 0x55 and 0xA3
- Use `$display` to monitor `tx`, `tx_busy`

📌 **Learning Outcome**: Learn how serial protocols are implemented in hardware and verify behavior using simulation.
