var log = {};

log.mouse_init = function() {

	log._mouse = {};

	$(document).mousemove(function(e) {
		log._mouse.x = e.pageX;
		log._mouse.y = e.pageY;
	});
}


log._save = function(d) {
	console.log($.now() + '|' + d);
}

log.log = function() {
	// assume jQuery
	var basex = window.screenX;
	var basey = window.screenY;

	var left = $('#articles').position().left;

	// articles
	// aika, tyyppi, y, korkeus, leveys
	$.each($('article'), function(i, a) {
		// get the content
		$.each($(a).children(), function(i, c) {
			$c = $(c);

			var type = $c.attr('class');
			if (!type) type = 'title';

			log._save(type + '|' + '|' + $c.html() + '|' + ($c.position().top - window.pageYOffset) + '|' + $c.height() + '|' + ($c.position().left + left) + '|' + $c.width());
		});
	});


	// bubbles
	$.each($('.contextbubble'), function(i, b) {
		$b = $(b);
		// aika, tyyppi, y, korkeus, leveys

		log._save('circle|' + b.textContent + '|' + $b.position().top + '|' + b.getBoundingClientRect().height + '|' + $b.position().left + '|' + b.getBoundingClientRect().width)
	});

	if (log._mouse) log._save('mouse||' + log._mouse.x + '|0|' + log._mouse.y + '|0');
}

log.mouse_init();
setInterval(log.log, 500)