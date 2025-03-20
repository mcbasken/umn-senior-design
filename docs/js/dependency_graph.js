// Ensure the script only runs when the page has fully loaded
document.addEventListener("DOMContentLoaded", function () {
    drawGraph();
});

// Function to initialize and draw the dependency graph
function drawGraph() {
    // Define categories and colors
    const categories = {
        "Foundations of Digital Design": "#1f77b4",
        "Combinational and Sequential Logic": "#ff7f0e",
        "Finite State Machines and Digital Memory": "#2ca02c",
        "Verilog and Digital Circuit Design": "#d62728",
        "FPGA and Embedded Systems": "#9467bd",
        "Digital Verification and Optimization": "#8c564b"
    };

    function assignCategory(concept) {
        if (!concept) return null;
        if (concept.includes("Number") || concept.includes("Boolean") || concept.includes("Base Conversion")) return "Foundations of Digital Design";
        if (concept.includes("Combinational") || concept.includes("Flip-Flop") || concept.includes("Counter")) return "Combinational and Sequential Logic";
        if (concept.includes("FSM") || concept.includes("Memory")) return "Finite State Machines and Digital Memory";
        if (concept.includes("Verilog")) return "Verilog and Digital Circuit Design";
        if (concept.includes("FPGA") || concept.includes("Embedded")) return "FPGA and Embedded Systems";
        if (concept.includes("Verification") || concept.includes("Optimization")) return "Digital Verification and Optimization";
        return "Foundations of Digital Design";
    }

    // Define dependency nodes from CSV
    const csvData = `
    Concept ID,Concept Name,Dependencies
    1,Digital vs Analog,
    2,Binary System,1
    3,Number Systems,2
    4,Base Conversion,3
    5,Boolean Algebra,3
    6,Logic Gates,5
    7,Truth Tables,6
    8,DeMorgan's Theorems,5
    9,Logic Minimization,5
    10,Karnaugh Maps,9
    11,Sum of Products (SOP),10
    12,Product of Sums (POS),10
    13,Combinational Circuits,6|10
    14,Adders & Subtractors,13
    15,Multiplexers (MUX),13
    16,Demultiplexers (DEMUX),13
    17,Encoders,13
    18,Decoders,13
    19,Parity Generators,13
    20,Comparators,13
    21,Arithmetic Logic Unit (ALU),14
    22,Flip-Flops,13
    23,SR Latch,22
    24,D Flip-Flop,22
    25,JK Flip-Flop,22
    26,T Flip-Flop,22
    27,Master-Slave Flip-Flop,22
    28,Clocking Mechanisms,22
    29,Edge vs Level Triggering,28
    30,Timing Diagrams,28
    31,Setup & Hold Time,28
    32,Propagation Delay,28
    33,Asynchronous Circuits,28
    34,Synchronous Circuits,28
    35,Counters,34
    36,Ripple Counters,35
    37,Synchronous Counters,35
    38,Ring Counter,35
    39,Johnson Counter,35
    40,Shift Registers,34
    41,Universal Shift Registers,40
    42,Finite State Machines (FSM),22|34
    43,Moore vs Mealy FSM,42
    `;

    const rows = csvData.trim().split("\n").slice(1).filter(row => row.trim() !== "");
    const nodesArray = [];
    const edgesArray = [];

    rows.forEach(row => {
        const [id, name, dependencies] = row.split(",").map(s => s.trim());
        nodesArray.push({
            id: parseInt(id),
            label: name,
            color: categories[assignCategory(name)],
            shape: "dot",
            size: 12,
            font: { align: "top" }
        });

        if (dependencies) {
            dependencies.split("|").forEach(dep => {
                edgesArray.push({ from: parseInt(dep), to: parseInt(id) });
            });
        }
    });

    const nodes = new vis.DataSet(nodesArray);
    const edges = new vis.DataSet(edgesArray);

    // Create the network visualization
    const container = document.getElementById("mynetwork");
    if (!container) {
        console.error("Error: Element with ID 'mynetwork' not found!");
        return;
    }

    const data = { nodes, edges };
    const options = {
        layout: { improvedLayout: true },
        nodes: {
            shape: "dot",
            size: 12,
            font: { size: 14, align: "top" }
        },
        edges: {
            arrows: { to: true },
            color: "black",
            smooth: false
        },
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
}
