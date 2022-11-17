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

  myLibrary.forEach((item, index) => {
    const card = document.createElement("div")
    card.classList.add("card")
    library.appendChild(card)

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
    
    const isRead = document.createElement("button")
    isRead.classList.add("isReadStatus")
    if(item.isRead == true) {
      isRead.setAttribute('checked', true)
      card.classList.add("isReadTrue")
      isRead.textContent = "Yes"
    } else {
      card.classList.add("isReadFalse")
      item.isRead = false
      isRead.textContent = "No"
    }
    card.appendChild(isRead)
    

    // ------function to toggle read status------

    isRead.addEventListener('click', toggleReadStatus) 
     function toggleReadStatus(){
      if (card.classList.contains('isReadTrue')) {
        card.classList.remove('isReadTrue')
        card.classList.add('isReadFalse')
        isRead.textContent = "No"
        item.isRead = false;
      } else if (card.classList.contains('isReadFalse')) {
        card.classList.remove('isReadFalse')
        card.classList.add('isReadTrue')
        isRead.textContent = "Yes"
        item.isRead = true;
      }
      displayBooks();
    };


    // ------create delete button------
    const removeBookButton = document.createElement("button")
    removeBookButton.classList.add("remove_book_button")
    removeBookButton.addEventListener("click", deleteBookCard)
    removeBookButton.textContent = "Delete Card"
    removeBookButton.dataset.linkedArray = index
    card.appendChild(removeBookButton)

    // ------function to delete book card------
    function deleteBookCard() {
      let retreiveBookToRemove = removeBookButton.dataset.linkedArray
      myLibrary.splice(parseInt(retreiveBookToRemove), 1)
      card.remove()
      displayBooks()
    }
    index++
  })
}

addBookToLibrary("Lord of the Rings - The Fellowship of the Ring", "Tolkien", "567", false)
addBookToLibrary("The Hobbit", "Tolkien", "123", true)
addBookToLibrary("The Silmarillion", "Tolkien", "232", false)

