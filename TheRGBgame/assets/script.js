function rgb(){
    const guessColor = document.querySelector('.the-color')
    const square = document.querySelectorAll('.square')
    const arrSquare = [...square]
    const msg = document.querySelector('.message')
    const info = document.querySelector('#info')
    const easy = document.querySelector('.easy')
    const hard = document.querySelector('.hard')
    const squareHard = document.querySelectorAll('.square-hard')
    const arrHard = [...squareHard]

    let guessTheSquare
    let mode

    easy.style.pointerEvents='none'
    newGame()

    function newGame(){
        msg.style.height = ''
        msg.style.lineHeight = ''
        arrSquare.forEach((el)=> {
            el.style.pointerEvents='auto'
            el.style.visibility='visible'
        })
        info.style.backgroundColor = '#2C8E99'
        msg.innerHTML = ''
        startGame()
    }

    function easyGame(){
        let square1 = arrSquare[0].style.backgroundColor=randomColor()
        let square2 = arrSquare[1].style.backgroundColor=randomColor()
        let square3 = arrSquare[2].style.backgroundColor=randomColor()
        arrHard.forEach(e=>e.style.display = 'none')
        return [square1, square2, square3]
    }

    function hardGame(){
        let square4 = arrSquare[3].style.backgroundColor=randomColor()
        let square5 = arrSquare[4].style.backgroundColor=randomColor()
        let square6 = arrSquare[5].style.backgroundColor=randomColor()
        arrHard.forEach(e=>e.style.display = 'block')
        return [square4, square5, square6]
    }

    function startGame(){
        easyGame()
        if(mode === 'hard') hardGame()
        guessTheSquare = mode ==='hard' ? [...easyGame(), ...hardGame()] : [...easyGame()]
        guessColor.innerHTML = guessTheSquare[randonSquare()]
        //console.log(guessTheSquare)
    }

    function randonSquare(){
        return Math.floor(Math.random() * (guessTheSquare.length - 0)) + 0;
    }

    function randomColor(){
        const r = Math.floor(Math.random() * (256 - 1)) + 1;
        const g = Math.floor(Math.random() * (256 - 1)) + 1;
        const b = Math.floor(Math.random() * (256 - 1)) + 1;
        return `rgb(${r}, ${g}, ${b})`
    }

    function verificaResposta(){
        msg.style.height = '40px'
        msg.style.lineHeight = '40px';
        if(guessColor.innerHTML === el.style.backgroundColor){
            info.style.backgroundColor = guessColor.innerHTML
            arrSquare.forEach((el)=> el.style.pointerEvents='none')
            msg.innerHTML = 'Correct!'
        }else{
            el.style.visibility = 'hidden'
            msg.innerHTML = 'Try Again!'
        }
    }

    document.addEventListener('click', (e)=>{
        el = e.target

        if(el.classList.contains('new-game')){
            newGame()
        }
        if(el.classList.contains('square')){
            verificaResposta()
        }
        if(el.classList.contains('easy')){
            mode = 'easy'
            el.style.pointerEvents='none'
            hard.classList.remove('active')  
            hard.style.pointerEvents='auto'        
            el.classList.add('active')
            newGame()
        }
        if(el.classList.contains('hard')){
            mode = 'hard'
            el.style.pointerEvents='none'
            easy.classList.remove('active')  
            easy.style.pointerEvents='auto'        
            el.classList.add('active')
            newGame()
        }
    })
}

rgb()