var _ID;
var _UnitID;
var _RegNumber;
var _urlParams;
var _baseUrl = "";//_baseUrl + "/img/amberBall.gif";



var TIME_STATIONARY = 30 * 60; // DRIVER_RATING_THRESHOLD
var TIME_MOVING = 30;
var IMG_OTHER = _baseUrl + "img/amberBall.gif";
var IMG_STOP = _baseUrl + "img/blueBall.gif";
var IMG_MOVING = _baseUrl + "img/redBall.gif";
var IMG_MOVE_PROB = _baseUrl +  "img/magentaBall.gif";
var IMG_BATT_OK = _baseUrl + "img/greenBall.gif";

var IMG_HOME = _baseUrl + "img/home.png";
var IMG_HOME_RED = _baseUrl +  "img/home-red.png";

var map;
var icons;
var polyPoints;
var markers;
var options;
var infoWindows

// Constants:
var fillColor = "#0000FF"; // blue fill
var lineColor = "#FF0000"; // Red line
var opacity = .7;
var lineWeight = 4;


var ICON_START = 7;
var ICON_END = 8;



function UpdateTimeOut(LastUpdateTime, CurrTime, period) {
    if (addMinutes(LastUpdateTime, period) >= CurrTime) {
        return false;
    }
    return true;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}


function formantSubTitle(item) {

    var subTitle ="";
    if (item.UnitModel2ID === 35) {
        //subTitle +=   "<span class='text--primary'> " + item.VehicleMake  + " - " + item.VehicleModel + "</span> &mdash; ";
        subTitle +=   "<b> Last Update</b>:" + item.LastUpdateTime;
    
    }
    else {
        subTitle +=   "<span class='text--primary'> " + item.VehicleMake  + " - " + item.VehicleModel + "</span> &mdash; ";
        subTitle +=   "<b> Last Update</b>:" + item.LastUpdateTime;
    
    }
    
    item.subTitle = subTitle
}

/* function formantTitle(item) {


    var subTitle ="";
    subTitle +=   "<span class='text--primary'> " + item.VehicleMake  + " - " + item.VehicleModel + "</span> &mdash; ";
    //subTitle +=   "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."

    item.Title = subTitle
}
 */

///----------------------------------------------------------
///  2019-08 -19= 
///    Modifed, for House Alarams
///----------------------------------------------------------
function formatImageIgnStat(cellValue) {
    //debugger;
    var today = moment();//new Date();
    var last = moment(cellValue.lastUpdateTime);
    var stationary = IMG_STOP;
    var image = IMG_OTHER;
    var imageHtml = "";

    switch (cellValue.IgnitionStatus) {
        case 0:
            // ignition off
            if (last.add(TIME_STATIONARY) < today ) {
                image = IMG_OTHER;
            }
            else {
                image = IMG_STOP;
            }
            imageHtml = image;
            cellValue.avatar = imageHtml;//
            break;
        case 1:
            // ignition on
            if (last.add(TIME_STATIONARY) < today ) {
                image = IMG_OTHER;
            }
            else {
                image = IMG_MOVING;
            }
            imageHtml = image;
            cellValue.avatar = imageHtml;//
            break;

        case 2:
            imageHtml = IMG_HOME;
            cellValue.avatar = imageHtml;//
            break;

        case 3:
            // ignition on
            imageHtml = IMG_HOME_RED;
            //imageHtml = "<img src='" + image + "' originalValue='" + image + "' />";
            cellValue.avatar = imageHtml;//
            break;

        default:
            //ignition null: falcon and other have no ignition message
            if (UpdateTimeOut(last, today, TIME_STATIONARY) === true) {
                image = IMG_OTHER;

            }
            else {
                image = IMG_STOP;
            }
            imageHtml = image;
            cellValue.avatar = imageHtml;//
            break;
    }
    return imageHtml;
}
