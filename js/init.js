/*
	Aerial by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	skel.init({
		reset: 'full',
		breakpoints: {
			'global': { range: '*', href: 'css/style.css', viewport: { scalable: false } },
			'wide': { range: '-1680', href: 'css/style-wide.css' },
			'normal': { range: '-1280', href: 'css/style-normal.css' },
			'mobile': { range: '-736', href: 'css/style-mobile.css' },
			'mobilep': { range: '-480', href: 'css/style-mobilep.css' }
		}
	});

	// Events (JS).

		/*// Remove "loading" class once the page has fully loaded.
			window.onload = function() {
				document.body.className = '';
			}

		// Prevent scrolling on touch.
			window.ontouchmove = function() {
				return false;
			}

		// Fix scroll position on orientation change.
			window.onorientationchange = function() {
				document.body.scrollTop = 0;
			}*/



	// Events (jQuery).
	// Aerial doesn't need jQuery, but if you're going to use it anyway remove the
	// block of JS events above and use the jQuery-based ones below instead.

	var mouse = true;
	var margin = '32.5%';
	var size = 35;
	var extra = 3;
	var index = 0;
	var length = 4;

	//moves one project to the right (+1 to index)
	function moveLeftProjects() {
		if (index === length - 1) {
			$('#proj-'+index.toString()).css('float', 'right');
			$('#proj-'+index.toString()).css('marginRight', margin);
			$('#proj-'+index.toString()).animate({opacity: 0, marginRight: '0%'}, 1000, function() {
				resetProjects();
			});
			return;
		}
		index += 1;
		//move project on right to center
		$('#proj-'+index.toString()).animate({ marginRight: margin, opacity: 1 }, 1000, function() {
			$(this).css('float', 'left');
			$(this).css('margin-left',(parseFloat(margin)-size).toString() + '%');
			$(this).css('pointerEvents', 'auto');
			$(this).css('margin-right',0);
		});
		//move center project to left
		$('#proj-'+(index-1).toString()).css('pointerEvents', 'none');
		if (index - 1 === 0) {
			$('#proj-'+(index-1).toString()).animate({marginLeft: '0%', opacity: 0}, 1000);//change opacity
		} else {
			$('#proj-'+(index-1).toString()).animate({marginLeft: '-'+size.toString()+'%', opacity: 0}, 1000);//change opacity
		}
	}
	//resets projects when project menu is left
	function resetProjects() {
		//reset all but first to right side
		while (index > 0) {
			$('#proj-'+index.toString()).css('opacity', 0);//change opacity
			$('#proj-'+index.toString()).css('float', 'right');
			$('#proj-'+index.toString()).css('margin-right', '0%');
			$('#proj-'+index.toString()).css('pointerEvents', 'none');
			$('#proj-'+index.toString()).css('margin-left', '-'+(size+extra).toString()+'%');
			index -= 1;
		}
		$('#proj-1').css('margin-left', '-'+extra.toString()+'%');
		//retset first to left
		$('#proj-0').animate({opacity: 1, marginLeft: margin, marginRight: 0}, 1000);
		$('#proj-0').css('pointerEvents', 'auto');
		$('#proj-0').css('float', 'left');
	}

		$( document ).ready(function() {
			console.log($('proj-0').css('margin-right'));

		    $('#contact').click(function() {
					/*$("#form-main").fadeTo('slow', 1);*/
					$("#overlayer").fadeTo('slow',1);
					$("#overlay").css('z-index', 1);
					$("#main").css('pointerEvents', 'none');
				});

				$('#overlayer').click(function() {/*replace overlay with submit to use contact form*/
					/*$('#form-main').fadeTo('fast', 0);*/
					if (mouse) {
						$("#overlayer").fadeTo('fast', 0);
						$('#about-box').animate({ marginTop: '15%', opacity: 1 }, 1000);
						$("#overlay").css('z-index', 0);
						$("#main").css('pointerEvents', 'auto');
						resetProjects();
					}
				});

				$('#about-box').mouseenter(function() {
					mouse = false;
				});

				$('#about-box').mouseleave(function() {
					mouse = true;
				});

				$('.project-box').mouseenter(function() {
					mouse = false;
				});

				$('.project-box').mouseleave(function() {
					mouse = true;
				});

				$('#projects').click(function() {
					$('#about-box').animate({ marginTop: '-24.7%', opacity: 0 }, 1000);
					$('#proj-0').animate({opacity: 1},1000);
				});

				$('.next').click(function() {
					moveLeftProjects();
				});

				/*$('#cancel').click(function() {
					$('#form-main').fadeTo('fast', 0);
					$("#overlay").css('z-index', 0);
					$("#main").css('pointerEvents', 'auto');
				});*/
		});


		jQuery(window)

			// Remove "loading" class once the page has fully loaded.
				.on('load', function() {
					jQuery('body').removeClass('loading');
				})

			// Prevent scrolling on touch.
				.on('touchmove', function() {
					return false;
				})

			// Fix scroll position on orientation change.
				.on('orientationchange', function() {
					jQuery('body').scrollTop(0);
				});


})();
