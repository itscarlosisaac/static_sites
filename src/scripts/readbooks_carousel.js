
document.addEventListener('DOMContentLoaded', function () {
	
	const slider_container = document.querySelector('.hero__track');
	const slides = document.querySelectorAll('.hero__slide');
	const prev_button = document.querySelector('.hero__prev');
	const next_button = document.querySelector('.hero__next');
	
	// Giving the illusion of infinite loop
	slider_container.append(slides[0].cloneNode(true));
	slider_container.prepend(slides[slides.length - 1].cloneNode(true));

	const total_slides = slides.length;
	let slide_width = slides[0].clientWidth;
	let current_index = 1;
	
	const handle_next = () =>  {
		if(  current_index !== total_slides - 2){
			slider_container.style.transform = `translateX(${-slide_width * current_index}px)`;
			current_index++;
			onChange();
		}
	}
	const handle_prev = () => {
		if (current_index !== -1) {
			current_index--;
			slider_container.style.transform = `translateX(${-slide_width * (current_index - 1)}px)`;
			onChange();
		}
	}
	
	next_button.addEventListener('click', handle_next )
	prev_button.addEventListener('click', handle_prev )
	
	function onChange(){
		const should_hide = current_index === total_slides - 2;
		next_button.style.display = should_hide ? "none" : "flex";
		prev_button.style.display = current_index === -1 ? "none" : "flex";
	}
	
	window.addEventListener('resize', function () {
		slide_width = slides[0].clientWidth;
		slider_container.style.transform = `translateX(${-slide_width * (current_index - 1)}px)`;
	});
});
