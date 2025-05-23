function drawGraph() {
    fetch("/umn-senior-design/introduction/digital_design_dependencies.csv")
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split("\n").slice(1).filter(row => row.trim() !== ""); // Remove header & empty lines
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
                if (!concept) return null;
                if (concept.includes("Number") || concept.includes("Boolean")) return "Foundations of Digital Design";
                if (concept.includes("Combinational") || concept.includes("Flip-Flop")) return "Combinational and Sequential Logic";
                if (concept.includes("FSM") || concept.includes("Memory")) return "Finite State Machines and Digital Memory";
                if (concept.includes("Verilog")) return "Verilog and Digital Circuit Design";
                if (concept.includes("FPGA") || concept.includes("Embedded")) return "FPGA and Embedded Systems";
                if (concept.includes("Verification") || concept.includes("Optimization")) return "Digital Verification and Optimization";
                return null;
            }

            const nodeSet = new Map();
            const edgeSet = new Set();

            rows.forEach(row => {
                const [id, name, dependencies] = row.split(",").map(s => s.trim().replace(/^"|"$/g, ''));

                let category = assignCategory(name);
                if (!category) return; // Skip if no category assigned

                if (!nodeSet.has(id)) {
                    nodeSet.set(id, {
                        id,
                        label: name,
                        color: categories[category],
                        title: `Category: ${category}`, // Tooltip on hover
                    });
                }

                if (dependencies && dependencies.trim() !== "") {
                    dependencies.split("|").forEach(dep => {
                        if (dep && !edgeSet.has(`${dep}-${id}`)) {
                            edges.push({ from: dep, to: id, arrows: "to" });
                            edgeSet.add(`${dep}-${id}`);
                        }
                    });
                }
            });

            const nodesArray = Array.from(nodeSet.values());

            const container = document.getElementById("mynetwork");
            if (!container) {
                console.error("Error: Graph container not found!");
                return;
            }

            const data = {
                nodes: new vis.DataSet(nodesArray),
                edges: new vis.DataSet(edges)
            };

            const options = {
                layout: { improvedLayout: true },
                edges: {
                    arrows: { to: true },
                    color: { color: "black", highlight: "#ff0000", hover: "#00ff00" },
                    smooth: { type: "dynamic" }
                },
                physics: {
                    enabled: true,
                    solver: "forceAtlas2Based",
                    forceAtlas2Based: {
                        gravitationalConstant: -50,
                        centralGravity: 0.005,
                        springLength: 150,
                        springConstant: 0.02
                    },
                    maxVelocity: 50,
                    stabilization: { iterations: 150 }
                },
                interaction: {
                    zoomView: true,
                    dragView: true,
                    hover: true
                }
            };

            const network = new vis.Network(container, data, options);

            // Make nodes clickable
            network.on("click", function (params) {
                if (params.nodes.length > 0) {
                    let nodeId = params.nodes[0];
                    alert("You clicked on: " + nodeSet.get(nodeId).label);
                }
            });
        })
        .catch(error => console.error("Error loading graph data:", error));
}
