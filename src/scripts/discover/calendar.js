
function initiate_calendar() {
	// Getting all slides
	const slides = document.querySelectorAll('.discover__calendar__slide');
	let current = document.querySelector('.discover__calendar__slide[data-active="true"]');

	// Position prev and last
	let prevSibling = current.previousElementSibling || slides[slides.length - 1];
	let nextSibling = current.nextElementSibling || slides[1];
	
	prevSibling.style.transform = 'translate(-70%, 0) scale(.8)';
	nextSibling.style.transform = 'translate(70%, 0) scale(.8)';
	let canAnimate = true;
	
	// Adding event listeners
	function Next(){
		if( !canAnimate ) return;
		canAnimate = false;
		const current= document.querySelector('.discover__calendar__slide[data-active="true"]');
		const nextSibling = current.nextElementSibling || slides[0];
		const prevSibling = current.previousElementSibling || slides[slides.length - 1];
		
		current.dataset.active = "false"
		nextSibling.dataset.active = "true";
		
		current.style.transform = 'translate(-70%, 0) scale(.8)';
		prevSibling.style.transform = 'translate(70%, 0) scale(.8)';
		nextSibling.style.transform = 'translate(0, 0) scale(1)';
		transitionend()
	}
	function Prev(){
		if( !canAnimate ) return;
		canAnimate = false;
		const current= document.querySelector('.discover__calendar__slide[data-active="true"]');
		const nextSibling = current.nextElementSibling || slides[0];
		const prevSibling = current.previousElementSibling || slides[slides.length - 1];
		
		prevSibling.dataset.active = "true";
		current.dataset.active = "false"
		
		current.style.transform = 'translate(70%, 0) scale(.8)';
		nextSibling.style.transform = 'translate(-70%, 0) scale(.8)';
		
		prevSibling.style.transform = 'translate(0, 0) scale(1)';
		transitionend();
	}
	
	function transitionend(){
		setTimeout(() => {
			canAnimate = true;
		}, 700)
	}
	
	const prev_button = document.querySelector('.discover__prev');
	const next_button = document.querySelector('.discover__next');
	
	next_button.addEventListener('click', Next);
	prev_button.addEventListener('click', Prev);
}

document.addEventListener('DOMContentLoaded', function() {
	initiate_calendar();
	
	
});
