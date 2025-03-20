# Digital Design Course Taxonomy 

## Dependency Graph of Digital Design Concepts

Below is a visual representation of the dependencies between digital design concepts.

<div id="mynetwork" style="width:100%; height:800px; border:1px solid lightgray;"></div>

<script src="https://cdn.jsdelivr.net/npm/vis-network@9.1.2/dist/vis-network.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const nodesArray = [
        { id: 1, label: "Digital vs Analog" },
        { id: 2, label: "Binary System" },
        { id: 3, label: "Number Systems" },
        { id: 4, label: "Base Conversion" },
        { id: 5, label: "Boolean Algebra" },
        { id: 6, label: "Logic Gates" },
        { id: 42, label: "Finite State Machines (FSM)" },
        { id: 60, label: "FPGA Basics" },
        { id: 71, label: "HDL Basics" },
        { id: 86, label: "Testbenches" }
    ];

    const edgesArray = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 3, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 42 },
        { from: 42, to: 60 },
        { from: 60, to: 71 },
        { from: 71, to: 86 }
    ];

    const nodes = new vis.DataSet(nodesArray);
    const edges = new vis.DataSet(edgesArray);

    const container = document.getElementById("mynetwork");
    const data = { nodes, edges };
    const options = {
        layout: { improvedLayout: true },
        nodes: { shape: "dot", size: 10, font: { size: 12, align: "top" } },
        edges: { arrows: { to: true }, color: "black", smooth: false },
        physics: {
            stabilization: { iterations: 100 },
            barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.3,
                springLength: 50,
                springConstant: 0.04,
                damping: 0.09
            }
        }
    };

    new vis.Network(container, data, options);
});
</script>

## 1. Foundations of Digital Design
Digital design forms the basis of modern computing, allowing for the creation of efficient hardware systems. This section introduces fundamental concepts necessary for digital circuit design.

### Topics Covered:
- **Number Systems and Representations**: Binary, octal, hexadecimal, and decimal systems.
- **Boolean Algebra and Logic Gates**: Fundamental logic operations and De Morgan’s Theorems.
- **Truth Tables and Logic Expressions**: Representation and simplification techniques.
- **Karnaugh Maps and Simplification Techniques**: Methods for optimizing logic expressions.

---

## 2. Combinational and Sequential Logic
Combinational circuits determine output based only on current inputs, while sequential circuits introduce memory elements that consider past inputs.

### Topics Covered:
- **Combinational Circuits**: Adders, multiplexers, decoders, encoders, and ALUs.
- **Sequential Circuits**: Flip-flops (D, T, JK, SR), shift registers, and counters.

---

## 3. Finite State Machines and Digital Memory
State-based circuits and memory elements play a crucial role in digital design, allowing devices to maintain and transition between states.

### Topics Covered:
- **Finite State Machines (FSMs)**: Moore vs. Mealy models, state diagrams.
- **Memory Elements and Storage**: SRAM vs. DRAM, memory hierarchy.

---

## 4. Verilog and Digital Circuit Design
Verilog is the primary hardware description language (HDL) used in digital design. This section covers Verilog basics and digital circuit design techniques.

### Topics Covered:
- **Verilog Syntax and Semantics**: Data types, operators, and module definitions.
- **Register Transfer Level (RTL) Design**: Structural and behavioral modeling.
- **Clocking and Timing Analysis**: Flip-flop behavior, edge-triggering, and timing constraints.

---

## 5. FPGA and Embedded Systems
Field-Programmable Gate Arrays (FPGAs) provide a flexible platform for hardware acceleration and embedded systems.

### Topics Covered:
- **FPGA Architecture**: Configurable logic blocks, interconnects, and bitstream generation.
- **FPGA vs. ASIC Design**: Differences, advantages, and trade-offs.
- **Embedded Systems and Hardware Acceleration**: Interfacing with peripherals, FPGA programming.

---

## 6. Digital Verification and Optimization
Verification ensures that digital circuits function correctly under all conditions, while optimization techniques enhance performance and efficiency.

### Topics Covered:
- **Simulation and Debugging**: Verilog testbenches and waveform analysis.
- **Power Optimization in Digital Circuits**: Low-power design strategies.
- **Design for Testability (DFT) and Built-in Self-Test (BIST)**: Techniques to ensure manufacturability.
- **Formal Verification and Assertion-Based Verification**: Methods for verifying correctness.

---

## Dependency Graph of Digital Design Concepts

Below is the fully connected dependency graph for the course:

<div id="dependency-graph" style="width: 100%; height: 600px; border: 1px solid #ccc;"></div>

<script src="dependency_graph.js"></script>  <!-- ✅ Updated path -->


