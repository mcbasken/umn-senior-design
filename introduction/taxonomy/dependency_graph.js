document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("dependency-graph");
    if (!container) return;

    d3.csv("digital_design_dependencies.csv").then(function (data) {
        const nodes = [];
        const links = [];

        // Define categories and colors
        const categories = {
            "Foundations of Digital Design": "#1f77b4",
            "Combinational and Sequential Logic": "#ff7f0e",
            "Finite State Machines and Digital Memory": "#2ca02c",
            "Verilog and Digital Circuit Design": "#d62728",
            "FPGA and Embedded Systems": "#9467bd",
            "Digital Verification and Optimization": "#8c564b"
        };

        // Assign categories based on Concept Name
        data.forEach(d => {
            let category = "Other"; // Default category
            if (d["Concept Name"].includes("Number") || d["Concept Name"].includes("Boolean")) category = "Foundations of Digital Design";
            if (d["Concept Name"].includes("Combinational") || d["Concept Name"].includes("Flip-Flop")) category = "Combinational and Sequential Logic";
            if (d["Concept Name"].includes("FSM") || d["Concept Name"].includes("Memory")) category = "Finite State Machines and Digital Memory";
            if (d["Concept Name"].includes("Verilog")) category = "Verilog and Digital Circuit Design";
            if (d["Concept Name"].includes("FPGA") || d["Concept Name"].includes("Embedded")) category = "FPGA and Embedded Systems";
            if (d["Concept Name"].includes("Verification") || d["Concept Name"].includes("Optimization")) category = "Digital Verification and Optimization";

            nodes.push({ id: d["Concept ID"], name: d["Concept Name"], category: category });
            if (d.Dependencies) {
                d.Dependencies.split('|').forEach(dep => {
                    if (dep) links.push({ source: dep, target: d["Concept ID"] });
                });
            }
        });

        const width = container.clientWidth;
        const height = 600;

        // Create zoomable SVG container
        const svg = d3.select(container)
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .call(d3.zoom().scaleExtent([0.5, 2]).on("zoom", function (event) {
                          g.attr("transform", event.transform);
                      }))
                      .append("g");

        const g = svg.append("g"); // Group for graph elements

        // Force simulation
        const simulation = d3.forceSimulation(nodes)
                             .force("link", d3.forceLink(links).id(d => d.id).distance(120))
                             .force("charge", d3.forceManyBody().strength(-250))
                             .force("collide", d3.forceCollide(50)) // Prevents clustering
                             .force("x", d3.forceX().strength(0.1)) // Keeps spread horizontally
                             .force("y", d3.forceY().strength(0.1)) // Keeps spread vertically
                             .on("tick", ticked);

        // Create links
        const link = g.append("g")
                      .selectAll("line")
                      .data(links)
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
                      .style("fill", d => categories[d.category] || "#ccc")
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
