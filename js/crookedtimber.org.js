// Add people you want to read to highlighted
// Add people you don't want to read to hidden
// Press 'j' or 'n' for next comment
// Press 'k' or 'p' for previous comment
// Type the number of the comment and the browser will scroll to it

var highlighted = ['JW Mason', 'Cosma Shalizi', 'robotslave', 'Bruce Wilder', 'Lemuel Pitkin', 'lemuel pitkin',
		   'tomslee', 'Kieran Healy', 'dsquared', 'Daniel', 'Colin Danby', 'John Emerson'];

var hidden = ['Steve Sailer', 'Tim Worstall', 'kidneystones'];

function is_digit(c) {
  return c >= 48 && c <= 57;
}

if ($('dl#comment_list').length > 0) {

  $('head').append('<style>' +
		   '.highlight { background-color: #FAFAD2; } ' +
		   '.hidden { background-color: #131313; } ' +
		   '</style>');

  var comment_positions = [];
  var highlighted_comments;

  $('#comment_list').find('dt').each(function(i, dt) {
    var $dt = $(dt);
    var $dd = $($(dt).next());

    $dt.find('span.comment_num a').each(function(i, num) {
      comment_positions.push($(num).position().top);
    });

    var author = $dt.find('span.comment_author').text();

    if (~hidden.indexOf(author)) {
      $dd.addClass('hidden');
    }

    if (~highlighted.indexOf(author)) {
      var num = $dt.find('.comment_num a').clone();
      if (highlighted_comments === undefined)  highlighted_comments = {};
      if (highlighted_comments[author] === undefined)  highlighted_comments[author] = [];
      $dt.addClass('highlight').next().addClass('highlight');
      highlighted_comments[author].push(num);
    }
  });

  var $highlights = $('<li class="widget">' +
		      '<h3>Highlighted Comments</h3>' +
		      '<ul></ul>' +
		      '</li>');

  if (highlighted_comments) {
    for (var author in highlighted_comments) {
      var li = $highlights.find('ul').append('<li></li>').append(author + ' ');
      for (var comment in highlighted_comments[author]) {
	li.append(highlighted_comments[author][comment]);
	li.append(' ');
      }
    }
  } else {
    $highlights.find('ul').append('<li id="none_highlighted">none</li>');
  }

  $highlights.hide();
  $('.sidebar_list').prepend($highlights);
  $highlights.slideDown();

  var keypresses = '';
  var number_timer;
  var fudge = 22; // Chrome anchor position

  // shortcuts
  $(document).bind('keydown', function(e) {
    if (! $(e.target).is('input,textarea')) {
      var key = String.fromCharCode(e.which).toLowerCase();

      if (is_digit(e.which)) {
	keypresses += key;
	clearTimeout(number_timer);
	number_timer = setTimeout(function() {
	  var number = parseInt(keypresses) - 1;
	  if (number < comment_positions.length) {
	    $(window).scrollTop(comment_positions[number] - fudge);
	  }
	  keypresses = '';
	}, 500);
      } else {
	clearTimeout(number_timer);
	keypresses = '';

	if (key == 'n' || key == 'j') {
	  var current = $(window).scrollTop();
	  for (var i in comment_positions) {
	    var position = comment_positions[i];
	    if (current < position - fudge) {
	      $(window).scrollTop(position - fudge);
	      break;
	    }
	  }
	} else if (key == 'p' || key == 'k') {
	  var current = $(window).scrollTop();
	  var i = comment_positions.length;
	  while (i--) {
	    var position = comment_positions[i];
	    if (current > position - fudge) {
	      $(window).scrollTop(position - fudge);
	      break;
	    }
	  }
	}
      }
    }
  });
}
