$(document).ready(function() {
	dieTotal = null;

	// Event Lister for the cards to create the border
	// color change
	$('.cards').on('click', 'li', function(){
		var active = $(this).hasClass('card-active')
		if(!active){
			$(this).addClass('card-active');
		} else {
			$(this).removeClass('card-active');
		}
	});


  // Event Listener to determine whether the end turn
  // Is valid or not
  $('#end-turn').click(function(){
  	var $cards = $('.card')
  	var holder = []
  	$cards.each(function(){
  		var active = $(this).hasClass('card-active')
  		if (active){
  			var item = parseInt($(this).html())
  			holder.push(item)
  		}
  	});
  	var total = holder.reduce(function(a, b) {
  		return a + b;
  	});

  	// Removes cards and displays error handling
  	if (total % dieTotal === 0){
  		$('.card-active').removeClass('card-active').remove();
  	  if ( $('.card').length === 0 ) {
  			messageDisplay('.win');
  			location.reload();
  		} else {
  			messageDisplay('.success');
  		}
  	} else {
  		messageDisplay('.error')
  	}
  });

  // Event Listener that will roll the Dice and display the
  // outcome to the user
  $('#die-roll').click(function() {
  	dieTotal = 0;
  	$('.die').each(function(){
  		var randNum = (Math.floor(Math.random() * 6) + 1)
  		var roll = $(this).html('<img src="imgs/dice/die_'+ randNum + '.png" alt="">')
  		dieTotal += randNum;
  	});
  });

  // Event Listener that ends the game and reloads the page
  $('#end-game').click(function() {
	  $('.loose').fadeIn('slow', function() {
	  	setTimeout(function(){
	  		$('.loose').fadeOut('slow')
	  		location.reload();
	  	}, 2000)
	  });
  });

  // Message Display Handler
  var messageDisplay = function(className){
  	$(className).fadeIn('slow', function() {
	  	setTimeout(function(){
	  		$(className).fadeOut('slow')
	  	}, 2000)
	  });
  }
});

