
var purp = d3.rgb(102,64,204);
var turq = d3.rgb(0,214,194);
var pink=d3.rgb(255,0,102);
var yellow = d3.rgb(252,189,18);

var fbdata = {
	'Likes': 3,
	'Comments': 6,
	'Shares': 24
};

var twtdata = {
	"Likes":500,
	"Replies":230,
	"Retweets":100,
	"Clicks":1000
};

var instdata = {
	"Likes":500,
	"Re-pins":230
}

var pintdata = {
	"Likes":370,
	"Re-pins":200
}

var titlemappings = {
	0: ["facebook", purp, fbdata],
	1: ["twitter", turq, twtdata],
	2: ["instagram", pink, instdata],
	3: ["pinterest", yellow, pintdata]
};



function drawBarGraph(data, i) {
	var divID=titlemappings[i][0];
	var color=titlemappings[i][1];

	var margin = {
		top: 70,
		right: 30,
		bottom: 70,
		left: 50
	},
	width = 270 - margin.left - margin.right,
	height = 330 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1)
		.domain(sortDescending(data).map(function(d) {
			return d.key
		}));
	var y = d3.scale.linear()
		.domain([0, getMax(data)])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left")
		.ticks(10);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function(d) {
			console.log(d);
			return d3.values(d)[1];
		})

	var svg = d3.select("#" + divID).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.call(tip);

	//x axis label
	svg.append("text")
		.attr("class", "x label")
		.attr("text-anchor", "end")
		.attr("x", width / 2)
		.attr("y", height + 30)
		//.text("Taxa")

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis); //Creates x axis label

	//necessary?
	svg.selectAll("text")
		.call(wrap, x.rangeBand())
		.attr("y", 0)
		.attr("x", 50)
		//.attr("transform", "rotate(45)")
		.style("text-anchor", "start");

	var yLine = svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -70)
		.attr("dy", ".71em")
		.style("text-anchor", "end");

	var bars = svg.selectAll(".bar")
		.data(d3.entries(data))
		.enter().append("rect")
		.attr("fill", color) 
		.attr("class", "bar")
		.attr("x", function(d) {
			return x(d.key);
		})
		.attr("width", x.rangeBand())
		.attr("y", function(d) {
			return y(d3.values(d)[1]);
		})
		.attr("height", function(d) {
			return height - y(d3.values(d)[1]);
		})
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
}

function wrap(text, width) {
	text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.1, // ems
			y = text.attr("y"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
		while (word = words.pop()) {
			line.push(word);
			tspan.text(line.join(" "));
			if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			}
		}
	});
}

function type(d) {
	d.value = +d.value;
	return d;
}

//@data is an object
function getMax(data) {
	var max = 0;
	for (var key in data) {
		if (data[key] > max) {
			max = data[key];
		}
	}
	return max;

}


function sortDescending(data) {
	return d3.entries(data).sort(function(a, b) {
		return d3.values(b)[1] - d3.values(a)[1];
	});
}




function addTitlesGraphs() {
	for (var i = 0; i < 4; i++) {
		var area = document.getElementById(titlemappings[i][0]);
		var title = document.createElement("div");
		title.className = "titles";
		title.innerHTML = "HerCampus.com " + titlemappings[i][0].toUpperCase() + " ENGAGEMENT";
		area.appendChild(title);

		drawBarGraph(titlemappings[i][2], i);

		var img = document.createElement("img");
		img.src = "css/Images/SocialEngagement_"+titlemappings[i][0]+".svg";
		img.width="100";
		img.height="120";
		img.className="svg_image";
		area.appendChild(img);
	}
}

addTitlesGraphs();