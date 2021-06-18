function calculadora(){
    const display = document.querySelector('.display')


    function realizaConta(){
        try {
            display.value = eval(display.value)
        } catch (error) {
            display.value = 'Op. Inválida!'
        }
    }

    function verifica(){
        if(display.value === '0') display.value = ""
    }

    document.addEventListener('click', e =>{
        el = e.target

        if(el.classList.contains('btn-num') && display.value.length < 12){
            verifica()
            display.value += el.innerHTML
        }
        if(el.classList.contains('btn-clear')){
            display.value = "0"
        }
        if(el.classList.contains('btn-del')){
            display.value = display.value.slice(0, -1)
        }
        if(el.classList.contains('btn-eq')){
            console.log()
            realizaConta()
        }
        
    })
}

calculadora()