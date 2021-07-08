const modal = document.querySelector('.modal-overlay')

document.addEventListener('click', e => {
   el = e.target
   if (el.classList.contains('new') || el.classList.contains('cancel')) {
      modal.classList.toggle('active')
   }
})

const Storage = {
   get() {
      return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
   },

   set(transactions) {
      localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
   }
}

const Transaction = {
   all: Storage.get(),

   add(transaction) {
      this.all.push(transaction)
      App.reload()
   },

   remove(index) {
      this.all.splice(index, 1)
      App.reload()
   },

   incomes() {
      let income = 0
      let incomes = this.all.filter(elem => elem.amount > 0)
      incomes.forEach(elem => (income += elem.amount))
      return income
   },

   expenses() {
      let expense = 0
      let expenses = this.all.filter(elem => elem.amount < 0)
      expenses.forEach(elem => (expense += elem.amount))
      return expense
   },

   total() {
      return this.incomes() + this.expenses()
   }
}

const DOM = {
   transactionsContainer: document.querySelector('#data-table tbody'),

   addTransactions(transaction, index) {
      const tr = document.createElement('tr')
      tr.innerHTML = this.innerHTMLTransaction(transaction, index)
      tr.dataset.index = index
      this.transactionsContainer.appendChild(tr)
   },

   innerHTMLTransaction(transaction, index) {
      const cssClas = transaction.amount > 0 ? 'income' : 'expense'

      const amount = Utils.formatCurrency(transaction.amount)

      const html = `
      <td class="description">${transaction.description}</td>
      <td class="${cssClas}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="" /></td>
      `
      return html
   },

   updateBalance() {
      document.querySelector('#income-display').innerHTML =
         Utils.formatCurrency(Transaction.incomes())
      document.querySelector('#expense-display').innerHTML =
         Utils.formatCurrency(Transaction.expenses())
      document.querySelector('#total-display').innerHTML = Utils.formatCurrency(
         Transaction.total()
      )
   },

   clearTransactions() {
      this.transactionsContainer.innerHTML = ''
   }
}

const Utils = {
   formatCurrency(value) {
      const signal = Number(value) < 0 ? '-' : ''

      value = String(value).replace(/\D/g, '')
      value = Number(value) / 100
      value = value.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL'
      })

      return signal + value
   },

   formatAmount(value) {
      value = value * 100
      return Math.round(value)
   },

   formatDate(date) {
      const splittedDate = date.split('-')
      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
   }
}

const Form = {
   description: document.querySelector('input#description'),
   amount: document.querySelector('input#amount'),
   date: document.querySelector('input#date'),

   getValues() {
      return {
         description: this.description.value,
         amount: this.amount.value,
         date: this.date.value
      }
   },

   validateFields() {
      const { description, amount, date } = this.getValues()

      if (
         description.trim() === '' ||
         amount.trim() === '' ||
         date.trim() === ''
      ) {
         throw new Error('Por favor, preencha todos os campos!')
      }
   },

   formatValues() {
      let { description, amount, date } = this.getValues()
      amount = Utils.formatAmount(amount)
      date = Utils.formatDate(date)

      return {
         description,
         amount,
         date
      }
   },

   clearFields() {
      this.description.value = ''
      this.amount.value = ''
      this.date.value = ''
   },

   modalClose() {
      modal.classList.remove('active')
   },

   submit(event) {
      event.preventDefault()
      try {
         this.validateFields()
         const transaction = this.formatValues()
         //salvar
         Transaction.add(transaction)
         //apagar dados form
         this.clearFields()
         //fecha modal
         this.modalClose()
      } catch (error) {
         alert(error.message)
      }
   }
}



const App = {
   init() {
      Transaction.all.forEach((elem, index) => DOM.addTransactions(elem, index))
      DOM.updateBalance()
      Storage.set(Transaction.all)
   },

   reload() {
      DOM.clearTransactions()
      this.init()
   }
}

App.init()
