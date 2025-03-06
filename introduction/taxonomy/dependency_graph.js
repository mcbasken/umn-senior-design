document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("dependency-graph");
    if (!container) return;

    d3.csv("digital_design_dependencies.csv").then(function (data) {
        const nodes = [];
        const links = [];

        data.forEach(d => {
            nodes.push({ id: d["Concept ID"], name: d["Concept Name"] });
            if (d.Dependencies) {
                d.Dependencies.split('|').forEach(dep => {
                    if (dep) links.push({ source: dep, target: d["Concept ID"] });
                });
            }
        });

        const width = container.clientWidth - 40; // Reduce width slightly
        const height = 600;

        const svg = d3.select(container)
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g") // Ensures the graph elements are inside a group
                      .attr("transform", `translate(20,20)`); // Moves elements to avoid centering

        const simulation = d3.forceSimulation(nodes)
                             .force("link", d3.forceLink(links).id(d => d.id))
                             .force("charge", d3.forceManyBody().strength(-200))
                             .force("center", d3.forceCenter(width / 2, height / 2))
                             .force("collide", d3.forceCollide(30)) // Avoids clustering in the center
                             .force("x", d3.forceX(width / 2).strength(0.1)) // Spreads nodes horizontally
                             .force("y", d3.forceY(height / 2).strength(0.1)); // Spreads nodes vertically

        const link = svg.append("g")
                        .selectAll("line")
                        .data(links)
                        .enter()
                        .append("line")
                        .style("stroke", "#999")
                        .style("stroke-width", "1.5px");

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

        const text = svg.append("g")
                        .selectAll("text")
                        .data(nodes)
                        .enter()
                        .append("text")
                        .attr("dx", 12)
                        .attr("dy", ".35em")
                        .text(d => d.name)
                        .style("font-size", "10px");

        simulation.on("tick", () => {
            link.attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node.attr("cx", d => d.x)
                .attr("cy", d => d.y);

            text.attr("x", d => d.x + 5)
                .attr("y", d => d.y + 5);
        });

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
