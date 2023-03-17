var yearLim = prompt("Introduce el año: ");
var monthLim = prompt("Introduce el mes: ") - 1;
var dayLim = prompt("Introduce el día: ");
var hourLim = prompt("Introduce la hora: ");
var minLim = prompt("Introduce los minutos: ");
var secLim = prompt("Introduce los segundos: ");

var fechaLim = new Date(yearLim, monthLim, dayLim, hourLim, minLim, secLim);

var epochLim = Math.floor(fechaLim.getTime()/1000.0);

function calculateTime(){
    var fecha = new Date();
    var epoch = Math.floor(fecha.getTime()/1000.0);
    var secondsLeft = epochLim - epoch;
    var day = document.getElementById("day");
    var hour = document.getElementById("hour");
    var mins = document.getElementById("mins");
    var secs = document.getElementById("secs");
    var timeLeftText = document.getElementById("timeLeft");
	var timer = document.getElementById("timer");
	
    var daysLeft = parseInt(secondsLeft / (24 * 3600));
    var segsLeft = secondsLeft % (24 * 3600);
    var hoursLeft = parseInt(segsLeft / 3600);
    segsLeft %= 3600;
    var minutesLeft = Math.floor(segsLeft / 60);
    segsLeft %= 60;

    if (daysLeft < 10) daysLeft = "0" + daysLeft;
    if (hoursLeft < 10) hoursLeft = "0" + hoursLeft;
    if (minutesLeft < 10) minutesLeft = "0" + minutesLeft;
    if (segsLeft < 10) segsLeft = "0" + segsLeft;

    day.innerHTML = daysLeft;
    hour.innerHTML = hoursLeft;
    mins.innerHTML = minutesLeft;
    secs.innerHTML = segsLeft;

    timeLeftText.innerHTML = daysLeft + " days, " + hoursLeft + " hours, " + minutesLeft + " minutes, " + segsLeft + " seconds left!";
	
	if (secondsLeft < 1){
		timer.innerHTML = "Times Out";
		timeLeftText.innerHTML = "*RING RING* Times out! *RING RING*";
	}
}

setInterval(calculateTime, 1000);
