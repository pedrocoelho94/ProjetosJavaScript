(function stopwatch(){
    const stopwatch = document.querySelector('.stopwatch')

    let contador = 0
    let timer

    function zeroTimer(segundos){
        const data = new Date(segundos*1000)
        return data.toLocaleTimeString('pt-BR',{
            hour12: false,
            timeZone: 'GMT'
        })
    }

    function startTimer(){
        timer = setInterval(()=>{
            contador++
            stopwatch.innerHTML = zeroTimer(contador)
        }, 1000)
    }

    document.addEventListener('click', (e)=>{
        const el = e.target
        
        if(el.classList.value === 'start'){
            stopwatch.style.color = '#FFE500'
            startTimer()
        }
        if(el.classList.value === 'stop'){
            stopwatch.innerHTML = zeroTimer(contador)
            stopwatch.style.color = '#A09321'
            clearInterval(timer)
        }
        if(el.classList.value === 'reset'){
            contador = 0
            stopwatch.innerHTML = zeroTimer(contador)
            stopwatch.style.color = '#FFE500'
        }
    })
})()