//Variables

var stock = "";

var maPlaceOrder = "";
var FPlaceOrder = "";

var maLength = "";
var maSource = "";
var maOffset = "";

var logic = "";

var counter = 0;
var urlCounter = 0;

//Functions


//Home page
function selectStock(id) {
    stock = document.getElementById(id).textContent;
    sessionStorage.setItem('stock', stock);
    window.location.href = '/StratBuilder.html';
}

//My Strategies
function selectStockByValue(id) {
    stock = document.getElementById(id).value;
    sessionStorage.setItem('stock', stock);
    window.location.href = '/StratBuilder.html';
}

function getStockGraph() {
    var frame = document.getElementById('igraph');

    var stock = sessionStorage.getItem('stock');
    stock = stock.trim();
    document.getElementById('stockName2').innerHTML = stock;
    var link = 'http://44.238.204.76:5000/priceGraph?stock_symbol=';
    var backlink = '&indicators=[]';
    switch (stock) {
        case "Alibaba":
            var finalLink = link + "baba" + backlink;
            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Tesla":
            var finalLink = link + "tsla" + backlink;
            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Amazon":
            var finalLink = link + "amzn" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Apple":
            var finalLink = link + "aapl" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Netflix":
            var finalLink = link + "nflx" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Google":
            var finalLink = link + "googl" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Shopify":
            var finalLink = link + "shop" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "AMD":
            var finalLink = link + "amd" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Nvidia":
            var finalLink = link + "nvda" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        case "Twitter":
            var finalLink = link + "twtr" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
            break;
        default:
            var finalLink = link + "" + backlink;

            var graphlink = urlRequester(finalLink);
            frame.src = graphlink;
    }


    sessionStorage.setItem('url', finalLink);

    setTimeout(function () {
        // Delayed code in here
        ;
        document.getElementById('igraph').contentWindow.location.reload();
    }, 3000); // 5000 = 5 seconds

    setTimeout(function () {
        // Delayed code in here
        ;
        document.getElementById('igraph').contentWindow.location.reload();
    }, 1000); // 5000 = 5 seconds

}

//First update to URL
function updateStockGraph(name) {
    var src = sessionStorage.getItem('url');


    shortenUrl = src.slice(0, (src.length - 1));



    newUrl = shortenUrl + name + "]";



    var newGraphLink = urlRequester(newUrl);


    document.getElementById('igraph').src = newGraphLink;

    sessionStorage.setItem('url', newUrl);

    setTimeout(function () {
        // Delayed code in here
        document.getElementById('igraph').contentWindow.location.reload();
    }, 3000); // 5000 = 5 seconds

    setTimeout(function () {
        // Delayed code in here
        document.getElementById('igraph').contentWindow.location.reload();
    }, 1000); // 5000 = 5 seconds
}


//Second update to URL
function updateStockGraph2(name) {
    var src = sessionStorage.getItem('url');


    shortenUrl = src.slice(0, (src.length - 1));



    newUrl = shortenUrl + name + "]";

    var newGraphLink = urlRequester(newUrl);

    document.getElementById('igraph').src = newGraphLink;

    sessionStorage.setItem('url', newUrl);


    setTimeout(function () {
        // Delayed code in here
        ;
        document.getElementById('igraph').contentWindow.location.reload();
    }, 3000); // 5000 = 5 seconds

    setTimeout(function () {
        // Delayed code in here
        ;
        document.getElementById('igraph').contentWindow.location.reload();
    }, 1000); // 5000 = 5 seconds
}


function addIndicator(id) {
    document.getElementById("indicatorMenu1").style.display = 'flex';

    var name = document.getElementById(id).getAttribute('name');

    document.getElementById(id).disabled = true;

    document.getElementById('myModalTitle').innerHTML = name;

    document.getElementById('myModalTitle2').innerHTML = name;

    var para = document.getElementById('indicator');

    para.textContent += name;

    counter += 1;

    if (counter == 2) {
        document.getElementById('button1').disabled = true;
        document.getElementById('button2').disabled = true;
        document.getElementById('button3').disabled = true;
    }
}

function addIndicator2(id) {
    document.getElementById("indicatorMenu2").style.display = 'flex';

    var name = document.getElementById(id).getAttribute('name');

    document.getElementById(id).disabled = true;

    var para = document.getElementById('indicator2');

    para.textContent += name;

    counter += 1;

    if (counter == 2) {
        document.getElementById('button1').disabled = true;
        document.getElementById('button2').disabled = true;
        document.getElementById('button3').disabled = true;
    }
}
function addIndicator3(id) {
    document.getElementById("indicatorMenu3").style.display = 'flex';

    var name = document.getElementById(id).getAttribute('name');

    document.getElementById('myModalTitle').innerHTML = name;

    document.getElementById('myModalTitle2').innerHTML = name;

    document.getElementById(id).disabled = true;

    var para = document.getElementById('indicator3');

    para.textContent += name;

    counter += 1;

    if (counter == 2) {
        document.getElementById('button1').disabled = true;
        document.getElementById('button2').disabled = true;
        document.getElementById('button3').disabled = true;
    }
}

function MAdd(id, target) {
    var val = document.getElementById(id).getAttribute('name');

    document.getElementById(target).textContent = val;
}

function editIndicator1() {
    var words = document.getElementById('after1');

    document.getElementById('before1').style.display = 'none';

    var maOD = document.getElementById('OD').textContent;
    var maTF = document.getElementById("TF").textContent;
    var maSlope = document.getElementById("slope").textContent;
    maBuyWhen = document.getElementById("buyWhen").textContent;
    maPlaceOrder = document.getElementById("placeOrder").textContent;

    words.textContent += maOD + ", " + maTF + ", Order placed when Slope " + maSlope + ", " + maBuyWhen + ", " + maPlaceOrder;

    //Additional
    maLength = document.getElementById('maLength').value;
    maSource = document.getElementById('maSource').textContent;
    maOffset = document.getElementById('maOffset').value;

    document.getElementById('lengthInput').innerHTML = maLength;
    document.getElementById('sourceInput').innerHTML = maSource;
    document.getElementById('offsetInput').innerHTML = maOffset;

    words.style.display = "flex";

    logic += "Moving Average:" + words.innerHTML;

    document.getElementById('afterH1').style.display = 'flex';

    if (counter == 2) {
        document.getElementById('testBtn').style.display = 'block';
    }

    urlCounter += 1;

    if (urlCounter == 1) {
        updateStockGraph('sma');
    } else if (urlCounter == 2) {
        updateStockGraph2('sma');
    }

}

function editIndicator2() {
    var words = document.getElementById('after2');

    document.getElementById('before2').style.display = 'none';
    var FOD = document.getElementById('OD2').textContent;
    var FTF = document.getElementById("TF2").textContent;
    FBuyWhen = document.getElementById('fractal').textContent;
    FPlaceOrder = document.getElementById("placeOrder2").textContent;

    words.textContent += FOD + ", " + FTF + ", Order placed when " + FBuyWhen + ", " + FPlaceOrder;

    words.style.display = "flex";

    logic += ", Fractals: " + words.innerHTML;

    document.getElementById('afterH2').style.display = 'flex';

    if (counter == 2) {
        document.getElementById('testBtn').style.display = 'block';
    }

    urlCounter += 1;

    if (urlCounter == 1) {
        updateStockGraph('fractals');
    } else if (urlCounter == 2) {
        updateStockGraph2('fractals');
    }
}

function editIndicator3() {
    var words = document.getElementById('after3');

    document.getElementById('before3').style.display = 'none';

    var maOD = document.getElementById('OD').textContent;
    var maTF = document.getElementById("TF").textContent;
    var maSlope = document.getElementById("slope").textContent;
    maBuyWhen = document.getElementById("buyWhen").textContent;
    maPlaceOrder = document.getElementById("placeOrder").textContent;

    words.textContent += maOD + ", " + maTF + ", Order placed when Slope " + maSlope + ", " + maBuyWhen + ", " + maPlaceOrder;

    //Additional
    maLength = document.getElementById('maLength').value;
    maSource = document.getElementById('maSource').textContent;
    maOffset = document.getElementById('maOffset').value;

    document.getElementById('lengthInput').innerHTML = maLength;
    document.getElementById('sourceInput').innerHTML = maSource;
    document.getElementById('offsetInput').innerHTML = maOffset;

    words.style.display = "flex";

    logic += "MACD:" + words.innerHTML;

    document.getElementById('afterH3').style.display = 'flex';

    if (counter == 2) {
        document.getElementById('testBtn').style.display = 'block';
    }
}

//AWS EC2 Function
function testStrategy() {
    //Set up JSON String

    stock = sessionStorage.getItem("stock");
    stock = stock.trim();

    var TP = document.getElementById('TP').textContent;
    var SL = document.getElementById("SL").textContent;
    var OS = document.getElementById('OS').textContent;

    var TP = TP.trim();
    var SL = SL.trim();
    var OS = OS.trim();

    //SessionStoring
    sessionStorage.setItem('TP', TP);
    sessionStorage.setItem('SL', SL);
    sessionStorage.setItem('OS', OS);
    sessionStorage.setItem('logic', logic);

    switch (stock) {
        case "Alibaba":
            var st = "baba";
            break;
        case "Tesla":
            var st = "tsla";
            break;
        case "Amazon":
            var st = "amzn";
            break;
        case "Apple":
            var st = 'aapl';
            break;
        case "Netflix":
            var st = 'nflx';
            break;
        case "Google":
            var st = 'googl';
            break;
        case "Shopify":
            var st = 'shop';
            break;
        case "AMD":
            var st = 'amd';
            break;
        case "Nvidia":
            var st = "nvda";
            break;
        case "Twitter":
            var st = "twtr";
            break;
    }
    //Call AWS EC2
    apiURL = "stock=" + st + "&money=100000&tpdetails=" + TP.slice(0, (TP.length - 1)) + "&sldetails=" + SL.slice(0, (SL.length - 1)) +
        "&ordersize=20" + "&fractalIndicator=True&maIndicator=True&maPeriod=" + maLength.trim() + "&maSource=" + maSource.trim() + "&maOffset=" + maOffset.trim();

    var url = 'http://44.238.204.76:5000/stratTest/?';

    var finalUrl = url + apiURL;

    console.log(finalUrl);

    var myDict = urlRequester(finalUrl);

    deserializeJSON(myDict);
}

function deserializeJSON(myDict) {
    console.log(myDict);
    var arr_from_json = JSON.parse(myDict);
    console.log(arr_from_json);

    const stats = arr_from_json.testStats;
    const records = arr_from_json.tradeRecord;

    console.log(stats);
    console.log(records);

    records_to_table(records);
    stats_to_display(stats);
}

function stats_to_display(stats) {
    var netProfit = document.getElementById('netProfit');
    var winRate = document.getElementById('winRate');

    netProfit.innerHTML = stats.netProfit;
    winRate.innerHTML = stats.winRate;

    document.getElementById('showStats').style.display = 'flex';
    console.log("Stats done!");
}

function records_to_table(records) {

    var col = [];
    for (var i = 0; i < records.length; i++) {
        for (var key in records[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement('table');

    var tr = table.insertRow(-1);

    var colNames = ["Close Date", "Close Price", "Open Date", "Open Price", "% Change", "Profit", "Quantity", "Win/Lose"];

    for (var i = 0; i < colNames.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = colNames[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < records.length; i++) {

        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            console.log(col[j]);
            if (col[j] == "closeDate" || col[j] == "openDate") {
                x = records[i][col[j]];
                var newDate = new Date(x.match(/\d+/) * 1);
                finDate = newDate.format("dd/m/yyyy");
                tabCell.innerHTML = finDate;
            } else {
                tabCell.innerHTML = records[i][col[j]];
            }
        }
    }

    var divContainer = document.getElementById('showData');
    divContainer.innerHTML = "";
    divContainer.appendChild(table);

    console.log("Table done");
}

function showStrategy() {

    stock = sessionStorage.getItem('stock');

    //Set button value
    document.getElementById('stockSelected').value = stock;

    var img = document.getElementById('stockImage');
    var name = document.getElementById('stockName');
    var des = document.getElementById('stockDes');
    var TP = document.getElementById('TP');
    var SL = document.getElementById('SL');
    var OS = document.getElementById('OS');
    var logic = sessionStorage.getItem('logic');
    var aTP = sessionStorage.getItem('TP');
    var aSL = sessionStorage.getItem('SL');
    var aOS = sessionStorage.getItem('OS');
    console.log(sessionStorage.getItem('indicator'));
    stock = stock.trim();

    document.getElementById(stock).disabled = true;
    document.getElementById(stock).style.backgroundColor = "green";

    switch (stock) {
        case "Alibaba":
            img.src = '../images/alibaba.jpg';
            name.innerHTML = "Alibaba";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Tesla":
            img.src = '../images/tesla.png';
            name.innerHTML = "Tesla";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Amazon":
            img.src = '../images/amazon.jpg';
            name.innerHTML = "Amazon";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Apple":
            img.src = '../images/apple.png';
            name.innerHTML = "Apple";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Netflix":
            img.src = '../images/netflix.png';
            name.innerHTML = "Netflix";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Google":
            img.src = '../images/google.jpg';
            name.innerHTML = "Google";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Shopify":
            img.src = '../images/shopify.jpg';
            name.innerHTML = "Shopify";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "AMD":
            img.src = '../images/amd.png';
            name.innerHTML = "AMD";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Nvidia":
            img.src = '../images/nvidia.png';
            name.innerHTML = "Nvidia";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        case "Twitter":
            img.src = '../images/twitter.png';
            name.innerHTML = "Twitter";
            des.innerHTML = logic;
            TP.innerHTML = "Take Proft:" + aTP;
            SL.innerHTML = "Stop Loss:" + aSL;
            OS.innerHTML = "Cash Allocation:" + aOS;
            break;
        default:
            img.src = '../images/default.jpg';
            name.innerHTML = "No stock selected";
    }
}

function stockSelected(id) {
    var btn = document.getElementById(id);
    var count = document.getElementById('count').innerHTML;
    count = parseInt(count) + 1;
    document.getElementById('count').innerHTML = (count);
    btn.disabled = true;
}

function urlRequester(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
*/

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

