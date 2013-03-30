$(document).ready(function() {

	$('#start').click(function() {
		var round = 1;
		var pattern = new Array();
		var response = new Array();
		var i=0;

		pattern[0] = Math.floor((Math.random()*4)+1);
		animation_loop(pattern.length);
		$('#round').html(round);		

		$('li').click(function(){
			var clickedSegment = this.innerHTML;
			response.push(clickedSegment);
			checkLose();
			$('#round').html(round);		
			var soundfile = String(clickedSegment) + ".mp3";
			playSound(soundfile);
		}).mouseover(function(){
			var color = "#" + getColor(this.innerHTML);
			$(color).css({border: "2px solid black"});
		}).mouseout(function(){
			var color = "#" + getColor(this.innerHTML);
			$(color).css({border: "none"});
		});

		function animation_loop(n) {
		    lightUp(pattern[i]);
		    setTimeout(function() { 
		    	i++; 
		    	if (n>1) { 
		    		animation_loop(n-1); 
		    	} 
		    }, 800);
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
				setTimeout(function() {
					nextRound();  
				}, 1200);
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
			setTimeout(function() {
				$('li').css({opacity: 0.6 });
			}, 300);

			var soundfile = String(colorIn) + ".mp3";
			playSound(soundfile);
			color = " #" + getColor(colorIn);
			$(color).css({opacity: 1 });
			setTimeout(function() { lightDown(pattern[colorIn-1]) }, 400);
		}

		function lightDown(colorIn)
		{
			color = " #" + getColor(colorIn);
			$(color).css({opacity: 0.6 });
		}

		function playSound(soundfile) {
			 $("#sound").html('<embed src="./sounds/' + soundfile 
			 	+ '" hidden="true" autostart="true" loop="false" />');
		 }
	});
});