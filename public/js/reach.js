//multiplatformViews
var multiPlatformData = [{
    "interest_rate": "",
    "Social content views": 500,
    "Pageviews": 100,
    "Chapter social follower count": 66
}];

createMultiPlatformViews();

function createMultiPlatformViews() {
    var chart1 = c3.generate({
        bindto: '#multiplatformViews',
        data: {
            x: 'x',
            columns: [
                ['x', 'Her Campus'],
                ['Pageviews', 20],
                ['Chapter social follower count', 10],
                ['Social Content View', 75]
            ],
            groups: [
                ['Pageviews', 'Chapter social follower count', 'Social Content View']
            ],
            colors: {
                'Social Content Views': "#6640CC",
                'Pageviews': "#FCBD12",
                'Chapter social follower count': "#00D6C2"
            },
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.4
            }
        },
        padding: {
            right: 20,
            left: 20
        },
        axis: {
            x: {
                type: 'category' // this needed to load string x value
            }
        },
        tooltip: {
            show: true,
            grouped: false
        }
    });

}

/*--------------------Social media reach---------------*/
var socialMedia = ["FB", "Twitter", "Pinterest", "Insta", "Snapchat"];
var socialMediaCounts = ["34,155,441", "4,850,000", "25,974,379", "41,782", "3,000"];

function createSocialMediaReach() {

    var social = document.getElementById("socialMediaReach");
    var block = document.createElement("div");
    block.id = "socialBlock";
    social.appendChild(block);

    block.innerHTML = "SOCIAL MEDIA REACH";
    imagesAndText(social);

}

function imagesAndText(parent) {
    for (var i = 0; i < socialMedia.length; i++) {
        var div = document.createElement("div");
        div.className = "imageAndCount";
        var img = document.createElement("img");
        img.src = "css/Images/Reach_" + socialMedia[i] + ".svg";
        img.width = "40";
        img.height = "40";
        div.appendChild(img);

        var count = document.createElement("span");
        count.innerHTML = "   " + socialMediaCounts[i];
        div.appendChild(count);

        parent.appendChild(div);
    }

}
createSocialMediaReach();


/*--------------------College student reach---------------*/
function createcollegeStudentReach(count) {
    console.log("Function called");
    var college = document.getElementById("collegeStudentReach");
    var block = document.createElement("div");
    block.id = "collegeBlock";
    college.appendChild(block);

    block.innerHTML = count.toString() + "<br><b>COLLEGE STUDENT<br>REACH VIA CHAPTERS</b><p style='font-size: 11px !important;'>#FEMALE UNDERGRADS AT<br>SCHOOLS W/ HC CHAPTERS</p>";
}

createcollegeStudentReach(localStorage.getItem("undergradCount"));

/*----total monthly multiplatform content views----*/
function createMonthlyMultiPlat() {
    var multi = document.getElementById("MonthlyMultiPlatformViews");
    var block = document.createElement("div");
    block.id = "multiBlock";
    multi.appendChild(block);
    block.innerHTML = "<b>TOTAL MONTHLY MULTI-<br>PLATFORM CONTENT VIEWS</b><p style='font-size: 11px !important;'>(PAGEVIEWS + SOCIAL CONTENT VIEWS<br>+ CHAPTER SOCIAL FOLLOWERS</p>";


}

createMonthlyMultiPlat();


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
            tspan = text.text(null).append("tspan").attr("x", 130).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 130).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

function type(d) {
    d.value = +d.value;
    return d;
}


$("#submit").click(function(e) {
    console.log("Clicked");

    var collegeStudentReach = $("#studentReach").val();
    if (collegeStudentReach != "") {
        localStorage.setItem("undergradCount", collegeStudentReach.toString());
    }

    console.log(localStorage.getItem("undergradCount"));


    $(".collegeBlock").empty();

    createcollegeStudentReach(localStorage.getItem("undergradCount"));

    e.preventDefault();

})
