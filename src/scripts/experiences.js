

document.addEventListener('DOMContentLoaded', () => {
	const experiences = document.querySelectorAll('.discover__experience__item');
	
	experiences.forEach(experience => {
		experience.addEventListener('click', expand);
	});
	
	// assigning the first element the style height.
		const details = 	experiences[0].querySelector('.discover__experience__item--details p')
		details.style.height = "auto"; // This is needed to restart the height calculation
		details.style.height = details.scrollHeight + 'px';
})

function expand() {
	const isExpanded = this.getAttribute('data-expanded') === 'true';
	if (isExpanded){ return; }

	const expanded = document.querySelector('.discover__experience__item[data-expanded="true"]');
	
	if (expanded) {
		const details = expanded.querySelector('.discover__experience__item--details p');
		details.style.height = '3em';
		expanded.setAttribute('data-expanded', 'false');
	}
	
	setTimeout(() => {
		// Animate to full height
		const details = this.querySelector('.discover__experience__item--details p');
		
		const fullHeight = details.scrollHeight + 'px';
		details.style.height = '3em';
		requestAnimationFrame(() => details.style.height = fullHeight );
		this.setAttribute('data-expanded', 'true');
	}, 250 )
}

window.addEventListener('resize', () => {
	const expanded = document.querySelector('.discover__experience__item[data-expanded="true"]');
	if (expanded) {
		const details = expanded.querySelector('.discover__experience__item--details p');
		details.style.height = "auto"; // This is needed to restart the height calculation
		details.style.height = details.scrollHeight + 'px';
	}
});