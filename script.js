var round = 1;
var pattern = new Array();
var response = new Array();
pattern[0] = Math.floor((Math.random()*4)+1);;
var i=0;

//window.onload = animation_loop(pattern.length);
function start() {
	animation_loop(pattern.length);
}

function animation_loop(n) {
    lightUp(pattern[i]);
    setTimeout(function() { i++; if (n>1) { animation_loop(n-1); } }, 800);
};

var buttons = document.getElementsByTagName('li');
for(var j=0; j<buttons.length; j++)
{
	buttons[j].onclick = function() {
		var temp = this.innerHTML;
		response.push(temp);
		checkLose();
		document.getElementById('round').innerHTML = round;		
	}

	buttons[j].onmouseover = function() {
		document.getElementById(getColor(this.innerHTML)).style.border = "2px solid black";
	}
	buttons[j].onmouseout = function() {
		document.getElementById(getColor(this.innerHTML)).style.border = "none";
	}
}

function checkLose()
{
	for(var j = 0; j < response.length; j++)
	{
		if(response[j] != pattern[j])
		{
			alert("You lost! You made it " + round + " rounds.");
		    location.reload(); 
		}
	}
	//If player got the full pattern right, add another color and keep going!
	if(response.length == pattern.length)
	{
		nextRound();
	}
}

function nextRound()
{
	i = 0;
	round++;
	var rand = Math.floor((Math.random()*4)+1); 
	pattern.push(rand);
	response = [];
	animation_loop(pattern.length);
}


/*------------- Helper functions -----------------*/
function getColor(colorIn)
{
	var color; 

	if(colorIn == 1)
		color = "red";
	else if (colorIn == 2)
		color = "blue";
	else if (colorIn == 3)
		color = "yellow";
	else
		color = "green";

	return color;
}

function lightUp(colorIn)
{
	color = getColor(colorIn);
	document.getElementById(color).style.opacity = 1;
	setTimeout(function() { lightDown(pattern[colorIn-1]) }, 400);
}

function lightDown(colorIn)
{
	color = getColor(colorIn);
	document.getElementById(color).style.opacity = .6;
}