const APIURL = 'https://api.github.com/users/'

const form = document.querySelector('form')
const search = document.querySelector('#search')
const container = document.querySelector('.container')

getProfiles('pedrocoelho94')

async function getProfiles(user) {
   const resp = await fetch(APIURL + user)
   const respData = await resp.json()
   createUserCard(respData)
   getRepos(user)
}

async function getRepos(user) {
   const resp = await fetch(APIURL + user + '/repos')
   const respData = await resp.json()
   addReposToCard(respData)
}

function addReposToCard(repos) {
   repos.forEach(repo => {
      const reposList = document.querySelector('.reposList')
      const repoEl = document.createElement('a')
      repoEl.href = repo.html_url
      repoEl.target = '_blank'
      repoEl.innerHTML = `<span>${repo.name}</span>`
      reposList.appendChild(repoEl)
   })
}

function createUserCard(user) {
   const card = document.querySelector('.card')
   card.innerHTML = ''
   card.style.display = 'grid'
   card.innerHTML = `<div class="card-img">
   <img src="${user.avatar_url}" alt="">
   </div>
   <div class="card-info">
   <h2>${user.name}</h2>
   <span class="small-text"><a href="${user.html_url}" target="_blank">visit on github</a></span>
   <p>${user.bio}</p>
   <div class="numbers">
      <div class="followers"><span>${user.followers}</span> Followers</div>
      <div class="Following"><span>${user.following}</span> Following</div>
      <div class="repos"><span>${user.public_repos}</span> Repos</div>
   </div>

   <div class="reposList">
      <h3>Repos:</h2>
   </div>
   </div>`

      container.appendChild(card)
}


form.addEventListener('submit', e => {
   e.preventDefault()
   if (search.value) {
      getProfiles(search.value)
      search.value = ''
   }
})
