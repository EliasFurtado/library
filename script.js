class Book {
    constructor(
        title = '',
        author = '',
        pages = 0,
        readStatus = "Not Read",
        isRead = false
    ){
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.isRead = isRead}
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if(!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title)
    }

    setStatus(title, status) {
        return this.books.map((book) => {
            if(book.title === title) {
                book.readStatus = status;
                (status === "Read") ? book.isRead = true : book.isRead = false 
        }
    })
    }
}

const myLibrary = new Library()

function getDataFromInput() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const isRead = document.querySelector("#is-read").checked
    const readStatus = isRead ? "Read" : "Not Read"

    return new Book(title, author, pages, readStatus, isRead)
}

const button = document.querySelector("#add-button").addEventListener("click", saveBook)
const cardContainer = document.querySelector(".book-card-container")
const newBookButton = document.querySelector(".new-book-btn")
const newBookForm = document.querySelector(".container")
const closeFormButton = document.querySelector(".close")

newBookButton.addEventListener("click", () => {
    newBookForm.style.display = "flex"
})

closeFormButton.addEventListener("click", closeNewBookForm)

function closeNewBookForm() {
    newBookForm.style.display = "none"
}

function saveBook() {
    const newBook = getDataFromInput()

    if (myLibrary.isInLibrary(newBook)) {
        //todo error msg
        console.log('ERROR')
    } else {
        myLibrary.addBook(newBook)
        renderBooks()
        closeNewBookForm()
    }
}

function createBookCard(book) {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const readStatus = document.createElement('p')
    const readStatusLabel = document.createElement('label')
    const readStatusInput = document.createElement('input')
    const readStatusSlider = document.createElement('span')
    const deleteButton = document.createElement('button')

    bookCard.classList.add('book-card')

    title.textContent = book.title
    author.textContent = "Author: " + book.author
    pages.textContent = "Pages: " + book.pages
    readStatus.textContent = book.readStatus
    readStatusInput.checked = book.isRead
    deleteButton.textContent = 'delete'

    readStatusInput.type = 'checkbox'
    readStatusInput.id = "is-read"
    readStatusLabel.classList.add('switch')
    readStatusSlider.classList.add('slider', 'round')

    readStatusInput.addEventListener("click", setReadStatus)
    deleteButton.onclick = removeBook

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(readStatus)
    bookCard.appendChild(readStatusLabel)
    bookCard.appendChild(deleteButton)
    readStatusLabel.appendChild(readStatusInput)
    readStatusLabel.appendChild(readStatusSlider)
    cardContainer.appendChild(bookCard)
}

function resetBooksCard() {
    cardContainer.innerHTML = ''
}

function renderBooks() {
    resetBooksCard()
    for (let book of myLibrary.books) {
        createBookCard(book)
    }
}

function removeBook(e) {
    const title = e.target.parentNode.firstChild.innerHTML.replaceAll('""')

    myLibrary.removeBook(title)
    renderBooks()
}

function setReadStatus(e) {
    const title = e.target.parentNode.parentElement.childNodes[0].textContent
    let toogleStatus = e.target.checked
    
    if(toogleStatus) {
        myLibrary.setStatus(title, "Read")
        console.log(toogleStatus)
        renderBooks()
        
    } else if(!toogleStatus){
        myLibrary.setStatus(title, "Not read")
        console.log(toogleStatus)
        renderBooks()
 
    }
    
}