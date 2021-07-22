const form = document.querySelector('.busca')

form.addEventListener('submit', async e => {
   e.preventDefault()
   const input = document.querySelector('#searchInput')

   if (input.value) {
      input.blur()
      document.querySelector('.card').classList.remove('active')
      showWarning('carregando...')
      const city = encodeURI(input.value)

      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa998ef2dece949b5e8de812018f01e7&units=metric&lang=pt_br`

      let results = await fetch(URL)
      let json = await results.json()

      if (json.cod == 200) {
         const date = new Date(json.dt * 1000 + json.timezone * 1000 + 11100000)

         showInfo({
            name: json.name,
            country: json.sys.country,
            humidity: json.main.humidity,
            temp: json.main.temp,
            icon: json.weather[0].icon,
            weatherDescription: json.weather[0].description,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg,
            date: date
         })

         input.value = ''
      } else {
         document.querySelector('.card').classList.remove('active')
         showWarning('Cidade não encontrada.')
      }
   }
})

function showInfo(json) {
   showWarning('')

   document.querySelector(
      '.titulo'
   ).innerHTML = `${json.name} - ${json.country}`
   document.querySelector(
      '.description'
   ).innerHTML = `${json.weatherDescription}`
   document.querySelector('.real-temp').innerHTML = `${json.temp.toFixed(1)}`
   document.querySelector(
      '.min-max .min span'
   ).innerHTML = `${json.tempMin.toFixed(1)}`
   document.querySelector(
      '.min-max .max span'
   ).innerHTML = `${json.tempMax.toFixed(1)}`
   document.querySelector('.humidity').innerHTML = `${json.humidity}%`
   document.querySelector('.wind-speed span').innerHTML = `${(
      json.windSpeed * 3.6
   ).toFixed(1)}`
   document
      .querySelector('.info-1 .icon img')
      .setAttribute(
         'src',
         `http://openweathermap.org/img/wn/${json.icon}@4x.png`
      )
   document.querySelector(
      '.windAngle'
   ).style.transform = `rotate(${json.windAngle}deg)`

   const hour = formatTime(json.date.getHours())
   const minutes = formatTime(json.date.getMinutes())

   const daysWeek = [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado'
   ]
   const day = json.date.getDay()

   document.querySelector(
      '.date'
   ).innerHTML = `${daysWeek[day]} - ${hour}:${minutes}`

   document.querySelector('.card').classList.add('active')
}

function showWarning(msg) {
   document.querySelector('.aviso').innerHTML = msg
}

function formatTime(time) {
   return time < 10 ? `0${time}` : time
}
