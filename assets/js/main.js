/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	// Skills Carousel
	$(document).ready(function () {
		const skillsContainer = $('.skills');
		const prevBtn = $('#prevBtn');
		const nextBtn = $('#nextBtn');
		const dots = $('.dot');
		let index = 0;

		// Load images in its own container
		for (let i = 1; i <= 16; i++) {
			let skillItem = $('<div>', {
				class: 'skill-item'
			});

			let img = $('<img>', {
				src: `images/skills/${i}.png`,
				alt: `Skill ${i}`
			});

			skillItem.append(img);
			skillsContainer.append(skillItem);
		}

		const itemWidth = 260; // Width of each image
		const visibleImages = 3;
		const maxIndex = 16 - visibleImages; // Maximum scroll index

		function updateCarousel() {
			skillsContainer.css('transform', `translateX(-${index * itemWidth}px)`);

			// Calculate which dot should be active based on the index
			// We divide by 4 because we have 4 dots, each representing a group of 4 images
			const activeDotIndex = Math.floor(index / 4);

			// Update dots
			dots.removeClass('active');
			dots.eq(activeDotIndex).addClass('active');
		}

		nextBtn.click(() => {
			// Move by 1 item at a time; don't exceed maxIndex
			index = Math.min(index + 1, maxIndex);
			updateCarousel();
		});

		prevBtn.click(() => {
			// Move back by 1 item at a time; don't go below 0
			index = Math.max(index - 1, 0);
			updateCarousel();
		});

		// Click on dots to jump to a specific page
		dots.each(function (i) {
			$(this).click(function () {
				index = i * 4; // Jump to the start of that page
				updateCarousel();
			});
		});

		// Auto-scroll (still advances by 1 for smoother animation)
		let interval = setInterval(() => {
			// Cycle back to the beginning when reaching the end
			if (index >= maxIndex) {
				index = 0;
			} else {
				index += 1; // Move one image at a time
			}
			updateCarousel();
		}, 3000); // Reduced time since we're scrolling less per interval

		// Pause auto-scroll when hovering over carousel
		$('.carousel').mouseenter(function () {
			clearInterval(interval);
		});

		$('.carousel').mouseleave(function () {
			interval = setInterval(() => {
				if (index >= maxIndex) {
					index = 0;
				} else {
					index += 1; // Move one image at a time
				}
				updateCarousel();
			}, 3000);
		});
	});

})(jQuery);

