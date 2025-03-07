function drawGraph() {
    // Load CSV file
    fetch("digital_design_dependencies.csv")
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split("\n").slice(1); // Remove header
        const nodes = [];
        const edges = [];

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
            if (concept.includes("Number") || concept.includes("Boolean")) return "Foundations of Digital Design";
            if (concept.includes("Combinational") || concept.includes("Flip-Flop")) return "Combinational and Sequential Logic";
            if (concept.includes("FSM") || concept.includes("Memory")) return "Finite State Machines and Digital Memory";
            if (concept.includes("Verilog")) return "Verilog and Digital Circuit Design";
            if (concept.includes("FPGA") || concept.includes("Embedded")) return "FPGA and Embedded Systems";
            if (concept.includes("Verification") || concept.includes("Optimization")) return "Digital Verification and Optimization";
            return null; // Remove items without a category
        }

        const nodeSet = new Map(); // Track nodes by ID
        const edgeSet = new Set(); // Track unique edges

        rows.forEach(row => {
            const [id, name, dependencies] = row.split(",");

            let category = assignCategory(name);
            if (!category) return; // Skip if no category assigned

            // Add node only if it's not already included
            if (!nodeSet.has(id)) {
                nodeSet.set(id, { id, label: name, color: categories[category] });
            }

            if (dependencies) {
                dependencies.split("|").forEach(dep => {
                    if (dep && !edgeSet.has(`${dep}-${id}`)) { // Avoid duplicate edges
                        edges.push({ from: dep, to: id, arrows: "to" });
                        edgeSet.add(`${dep}-${id}`);
                    }
                });
            }
        });

        // Convert map back to array for vis.js
        const nodesArray = Array.from(nodeSet.values());

        // Create vis.js network
        const container = document.getElementById("mynetwork");
        const data = { nodes: new vis.DataSet(nodesArray), edges: new vis.DataSet(edges) };
        const options = {
            layout: {
                hierarchical: false,
                improvedLayout: true
            },
            edges: {
                arrows: { to: true },
                color: "black",
                smooth: true
            },
            physics: {
                enabled: true,
                repulsion: {
                    nodeDistance: 150 // Adjusts node spacing
                }
            },
            interaction: {
                zoomView: true,
                dragView: true
            }
        };

        new vis.Network(container, data, options);
    })
    .catch(error => console.error("Error loading graph data:", error));
}
