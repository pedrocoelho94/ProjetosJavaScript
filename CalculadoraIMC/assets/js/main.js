let form = document.querySelector('#formulario')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    //const inputPeso = document.querySelector('#peso').value
    const inputPeso = e.target.querySelector('#peso')
    const peso = Number(inputPeso.value)
    //const inputAltura = document.querySelector('#altura').value
    const inputAltura = e.target.querySelector('#altura')
    const altura = Number(inputAltura.value)

    if(!peso){
        setResultado('Peso Inválido!', false)
        return
    }
    if(!altura){
        setResultado('Altura Inválida!', false)
        return
    }

    const imc = getImc(peso, altura)
    const nivelImc = getNivelImc(imc)
    const msg = `Seu  IMC é ${imc} (${nivelImc}).`
    setResultado(msg, true)
})

function getNivelImc(imc){
    const nivel = ['Abaixo do peso', 'Peso Normal', 'Sobrepeso', 'Obesidade Grau 1', 'Obesidade Grau 2', 'Obesidade Grau 3']

    if(imc < 18.5){
        return nivel[0]
    }
    if(imc <= 24.9){
        return nivel[1]
    }
    if(imc <= 29.9){
        return nivel[2]
    }
    if(imc <= 34.9){
        return nivel[3]
    }
    if(imc <= 39.9){
        return nivel[4]
    }
    if(imc > 40){
        return nivel[5]
    }
}

function getImc(peso, altura){
    const imc = peso / (altura * altura)
    return imc.toFixed(2)
}

function criaP(){
    let p = document.createElement('p')
    return p
}

function setResultado(msg, isValid){
    const resultado = document.querySelector('#resultado')
    resultado.innerHTML = ''
    const p = criaP()

    if(isValid) {
        p.classList.add('resultado-valido')
    }else{
        p.classList.add('resultado-invalido')
    }

    p.innerHTML = msg
    resultado.appendChild(p)
}