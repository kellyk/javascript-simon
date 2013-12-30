var Simon = (function() {
    "use strict";
 
	var sequence, copy, round;
	var active = true;

	$(document).ready(function() {
		initSimon();
    });
   
    function initSimon() {
		$('[data-action=start]').on('click', startGame);
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
		animate();

		// want this executed only after animate function completed
		// would prefer more graceful solution than this eventually:
		setTimeout(function() {
			activateSimonBoard();
		}, 700 * (sequence.length - 1));
    }

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
    }

    function registerClick(e) {
		var desiredResponse = copy.shift();
		var actualResponse = $(e.target).data('tile');
		active = (desiredResponse === actualResponse);
		checkLose();
    }

    function deactivateSimonBoard() {
		$('.simon')
			.off('click', '[data-tile]')
			.off('mousedown', '[data-tile]')
			.off('mouseup', '[data-tile]');
    }

	function checkLose() {
		// copy array will be empty when user has successfully completed sequence
		if (copy.length === 0) {
			deactivateSimonBoard();

			// slight pause between rounds
			setTimeout(function() {
				newRound();
			}, 1000);

		} else if (!active) { // user lost
			deactivateSimonBoard();
			endGame();
		}
	}

    function endGame() {
		// notify the user that they lost
		$('p[data-action=lose]').show();
		$($('[data-round]')[0]).text("0");
    }

    /*----------------- Helper functions -------------------*/

    function animate() {
		$.each(sequence, function(key, tile) {
			setTimeout(function() {
				lightUp(tile);
			}, 700 * key);
		});
	}

    function lightUp(tile) {
		playSound(tile);
		$('[data-tile=' + tile + ']').animate({
			opacity: 1
		}, 300, function() {
			setTimeout(function() {
				$('[data-tile=' + tile + ']').css('opacity', 0.6);
			}, 300);
		});
    }

    function playSound(tile) {
		var audio = $('<audio autoplay></audio>');
		audio.append('<source src="sounds/' + tile + '.ogg" type="audio/ogg" />');
		audio.append('<source src="sounds/' + tile + '.mp3" type="audio/mp3" />');
		$('[data-action=sound]').html(audio);
    }

	function randomNumber() {
		// between 1 and 4
		return Math.floor((Math.random()*4)+1);
	}

})();