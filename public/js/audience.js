var colors = ["#6640CC ", "#FF0066", "#FCBD12", "#00D2C1"]
var aquablue = d3.rgb(0, 214, 194);
var hotpink = d3.rgb(255, 0, 102);
var indigo = d3.rgb(102, 64, 204);



//------------------------------Newsletter-------------------------
function addSubscribers(numSubs) {
    var newsletter = document.getElementById('newletterSubscribers');
    var sub_count = document.createElement('span');
    if (numSubs != "" && numSubs != null) {
        sub_count.innerHTML = numSubs.toString() + " SUBSCRIBERS";
        newsletter.appendChild(sub_count);
    }
}

addSubscribers(localStorage.getItem("numSubs"));

//------------------------------MONTHLY UNIQUES/PAGEVIEW-------------------------
var newData = [{
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
}];

var chart1 = c3.generate({
    bindto: '#monthlyUniquesdiv',
    data: {
        x: 'x',
        columns: [
            ['x', 'Uniques', 'Pageviews'],
            ['Her Campus', 30, 200],
            ['InfluenceHer Collective', 90, 100],
            ['BetchesLoveThis.com', 50, 120]
        ],
        groups: [
            ['Her Campus']
        ],
        colors: {
            'Her Campus': '#FF0066',
            'InfluenceHer Collective': '#00D6C2',
            'BetchesLoveThis.com': '#6640CC',

        },
        type: 'bar'
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
});

setTimeout(function() {
    chart1.groups([
        ['Her Campus', 'InfluenceHer Collective', 'BetchesLoveThis.com']
    ])
}, 500);

//------------------------------SOCIAL MEDIA REACH-------------------------------

var chart = c3.generate({
    bindto: "#socialmediareach",
    data: {
        x: 'x',
        columns: [
            ['x', 'INFLUENCEHER', 'BETCHES', 'NATIONAL', 'CHAPTERS'],
            ['Facebook', 30, 200, 200, 400],
            ['Twitter', 130, 100, 100, 200],
            ['Instagram', 230, 200, 200, 300],
            ['Pinterest', 30, 100, 150, 230],
            ['YouTube', 230, 90, 200, 300],
            ['Tumblr', 130, 70, 500, 300],
            ["B'", 50, 200, 200, 60]
        ],
        type: 'bar',
        groups: [
            ['Facebook']
        ],
        colors: {
            Facebook: '#FF0066',
            Twitter: '#00D6C2',
            Instagram: '#6640CC',
            Pinterest: '#FCBD12',
            YouTube: '#B5E136',
            Tumblr: '#B2167E'
        },
    },
    bar: {
        width: {
            ratio: 0.5
        }
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    },
    transition: {
        duration: 2000
    }
});


setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter']
    ])
}, 800);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram']
    ])
}, 1800);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest']
    ])
}, 2600);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube']
    ])
}, 3400);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube', 'Tumblr']
    ])
}, 4200);

setTimeout(function() {
    chart.groups([
        ['Facebook', 'Twitter', 'Instagram', 'Pinterest', 'YouTube', 'Tumblr', "B'"]
    ])
}, 5000);


/*-------------------------Chapter Presence----------------------------*/
function createChapterPresence(){
    var chPresence = document.getElementById("chapterPresence");
    
}



/*--------------------------Site traffic----------------*/

function setSitetraffic(mobileP, desktopP, tabletP) {
    var mobile = document.getElementById('mobilePercent');
    mobile.innerHTML = "<span>MOBILE: " + mobileP + "%<br></span>" + mobile.innerHTML;
    var desktop = document.getElementById('desktopPercent');
    desktop.innerHTML = "<span>DESKTOP: " + desktopP + "%<br></span>" + desktop.innerHTML;
    var tablet = document.getElementById('tabletPercent');
    tablet.innerHTML = "<span>TABLET: " + tabletP + "%<br></span>" + tablet.innerHTML;
}

setSitetraffic(localStorage.getItem("deviceData[0]"), localStorage.getItem("deviceData[1]"), localStorage.getItem("deviceData[2]"));

/*----------------set total audience----------------------*/
$("#audienceCount").html(localStorage.getItem("totalAudience"));

/*---------------hamburger menu-----------------*/
$("#submit").click(function(e) {
    console.log("Clicked");

    var deviceData = [];
    var siteTrafficData = $("#siteTrafficPerc").val();
    console.log(siteTrafficData);
    if (siteTrafficData != "") {
        var siteTrafficData = siteTrafficData.split(',');

        for (var i = 0; i < siteTrafficData.length; i++) {
            deviceData[i] = parseInt(siteTrafficData[i]);
            localStorage.setItem("deviceData[" + i.toString() + "]", deviceData[i]);
        }
    }
    console.log(deviceData);


    var numSubs = parseInt($("#newsletterSubs").val());
    if (numSubs != "") {
        localStorage.setItem("numSubs", numSubs);
    }

    var totalAudience = $("#totalAudience").val();
    if (totalAudience != "") {
        localStorage.setItem("totalAudience", totalAudience);
    }


    $(".devices span").empty();
    $("#newletterSubscribers span").empty();
    $("#audienceCount").empty();

    setSitetraffic(localStorage.getItem("deviceData[0]"), localStorage.getItem("deviceData[1]"), localStorage.getItem("deviceData[2]"));
    addSubscribers(localStorage.getItem("numSubs"));

    $("#audienceCount").html(localStorage.getItem("totalAudience"));


    e.preventDefault();

})
