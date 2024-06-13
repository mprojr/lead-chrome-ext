let myLeads = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
let unList = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

// LOCAL DATABASE INTEGRATION WITH ERROR HANDLING
try {
  const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
  if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
  }
} catch (error) {
  console.error('Error parsing localStorage data:', error)
}

tabBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
  })
})

function render(leads) {
  let listItems = ''
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>`
  }
  unList.innerHTML = listItems
}

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLeads', JSON.stringify(myLeads))
  render(myLeads)
})
