//multiplatformViews
var engagementData = [{
    "interest_rate": "HC.COM",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "TEEN VOGUE",
    "Facebook": 300,
    "Twitter": 150,
    "Pinterest": 206,
    "Instagram": 60
}, {
    "interest_rate": "SEVENTEEN",
    "Facebook": 550,
    "Twitter": 10,
    "Pinterest": 76,
    "Instagram": 100
}, {
    "interest_rate": "GLAMOUR",
    "Facebook": 300,
    "Twitter": 150,
    "Pinterest": 56,
    "Instagram": 50
}, {
    "interest_rate": "REFINERY29",
    "Facebook": 500,
    "Twitter": 300,
    "Pinterest": 26,
    "Instagram": 500
}, {
    "interest_rate": "COSMO",
    "Facebook": 400,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "MARIE CLAIRE",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}];

//multiplatformViews
var reachData = [{
    "interest_rate": "HC.COM",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "GLAMOUR",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "TEEN VOGUE",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "REFINERY29",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "COSMO",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "MARIE CLAIRE",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}, {
    "interest_rate": "SEVENTEEN",
    "Facebook": 500,
    "Twitter": 100,
    "Pinterest": 66,
    "Instagram": 20
}];

function createMultiPlatformViews(data, idArea) {
    var platform = document.getElementById(idArea);
    var title = document.createElement("div");
    title.innerHTML = "";
    title.id = "multiPlat_" + idArea;
    platform.appendChild(title);

    var uniqueColors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"];
    var margin = {
            top: 20,
            right: 100,
            bottom: 40,
            left: 80
        },
        width = 500 - margin.left - margin.right,
        height = 230 - margin.top - margin.bottom,
        that = this;


    var x = d3.scale.ordinal().rangeRoundBands([0, width], .3);

    var y = d3.scale.linear().rangeRound([height, 0]);

    var color = d3.scale.ordinal()
        .range(uniqueColors);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format(".0%"));

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var total_amt;
            total_amt = d.amount;
            return total_amt;

        })

    var svg = d3.select("#multiPlat_" + idArea)
        .append("svg")
        .attr("id", "multiPlatSVG_" + idArea)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    color.domain(d3.keys(data[0]).filter(function(key) {
        return key !== "interest_rate";
    }));


    data.forEach(function(d) {
        var y0 = 0;

        d.rates = color.domain().map(function(name) {
            console.log();;
            return {
                name: name,
                y0: y0,
                y1: y0 += +d[name],
                amount: d[name]
            };
        });
        d.rates.forEach(function(d) {
            d.y0 /= y0;
            d.y1 /= y0;
        });

        console.log(data);
    });

    data.sort(function(a, b) {
        return b.rates[0].y1 - a.rates[0].y1;
    });

    x.domain(data.map(function(d) {
        return d.interest_rate;
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap, x.rangeBand());

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    var interest_rate = svg.selectAll(".interest-rate")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "interest-rate")
        .attr("transform", function(d) {
            return "translate(" + x(d.interest_rate) + ",0)";
        })

    interest_rate.selectAll("rect").data(function(d) {
            return d.rates;
        }).enter().append("rect").attr("width", x.rangeBand()).attr("y", function(d) {
            return y(d.y1);
        }).attr("height", function(d) {
            return y(d.y0) - y(d.y1);
        }).style("fill", function(d) {
            return color(d.name);
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    var legend = svg.selectAll(".legend").data(color.domain().slice().reverse()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
        return "translate(330," + i * 50 + ")";
    });


    legend.append("rect").attr("x", width - 340).attr("width", 10).attr("height", 10).style("fill", color);

    legend.append("text")
        .attr("x", width - 40)
        .attr("y", 5)
        .attr("width", 50)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
            return d;
        })
        .call(wrap, 80);



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

//create the titles 
function createTitles() {
    var comp_engagement = document.getElementById("comp_engagement");
    var comp_engagement_title = document.createElement("div");
    comp_engagement_title.id = "comp_engagement_title";
    comp_engagement_title.className = "titles";
    comp_engagement_title.innerHTML = "ENGAGEMENT";
    comp_engagement.appendChild(comp_engagement_title);

    var comp_reach = document.getElementById("comp_reach");
    var comp_reach_title = document.createElement("div");
    comp_reach_title.id = "comp_reach_title";
    comp_reach_title.className = "titles";
    comp_reach_title.innerHTML = "REACH";
    comp_reach.appendChild(comp_reach_title);
}


/*----------------------pie charts---------------------*/
var dataset = [{
    category: "TWITTER",
    measure: 150
}, {
    category: "INSTAGRAM",
    measure: 550
}, {
    category: "FACEBOOK",
    measure: 300
}, {
    category: "PINTEREST",
    measure: 100
}, {
    category: "YOUTUBE",
    measure: 200
}];

var formatAsPercentage = d3.format("%"),
    formatAsPercentage1Dec = d3.format(".1%"),
    formatAsInteger = d3.format(","),
    fsec = d3.time.format("%S s"),
    fmin = d3.time.format("%M m"),
    fhou = d3.time.format("%H h"),
    fwee = d3.time.format("%a"),
    fdat = d3.time.format("%d d"),
    fmon = d3.time.format("%b");

function createPieChart(divId, data, atitle) {
    var chart = c3.generate({
        bindto: '#' + divId,
        data: {
            columns: [
                ['TWITTER', data[0]],
                ['INSTAGRAM', data[1]],
                ['FACEBOOK', data[2]],
                ['PINTEREST', data[3]],
                ['YOUTUBE', data[4]],
                ['TUMBLR', data[5]]
            ],
            type: 'donut',
            onclick: function(d, i) { console.log("onclick", d, i); },
            onmouseover: function(d, i) { console.log("onmouseover", d, i); },
            onmouseout: function(d, i) { console.log("onmouseout", d, i); },
            colors: {
                TWITTER: '#FF0066',
                INSTAGRAM: '#00D6C2',
                FACEBOOK: '#6640CC',
                PINTEREST: '#FCBD12',
                YOUTUBE: '#B5E136',
                TUMBLR: '#B2167E'
            },
        },
        donut: {
            title: atitle
        },
        legend: {
            show: false
        }
    });

    chart.resize({ height: 200, width: 200 })
}

var titleMappings = {
    0: ["HERCAMPUS.COM", [10, 100, 50, 200, 150, 70]],
    1: ["TEEN VOGUE", [10, 100, 50, 200, 150, 70]],
    2: ["SEVENTEEN", [10, 100, 50, 200, 150, 70]],
    3: ["COSMOPOLITAN", [10, 100, 50, 200, 150, 70]],
    4: ["GLAMOUR", [10, 100, 50, 200, 150, 70]],
    5: ["REFINERY29", [10, 100, 50, 200, 150, 70]]
};

function createPies() {
    for (var i = 0; i < 6; i++) {
        var pieDiv = document.getElementById("pieChart_" + i.toString());
        /*var title = document.createElement("div");
        title.className = "titles";
        title.innerHTML = titleMappings[i][0];

        pieDiv.appendChild(title);
        console.log(titleMappings[i][1]); */
        createPieChart("pieChart_" + i.toString(), titleMappings[i][1], titleMappings[i][0])
            //dsPieChart(dataset, "pieChart_" + i.toString(), "14,000,000");

    }
}

//calling all the functions here
createTitles();
createMultiPlatformViews(engagementData, "comp_engagement");
createMultiPlatformViews(reachData, "comp_reach");
createPies();
