(function(){

STB = {

  init: function(){
    dieTotal = null;
    this.placeTemplate('#app');
    this.messageDisplay();
    this.selectCard();
    this.endTurn();
    this.dieRoll();
    this.endGame();
  },

  placeTemplate: function(element){
    $(element).append('<ul class="cards"><li class="card">1</li><li class="card">2</li><li class="card">3</li><li class="card">4</li><li class="card">5</li><li class="card">6</li><li class="card">7</li><li class="card">8</li><li class="card">9</li></ul><br><br><button id="end-turn" class="btn">End Turn</button><div class="dice-container"><div class="die"></div><div class="die"></div></div><button id="die-roll" class="btn">Roll</button><button id="end-game" class="btn">End Game</button><div class="win"><h1>Congrats you win!</h1></div><div class="loose"><h1>Sorry you loose :( The game will now reload</h1></div><div class="error"><h1>Incorrect selection, try again</h1></div><div class="success"><h1>Good Move! Keep Going</h1></div>')
  },

  messageDisplay: function(className){
    $(className).fadeIn('slow', function() {
      setTimeout(function(){
        $(className).fadeOut('slow')
      }, 2000)
    });
  },

  selectCard: function(){
    $('.cards').on('click', 'li', function(){
      var active = $(this).hasClass('card-active')
      if(!active){
        $(this).addClass('card-active');
      } else {
        $(this).removeClass('card-active');
      }
    });
  },

  endTurn: function(){
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
      STB.updateCards(total);
    });
  },

  updateCards: function(total){
    if (total % dieTotal === 0){
      $('.card-active').removeClass('card-active').remove();
      if ( $('.card').length === 0 ) {
        this.messageDisplay('.win');
      } else {
        this.messageDisplay('.success');
      }
    } else {
      this.messageDisplay('.error')
    }
  },

  dieRoll: function(){
    $('#die-roll').click(function() {
      dieTotal = 0;
      $('.die').each(function(){
        var randNum = (Math.floor(Math.random() * 6) + 1)
        var roll = $(this).html('<img src="imgs/dice/die_'+ randNum + '.png" alt="">')
        dieTotal += randNum;
      });
    });
  },

  endGame: function(){
    $('#end-game').click(function() {
      $('.loose').fadeIn('slow', function() {
        setTimeout(function(){
          $('.loose').fadeOut('slow')
          location.reload();
        }, 2000)
      });
    });
  }
}


STB.init();
})();
