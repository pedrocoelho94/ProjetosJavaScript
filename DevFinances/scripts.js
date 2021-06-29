document.addEventListener('click', e => {
   el = e.target
   const modal = document.querySelector('.modal-overlay')

   if (el.classList.contains('new')) {
      modal.classList.add('active')
   }

   if (el.classList.contains('cancel')) {
      modal.classList.remove('active')
   }
})
