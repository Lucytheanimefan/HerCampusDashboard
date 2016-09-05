var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D6C2"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);


//createLineChart("#chapterGrowth");
addImage("Chapter", "chapterGrowth");
//createLineChart("#totalMonthlyViews");
addImage("Laptop", "totalMonthlyViews");
//createLineChart("#newsletterSubscribers");
addImage("Newsletter", "newsletterSubscribers");

var somedata = ['y', 60, 100, 200, 250, 270, 300];
createLineChart("#chapterGrowthDiv", somedata, "#FCBD12");
createLineChart("#totalMonthlyViewsDiv", somedata, "#6640CC");
createLineChart("#newsletterSubscribersDiv", somedata, "#FF0066");

var chart1 = c3.generate({
    bindto: '#monthlyUniquesChart',
    data: {
        x: 'x',
        columns: [
            ['x', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['HC.com Monthly Uniques', 30, 200, 100, 400, 150, 250],
            ['HC.com Monthly Pageviews', 130, 340, 200, 500, 250, 350]
        ],
        groups: [
            ['download', 'loading']
        ],
        type: 'line',
        colors: {
            'HC.com Monthly Uniques': '#FF0066',
            'HC.com Monthly Pageviews': '#00D6C2'
        }
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

var chart = c3.generate({
    bindto: '#nationalChart',
    data: {
        x: 'x',
        columns: [
            ['x', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
            //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            ['Facebook', 30, 200, 100, 400, 150, 250],
            ['Twitter', 130, 340, 200, 500, 250, 350],
            ['Pinterest', 50, 140, 150, 600, 200, 300],
            ['Instagram', 100, 200, 100, 550, 100, 400]
        ],
        groups: [
            ['download', 'loading']
        ],
        type: 'line',
        colors: {
            Facebook: '#FF0066',
            Twitter: '#00D6C2',
            Pinterest: '#FCBD12',
            Instagram: '#6640CC'
        },
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});


function formatCurrency(d) {
    return "$" + d;
}

function createLineChart(appendDiv, data, color) {
    var chart = c3.generate({
        bindto: appendDiv,
        size: {
            width: 480,
            height: 190
        },
        padding: {
            left: 60,
            right: 40,
        },
        data: {
            x: 'x',
            columns: [
                ['x', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
                data
            ],
            type: 'line',
            colors: {
                y: color
            },
        },
        axis: {
            x: {
                type: 'category' // this needed to load string x value
            }
        },
        legend: {
            show: false
        }
    });

}

function addImage(imageName, divArea) {
    var area = document.getElementById(divArea);
    var img = document.createElement("img");
    img.src = "css/Images/History_" + imageName + ".svg";
    img.width = "120";
    img.height = "120";
    img.className = "svg_image";
    area.appendChild(img);
}
