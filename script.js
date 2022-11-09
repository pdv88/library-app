let myLibrary = [];
const add = document.getElementById("add")
const popup_container = document.getElementById("popup_container")
const cancel = document.getElementById("cancel")

add.addEventListener("click", () => {
    popup_container.classList.add("pop")
})

cancel.addEventListener("click", () => {
    popup_container.classList.remove("pop")
})


function Book(name, pages, isRead) {
  this.name = name
  this.pages = pages
  this.isRead = isRead
}

function addBookToLibrary() {

}

