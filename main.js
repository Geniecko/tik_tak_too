const cell = [...document.querySelectorAll('.cell')]
const span = [...document.querySelectorAll('.buttons span')]
const start = document.querySelector('.start')

let active = ''

console.log()

const choseStartOption = (event) => {
	if(event.target.dataset.option === "o"){
		event.target.classList.add('active')
		span[1].classList.remove('active')
		active = event.target.dataset.option
	} else {
		event.target.classList.add('active')
		span[0].classList.remove('active')
		active = event.target.dataset.option
	}
}


const clickCell = (event) => {
	event.target.innerHTML = `<span>${active}</span>`
	if(active === 'o') {
		active = 'x'
		span[0].classList.remove('active')
		span[1].classList.add('active')
	} else{
		active = 'o'
		span[1].classList.remove('active')
		span[0].classList.add('active')
	}
	
	event.target.removeEventListener('click', clickCell)
}

span.forEach(item => item.addEventListener('click', choseStartOption))

start.addEventListener('click', () => {
	if(active === '') alert("Zaznacz kółko lub krzyżyk, a następnie wciśnij przycisk NOWA GRA")
	else {
//		span.forEach(item => item.removeEventListener('click', choseStartOption))
		cell.forEach((item) => {
			item.innerHTML = ''
			item.addEventListener('click', clickCell)
		})
	}

})

