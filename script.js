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
    constructor(title, author, pages) {
        this.title = title
        this.author = author
        this.pages = pages
    }
}

// ------function to make book------

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages)
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

    // ------function to delete book------
    function deleteBookCard(){
      let retreiveBookToRemove = removeBookButton.dataset.linkedArray
      myLibrary.splice(parseInt(retreiveBookToRemove), 1)
      card.remove()
      displayBooks()
    }
    // ------Create book card------
    const title = document.createElement("h2")
    title.textContent = (item.title)
    card.appendChild(title)
        
    const author = document.createElement("p")
    author.textContent = (`Author: ${item.author}`)
    card.appendChild(author)
    
    const pages = document.createElement("p")
    pages.textContent = (`Pages: ${item.pages}`)
    card.appendChild(pages)
    
    const inputText = document.createElement("p")
    inputText.textContent = "Have you read it?"
    card.appendChild(inputText)
    
    const isRead = document.createElement("input")
    isRead.setAttribute('type', 'checkbox')
    card.appendChild(isRead)
    
    index++
  })

}
// ------function to get input from form------

const submit = document.getElementById("submit")
submit.addEventListener("click", getInput)

function getInput() {
  let title = document.getElementById("title").value
  let author = document.getElementById("author").value
  let pages = document.getElementById("pages").value

  addBookToLibrary(title, author, pages)

  document.getElementById("add_book_form").reset()

  popupContainer.classList.remove("pop")

}

