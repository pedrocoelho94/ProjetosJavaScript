function relogio() {
    const relogio = document.querySelector('.timer')

    let seg = 0
    let timer

    function criaHoraDosSegundos(segundos){
        const data = new Date(segundos*1000)
        return data.toLocaleTimeString('pt-BR',{
            hour12: false,
            timeZone: 'GMT'
        })
    }

    function iniciaRelogio() {
        timer = setInterval(() => {
            seg++
            relogio.innerHTML = criaHoraDosSegundos(seg)
        }, 1000);

    }

    document.addEventListener('click', (e)=>{
        const el = e.target

        if(el.classList.contains('iniciar')){
            clearInterval(timer)
            iniciaRelogio()
            relogio.style.color = 'black' 
        }
        if(el.classList.contains('pausar')){
            clearInterval(timer)
            relogio.innerHTML = criaHoraDosSegundos(seg)
            relogio.style.color = 'red' 
        }
        if(el.classList.contains('zerar')){
            clearInterval(timer)
            seg = 0
            relogio.innerHTML = criaHoraDosSegundos(seg)
            relogio.style.color = 'black'
        }
    })
}

relogio()