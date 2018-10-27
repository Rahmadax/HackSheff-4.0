$(document).ready(function() {
  redraw();
  window.addEventListener("resize", redraw);
});

function redraw() {
  var contentdiv = d3.select("#contentdiv").node();
  var width = contentdiv.getBoundingClientRect().width;
  var height = contentdiv.getBoundingClientRect().height;

  d3.select("#content")
    .attr("width", width)
    .attr("height", height);
}
