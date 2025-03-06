document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("dependency-graph");
    if (!container) return;

    d3.csv("digital_design_dependencies.csv").then(function (data) {
        const nodes = [];
        const links = [];

        // Parse CSV and construct nodes & links
        data.forEach(d => {
            nodes.push({ id: d["Concept ID"], name: d["Concept Name"] });
            if (d.Dependencies) {
                d.Dependencies.split('|').forEach(dep => {
                    if (dep) links.push({ source: dep, target: d["Concept ID"] });
                });
            }
        });

        const width = container.clientWidth;
        const height = 600;

        // Create SVG container
        const svg = d3.select(container)
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", `translate(${width / 2},${height / 2})`); // Start from center

        // Force Simulation with Centering
        const simulation = d3.forceSimulation(nodes)
                             .force("link", d3.forceLink(links).id(d => d.id).distance(150)) // Spread nodes more
                             .force("charge", d3.forceManyBody().strength(-300)) // Spread nodes apart
                             .force("collide", d3.forceCollide(40)) // Avoid node overlap
                             .force("x", d3.forceX(0).strength(0.05)) // Keep nodes centered
                             .force("y", d3.forceY(0).strength(0.05)) // Keep nodes centered
                             .on("tick", ticked);

        // Create links
        const link = svg.append("g")
                        .selectAll("line")
                        .data(links)
                        .enter()
                        .append("line")
                        .style("stroke", "#999")
                        .style("stroke-width", "1.5px");

        // Create nodes
        const node = svg.append("g")
                        .selectAll("circle")
                        .data(nodes)
                        .enter()
                        .append("circle")
                        .attr("r", 10)
                        .style("fill", "#4CAF50")
                        .call(d3.drag()
                            .on("start", dragStarted)
                            .on("drag", dragged)
                            .on("end", dragEnded));

        // Add labels
        const text = svg.append("g")
                        .selectAll("text")
                        .data(nodes)
                        .enter()
                        .append("text")
                        .attr("dx", 12)
                        .attr("dy", ".35em")
                        .text(d => d.name)
                        .style("font-size", "10px");

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
