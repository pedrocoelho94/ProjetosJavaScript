const theDate = "25 dec 2021"

function countdown(){
   const myBirthday = new Date(theDate)
   const currentDate = new Date()

   const totalSeconds = (myBirthday - currentDate) / 1000

   const days = Math.floor(totalSeconds/3600/24)
   const hours = Math.floor(totalSeconds/3600) % 24
   const minutes = Math.floor(totalSeconds/60) % 60
   const seconds = Math.floor(totalSeconds % 60)

   document.querySelector('#days').innerHTML = formatTime(days)
   document.querySelector('#hours').innerHTML = formatTime(hours)
   document.querySelector('#minutes').innerHTML = formatTime(minutes)
   document.querySelector('#seconds').innerHTML = formatTime(seconds)
}

function formatTime(time){
   return time < 10 ? `0${time}` : time
}

countdown()
setInterval(countdown, 1000)