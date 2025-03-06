document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("dependency-graph");
    if (!container) return;

    d3.csv("digital_design_dependencies.csv").then(function (data) {
        const nodes = [];
        const links = [];

        // Define categories and colors
        const categories = {
            "Foundations of Digital Design": "#1f77b4",  // Blue
            "Combinational and Sequential Logic": "#ff7f0e",  // Orange
            "Finite State Machines and Digital Memory": "#2ca02c",  // Green
            "Verilog and Digital Circuit Design": "#d62728",  // Red
            "FPGA and Embedded Systems": "#9467bd",  // Purple
            "Digital Verification and Optimization": "#8c564b"  // Brown
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

        // Assign categories to nodes and filter out those without a category
        data.forEach(d => {
            let category = assignCategory(d["Concept Name"]);
            if (category) {
                nodes.push({ id: d["Concept ID"], name: d["Concept Name"], category: category });
                if (d.Dependencies) {
                    d.Dependencies.split('|').forEach(dep => {
                        if (dep) links.push({ source: dep, target: d["Concept ID"] });
                    });
                }
            }
        });

        // Filter links to remove any that connect to missing nodes
        const nodeIds = new Set(nodes.map(n => n.id));
        const validLinks = links.filter(link => nodeIds.has(link.source) && nodeIds.has(link.target));

        const width = container.clientWidth;
        const height = 600;

        // Create bordered container to prevent page movement
        container.style.overflow = "hidden";
        container.style.border = "1px solid #ccc";
        container.style.backgroundColor = "white";

        // Create zoomable SVG container inside a fixed space
        const svg = d3.select(container)
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .style("display", "block")
                      .style("margin", "0 auto")
                      .call(d3.zoom()
                          .scaleExtent([0.5, 2])
                          .on("zoom", function (event) {
                              g.attr("transform", event.transform);
                          }))
                      .append("g");

        const g = svg.append("g"); // Group for graph elements

        // Force simulation
        const simulation = d3.forceSimulation(nodes)
                             .force("link", d3.forceLink(validLinks).id(d => d.id).distance(150))
                             .force("charge", d3.forceManyBody().strength(-300))
                             .force("collide", d3.forceCollide(40)) // Prevent overlap
                             .force("center", d3.forceCenter(width / 2, height / 2)) // Centering the graph
                             .force("x", d3.forceX(width / 2).strength(0.1))
                             .force("y", d3.forceY(height / 2).strength(0.1))
                             .on("tick", ticked);

        // Create links
        const link = g.append("g")
                      .selectAll("line")
                      .data(validLinks)
                      .enter()
                      .append("line")
                      .style("stroke", "#999")
                      .style("stroke-width", "2px");

        // Create nodes with different colors for categories
        const node = g.append("g")
                      .selectAll("circle")
                      .data(nodes)
                      .enter()
                      .append("circle")
                      .attr("r", 12)
                      .style("fill", d => categories[d.category])
                      .call(d3.drag()
                          .on("start", dragStarted)
                          .on("drag", dragged)
                          .on("end", dragEnded));

        // Add text labels
        const text = g.append("g")
                      .selectAll("text")
                      .data(nodes)
                      .enter()
                      .append("text")
                      .attr("dx", 15)
                      .attr("dy", ".35em")
                      .text(d => d.name)
                      .style("font-size", "12px");

        function ticked() {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);

            text.attr("x", d => d.x + 5)
                .attr("y", d => d.y + 5);
        }

        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    });
});
