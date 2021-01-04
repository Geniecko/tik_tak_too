const cell = [...document.querySelectorAll('.cell')]
const span = [...document.querySelectorAll('.buttons span')]
const start = document.querySelector('.start')
const restart = document.querySelector('.restart')
const gameScene = document.querySelector('.game-scene')

let active = ''
let crossOption = []
let roundleOption = []

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
	event.target.removeEventListener('click', clickCell)
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
	
	resultGame(active, event.target.dataset.key)
}

const startGame = () => {
	if(active !== '') {
		gameScene.removeEventListener('click', clickGameScene)
		span.forEach(item => item.removeEventListener('click', choseStartOption))
		start.style.display = 'none';
		restart.style.display = 'block';
		cell.forEach(item => item.addEventListener('click', clickCell))
	}
	else {
		alert("Zaznacz kółko lub krzyżyk, a następnie wciśnij przycisk NOWA GRA")
	}
}

const restartGame = () => {
	gameScene.addEventListener('click', clickGameScene)
	start.style.display = 'block';
	restart.style.display = 'none';
	active = '';
	crossOption = []
	roundleOption = []
	cell.forEach(item => {
		item.innerHTML = ''
		item.removeEventListener('click', clickCell)
		item.classList.remove('win-cell')
	})
	span.forEach(item => {
		item.addEventListener('click', choseStartOption)
		item.classList.remove('active')
	})
	
}

const clickGameScene = () => {
	start.classList.add('bounce')
	setTimeout(function(){start.classList.remove('bounce')},800)
}

const checkResult = (option) => {
	if(option.includes('1')){
		if(option.includes('2')){
			if(option.includes('3')){
				win([1,2,3])
			}
		} else if(option.includes('4')){
			if(option.includes('7')){
				win([1,4,7])
			}
		} else if (option.includes('5')){
			if(option.includes('9')) {
				win([1,5,9])
			}
		}
	} else if(option.includes('7')){
		if(option.includes('8')){
			if(option.includes('9')){
				win([7,8,9])
			}
		} else if(option.includes('5')){
			if(option.includes('3')){
				win([7,5,3])
			}
		}
	} else if(option.includes('5')){
		if(option.includes('4')){
			if(option.includes('6')){
				win([5,4,6])
			}
		} else if(option.includes('2')){
			if(option.includes('8')){
				win([2,5,8])
			}
		}
	} else if(option.includes('3')){
		if(option.includes('6')){
			if(option.includes('9')){
				win([3,6,9])
			}
		}
	}
}

const win = (arrayWin) => {
	cell[arrayWin[0]-1].classList.add('win-cell')
	cell[arrayWin[1]-1].classList.add('win-cell')
	cell[arrayWin[2]-1].classList.add('win-cell')
	cell.forEach(item => item.removeEventListener('click', clickCell))
}

const resultGame = (type, key) => {
	if(type === 'x'){
		roundleOption.push(key);
		checkResult(roundleOption)
	} else if(type === 'o')
		{
			crossOption.push(key);
			checkResult(crossOption)
		}
}

span.forEach(item => item.addEventListener('click', choseStartOption))

start.addEventListener('click', startGame)
restart.addEventListener('click', restartGame)
gameScene.addEventListener('click', clickGameScene)

