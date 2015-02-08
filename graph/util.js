define(['../util'], function(util) {
  var GraphUtil = {};

  function addRandomEdge(graph) {
    // Add a random edge in the graph that maintains planarity

    var TRIES = 10;
    var nodes = graph.nodes;

    for (var i = 0; i < TRIES; ++i) {
      var choices = util.random.choose(2, nodes);
      var u = choices[0];
      var v = choices[1];
      if (graph.addEdge(u, v)) {
        return true;
      }
    }

    return false;
  }

  function splitRandomNode(graph) {
    // Find a node and randomly split it
  }

  GraphUtil.generate = function(options) {
    // I imagine something like this:
    // First, generate a random planar wheel embedding
    // Next we continue with making the graph interesting
    // We only ever need to choose to split a vertex or add an edge

    // Decide whether to split a vertex or add an edge.
    // To do this, we also need to determine if we can split a vertex.
    // (We can split if graph.maxDegree >= 4)
    // Now, to split a vertex, choose two random non-adjacent vertices

    // To add an edge, simply add one and check for intersections
    // We can retry this some number of times before giving up
    var canvas = document.getElementById(options.canvas);
    var ctx = canvas.getContext('2d');

    //var graph = Graph.planarWheel();
    var success = false;
    while (success) {
      if (graph.maxDegree < 3) {
        // No choice but to add an edge
        success = addRandomEdge(graph);
        continue;
      }

      var split = Math.random() < 0.5;

      if (split) {
        success = splitRandomNode(graph);
      }
      else {
        success = addRandomEdge(graph);
      }

    }

    var mid = {
      x : canvas.width / 2,
      y : canvas.height / 2
    };

    var radius = util.random.number(100, 150);
    var polygonSize = util.randomNumber(5, 10);
    var points = convexPoints(polygonSize, radius, mid);

    for (var i = 0; i < points.length; ++i) {
      drawNode(points[i], ctx);
    }
    drawNode(mid, ctx);
  };

  function drawNode(pt, ctx) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
  }

  function convexPoints(num, radius, mid) {
    // Return an array of points for a regular convex polygon with
    // given radius and center
    var points = [];
    var angle = Math.PI * 2 / num;
    for (var i = 0; i < num; ++i) {
      points.push({
        x : mid.x + (Math.cos(angle * i) * radius),
        y : mid.y + (Math.sin(angle * i) * radius)
      });
    }
    return points;
  }

  return GraphUtil;
});
