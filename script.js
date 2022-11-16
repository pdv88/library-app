let myLibrary = [];

const add = document.getElementById("add")
const popupContainer = document.getElementById("popup_container")
const cancel = document.getElementById("cancel")
const library = document.getElementById("library")


// ------function to show add-book form------

add.addEventListener("click", () => {
    popupContainer.classList.add("pop")
})

cancel.addEventListener("click", () => {
    popupContainer.classList.remove("pop")
    document.getElementById("add_book_form").reset()
})


// ------Book constructor------

class Book {
    constructor(title, author, pages,isRead) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

// ------function to get input from form------

const submit = document.querySelector("#submit")
submit.addEventListener("click", getInput)

function getInput() {
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value
  let isRead = document.getElementById("isRead").checked

  if((title == "") || (author == "") || (pages == "")){
    return
  }
  
  addBookToLibrary(title, author, pages, isRead)

  popupContainer.classList.remove("pop")
  document.getElementById("add_book_form").reset()
}

// ------function to make book object------

function addBookToLibrary(title, author, pages, isRead) {
  let book = new Book(title, author, pages, isRead)
  myLibrary.push(book)
  displayBooks()
}


// ------funtion to display book cards on page------

function displayBooks() {
  const removeDivs = document.querySelectorAll(".card")


  for(let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove()
  }
  let index = 0
  myLibrary.forEach(item => {
    const card = document.createElement("div")
    card.classList.add("card")
    library.appendChild(card)

    // ------create delete button------
    const removeBookButton = document.createElement("button")
    removeBookButton.classList.add("remove_book_button")
    removeBookButton.addEventListener("click", deleteBookCard)
    removeBookButton.textContent = "X"
    removeBookButton.dataset.linkedArray = index
    card.appendChild(removeBookButton)

    // ------function to delete book card------
    function deleteBookCard(){
      let retreiveBookToRemove = removeBookButton.dataset.linkedArray
      myLibrary.splice(parseInt(retreiveBookToRemove), 1)
      card.remove()
      displayBooks()
    }
    
    // ------Function to toggle isRead status------
    

    
    // ------Create book card------
    const title = document.createElement("h2")
    title.textContent = item.title
    card.appendChild(title)
        
    const author = document.createElement("p")
    author.textContent = `Author: ${item.author}`
    card.appendChild(author)
    
    const pages = document.createElement("p")
    pages.textContent = `Pages: ${item.pages}`
    card.appendChild(pages)
    
    const inputText = document.createElement("p")
    inputText.textContent = "Have you read it?"
    card.appendChild(inputText)
    
    const isRead = document.createElement("input")
    isRead.setAttribute('type', 'checkbox')
    if(item.isRead == true) {
      isRead.setAttribute('checked', true)
    } 
    card.appendChild(isRead)
    
    index++
  })

}

addBookToLibrary("Lord of the Rings", "Tolkien", "567", false)
addBookToLibrary("Hobbit", "Tolkien", "123", true)
addBookToLibrary("Atomic Habits", "Susan H", "232", false)

