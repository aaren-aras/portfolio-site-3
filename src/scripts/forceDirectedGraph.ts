// Adapted from https://codesandbox.io/p/sandbox/d3js-draggable-force-directed-graph-py3rf?file=%2Fapp.js%3A63%2C50

// document.addEventListener('DOMContentLoaded', () => {
// need IIFE?

// move into Astro component cause you need to pack it with css too anyway?

var width = 500;
var height = 500;

var nodes = [
  { color: "grey", size: 5 },
  { color: "white", size: 10 },
  { color: "black", size: 15 },
  { color: "green", size: 20 },
  { color: "blue", size: 25 },
  { color: "purple", size: 30 }
];

var links = [
  { source: "grey", target: "white" },
  { source: "white", target: "black" },
  { source: "black", target: "green" },
  { source: "green", target: "blue" },
  { source: "blue", target: "purple" },
  { source: "purple", target: "grey" },
  { source: "green", target: "grey" }
];

var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

var linkSelection = svg
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "white")
  .attr("stroke-width", 2);

var nodeSelection = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => d.color)
  .call(
    d3
      .drag()
      .on("start", dragStart)
      .on("drag", drag)
      .on("end", dragEnd)
  );

var simulation = d3.forceSimulation(nodes);

simulation
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("nodes", d3.forceManyBody())
  .force(
    "links",
    d3
      .forceLink(links)
      .id(d => d.color)
      .distance(d => 5 * (d.source.size + d.target.size))
  )
  .on("tick", ticked);

function ticked() {
  // console.log(simulation.alpha());

  nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);

  linkSelection
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
}

function dragStart(d) {
  // console.log('drag start');
  simulation.alphaTarget(0.5).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function drag(d) {
  // console.log('dragging');
  // simulation.alpha(0.5).restart()
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragEnd(d) {
  // console.log('drag end');
  simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
// });