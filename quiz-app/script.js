const question = document.querySelector('.question')
const a1 = document.querySelector('.a1')
const a2 = document.querySelector('.a2')
const a3 = document.querySelector('.a3')
const a4 = document.querySelector('.a4')
const gameOver = document.querySelector('.modal-wrapper')
const resetBtn = document.querySelector('.reset')
const correctTag = document.querySelector('.correct span')
const wrongTag = document.querySelector('.wrong span')
let correct = 0
let wrong = 0

const quiz = {
   newQuizData: [
      {
         question: 'Qual maior campeão da copa do mundo de futebol?',
         a_1: 'Brasil',
         a_2: 'Alemanha',
         a_3: 'Itália',
         a_4: 'França',
         correct: 'Brasil'
      },
   
      {
         question: 'Quantos títulos mundiais tem o Palmeiras?',
         a_1: '3',
         a_2: '1',
         a_3: '0',
         a_4: '4',
         correct: '0'
      },
   
      {
         question: 'Qual a linguagem utilizada no front-end?',
         a_1: 'Java',
         a_2: 'JavaScript',
         a_3: 'PHP',
         a_4: 'Ruby',
         correct: 'JavaScript'
      },
   
      {
         question: 'Quantas casas decimais tem o número pi?',
         a_1: 'Duas',
         a_2: 'Vinte',
         a_3: 'Infinitas',
         a_4: 'Milhares',
         correct: 'Infinitas'
      },
   
      {
         question: 'Qual destes países é transcontinental?',
         a_1: 'Russia',
         a_2: 'Filipinas',
         a_3: 'Groenlândia',
         a_4: 'Tanzânia',
         correct: 'Russia'
      }
   ],

   init() {
      this.clearAnswer()
      const questionIndex = Math.floor(Math.random() * this.newQuizData.length)
      const questionRandom = this.newQuizData[questionIndex]
      this.showQuestions(questionRandom)
      this.verifytAnswer(questionRandom, this.newQuizData, questionIndex)
   },

   showQuestions(questionRandom) {
      question.innerHTML = questionRandom.question
      a1.innerHTML = questionRandom.a_1
      a2.innerHTML = questionRandom.a_2
      a3.innerHTML = questionRandom.a_3
      a4.innerHTML = questionRandom.a_4
   },

   verifytAnswer(questionRandom, newQuizData, questionIndex) {
      submitBtn = document.querySelector('.submit')

      document.addEventListener('click', e => {
         el = e.target
         if (el.classList.contains('answer')) {
            this.clearAnswer()
            el.classList.add('active')
         }
      })

      submitBtn.onclick = () => {
         try {
            const selectedAnswer =
               document.querySelector('.answer.active').innerHTML

            if (selectedAnswer == questionRandom.correct) {
               correct++
               correctTag.innerHTML = correct
               this.verifyQuestionLeft(newQuizData, questionIndex)
            } else {
               wrong++
               wrongTag.innerHTML = wrong
               this.verifyQuestionLeft(newQuizData, questionIndex)
            }
         } catch (error) {
            alert('Selecione uma opção!')
         }
      }
   },

   verifyQuestionLeft(newQuizData, questionIndex) {
      newQuizData.splice(questionIndex, 1)

      if (newQuizData.length > 0) {
         this.init()
      } else {
         const gameOver = document.querySelector('.modal-wrapper')
         const pModal = document.querySelector('.modal-content p')
         gameOver.classList.add('active')
         pModal.innerHTML = `Você acertou ${correct} de ${correct + wrong}.`

         resetBtn.onclick = () => {
            correct = 0
            wrong = 0
            gameOver.classList.remove('active')
            document.location.reload()
         }
      }
   },

   clearAnswer() {
      const answer = document.querySelectorAll('.answer')
      answer.forEach(e => {
         e.classList.remove('active')
      })
   }
}

quiz.init()
