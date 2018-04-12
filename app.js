let express = require('express');
let app = express();
let request = require("request");
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


let NLurl = "https://www.newslaundry.com/sample-data/sample-subscribers.csv";

function processCSV(csvData){
    let aData = [];
    let splitRows = csvData.split(/\r\n|\r|\n/);
    let header = splitRows.shift().split(",");
    for (let oRowCSV of splitRows ) {
        let oRow = oRowCSV.split(",");
        let oData = {};
        for(let h=0; h<header.length; h++){
            oData[header[h]]=oRow[h];
        }
        aData.push(oData);
    }
    return aData;
}
function getMonth(sDate){
    return sDate.split('/')[1];
}
function isActive(findMonthIndex,startMonthIndex,endMonthIndex){
    if((findMonthIndex>=startMonthIndex)&&(findMonthIndex<endMonthIndex)){
        return true;
    }
    else {
        return false;
    }
}
function calculateSubscriptionInMonth(aData, sMonth, aMonth){
    let findMonthIndex = aMonth.indexOf(sMonth);
    let gainCount = 0;
    let lostCount = 0;
    let activeDisruptor = 0;
    let activeLiberator = 0;
    let activeGameChanger = 0;
    for (let oData of aData){
        let startMonthIndex = aMonth.indexOf(getMonth(oData["Subscription Start date"]));
        let endMonthIndex = aMonth.indexOf(getMonth(oData["Subscription End Date"]));
        //Problem 1
        if(oData["Subscription Start date"].includes(sMonth)){
            gainCount=gainCount+1;
        }
        if(oData["Subscription End Date"].includes(sMonth)){
            lostCount=lostCount+1;
        }
        //Problem 2
        if(oData["Subscription Type"]=== "Disruptor"){
            if(isActive(findMonthIndex,startMonthIndex,endMonthIndex)){
                activeDisruptor = activeDisruptor+1;
            }
        }
        if(oData["Subscription Type"]=== "Liberator"){
            if(isActive(findMonthIndex,startMonthIndex,endMonthIndex)){
                activeLiberator = activeLiberator+1;
            }
        }
        if(oData["Subscription Type"]=== "GameChanger"){
            if(isActive(findMonthIndex,startMonthIndex,endMonthIndex)){
                activeGameChanger = activeGameChanger+1;
            }
        }
    }
    return {gain:gainCount,lost:lostCount,activeDisruptor:activeDisruptor,activeLiberator:activeLiberator,activeGameChanger:activeGameChanger};
}

app.get('/', function (req, res) {
    let aMonth = ["Jan", "Feb", "Mar", "April"];
    if(!req.query.month) return res.status(400).json({"message": "Please provide any one name of the month."+aMonth});
    if(aMonth.indexOf(req.query.month)===-1) return res.status(400).json({"message": "Please provide specified month name."+aMonth});
    request(NLurl, (error, response, body) =>{
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        let aData = processCSV(body);
        return res.status(200).json({"status": "OK", "message": "Data found.", subscription:calculateSubscriptionInMonth(aData,req.query.month,aMonth)});
    });
});


app.listen(8080, function() {
    console.log('Express server listening on port 8080')
});