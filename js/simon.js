(function() {
    'use strict';
    var sequence, copy, round, active = true, mode = 'normal';

    $(document).ready(initSimon);

    function initSimon() {
        $('[data-action=start]').on('click', startGame);
        $('input[name=mode]').on('change', changeMode);
    }

	function startGame() {
		sequence = [];
		copy = [];
		round = 0;
		$('p[data-action="lose"]').hide();
		newRound();
	}

	function newRound() {
		$('[data-round]').text(++round);
		sequence.push(randomNumber());
		copy = sequence.slice(0);
		animate(sequence);
	}

	// allow user to interact with the game
	function activateSimonBoard(){
		$('.simon')
			.on('click', '[data-tile]', registerClick)

			.on('mousedown', '[data-tile]', function(){
				$(this).addClass('active');
				playSound($(this).data('tile'));
			})

			.on('mouseup', '[data-tile]', function(){
				$(this).removeClass('active');
			});

		$('[data-tile]').addClass('hoverable');
	}

	// prevent user from replaying pattern until sequence is done animating
	function deactivateSimonBoard() {
		if (mode !== 'free-board') {
			$('.simon')
				.off('click', '[data-tile]')
				.off('mousedown', '[data-tile]')
				.off('mouseup', '[data-tile]');

			$('[data-tile]').removeClass('hoverable');
		}
	}

	// the game is controlled primarily through this function, along with checkLose().
	// Since the player can never actually "win", we just listen for clicks as the user 
	// plays the sequence and each time, check if they lost
	function registerClick(e) {
		var desiredResponse = copy.shift();
		var actualResponse = $(e.target).data('tile');
		active = (desiredResponse === actualResponse);
		checkLose();
	}

	// three possible situations:
	// 1. The user clicked the wrong color (end the game)
	// 2. The user entered the right color, but is not finished with the sequence (do nothing)
	// 3. The user entered the right color and just completed the sequence (start a new round)
	function checkLose() {
		// copy array will be empty when user has successfully completed sequence
		if (copy.length === 0 && active) {
			deactivateSimonBoard();
			newRound();

		} else if (!active) { // user lost
			deactivateSimonBoard();
			endGame();
		}
	}

	function endGame() {
		// notify the user that they lost and change the "round" text to zero
		$('p[data-action=lose]').show();
		$($('[data-round]').get(0)).text('0');
	}

	function changeMode(e) {
		mode = e.target.value;
	}

	/*----------------- Helper functions -------------------*/

	function animate(sequence) {
		var i = 0;
		var interval = setInterval(function() {
			playSound(sequence[i]);
			lightUp(sequence[i]);

			i++;
			if (i >= sequence.length) {
				clearInterval(interval);
				activateSimonBoard();
			}
		}, 600);
	}

	function lightUp(tile) {
		if (mode !== 'sound-only') {
			$('[data-tile=' + tile + ']').animate({
				opacity: 1
			}, 250, function() {
				setTimeout(function() {
					$('[data-tile=' + tile + ']').css('opacity', 0.6);
				}, 250);
			});
		}
	}

	function playSound(tile) {
		if (mode !== 'light-only') {
			var audio = $('<audio autoplay></audio>');
			audio.append('<source src="sounds/' + tile + '.ogg" type="audio/ogg" />');
			audio.append('<source src="sounds/' + tile + '.mp3" type="audio/mp3" />');
			$('[data-action=sound]').html(audio);
		}
	}

	function randomNumber() {
		// between 1 and 4
		return Math.floor((Math.random()*4)+1);
	}

})();