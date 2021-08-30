const expandingImg = document.querySelector('.fullImg')
const slides = document.getElementsByClassName('mySlides')
const sizes = document.querySelectorAll('.sizeOptions span')
const selected = document.querySelector('.selected')

const newSizes = [...sizes]

function changeSize(event) {
   newSizes.forEach(size => size.classList.remove('selectedSize'))
   const sizeSelected = event.target.innerHTML
   selected.innerHTML = sizeSelected
   event.target.classList.add('selectedSize')
}

newSizes.forEach(size => {
   size.addEventListener('click', changeSize)
})

let slideIndex = 0
showSlides(slideIndex)

function currentSlide(n) {
   showSlides((slideIndex = n))
}

function changeSlide(n) {
   slideIndex = slideIndex + n

   if (slideIndex <= 0) slideIndex = 0
   if (slideIndex > slides.length - 1) slideIndex = slides.length - 1

   showSlides(slideIndex)
}

function showSlides(slideIndex) {
   let arr = [...slides]
   arr.forEach(slide => slide.classList.remove('active'))

   expandingImg.src = arr[slideIndex].src
   arr[slideIndex].classList.add('active')
}
