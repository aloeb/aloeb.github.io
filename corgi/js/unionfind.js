// General Union Find stuff

function node(numb) {
	this.id = numb;
	this.parent = this;
}

function find(n) {
	if (n === n.parent) return n;
	else return find(n.parent);
}

function union(n1, n2) {
	if (n1 === n1.parent) n1.parent = n2;
	else union(n1.parent, n2);
}


// Maze specific stuff

// This will only build a square maze at the moment
function buildMaze(cells, edges) {
	// return value
	var R = [];
	// edges we haven't used yet
	var E = [];
	// cells
	var C = [];

	var width = Math.sqrt(cells);

	for (var i = 0; i < cells; i++) {
		C.push(new node(i));
	}

	for (var i = 0; i < edges; i++) {
		E.push(i);
	}

	while (R.length < cells - 1) {
		// pick random edge, (n, m)
		var i = Math.floor(Math.random() * E.length);
		var n = C[edgeToFirstCell(E[i], width)];
		var m = C[edgeToSecondCell(E[i], width)];
		if (find(n) != find(m)) {
			union(n, m);
			// Add edge to R and remove from E
			R.push(E[i]);
			E.splice(i, 1);
		}
	}

	R.sort(function(a, b) { return a > b ? 1 : -1});

	return R;
}

function edgeToFirstCell(edge, width) {
	return edge - ((width-1)*Math.floor((edge+width) / (width*2-1)));
}

function edgeToSecondCell(edge, width) {
	// If we are in between two horz cells
	if ((edge - width + 1) % (2*width-1) >= width || edge - width + 1 < 0) {
		return edgeToFirstCell(edge, width) + 1;
	}
	else { // If we are in between two vert cells
		return edgeToFirstCell(edge, width) + width;
	}
}