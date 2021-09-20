class Book {
    constructor(
        title = '',
        author = '',
        pages = 0,
        isRead = false
    ){
    this.title = title
    this.author = author
    this.pages = pages
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
}

const myLibrary = new Library()

function getDataFromInput() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value
    const isRead = document.querySelector("#is-read").checked

    return new Book(title, author, pages, isRead)
}

function saveBook() {
    const newBook = getDataFromInput()

    if (myLibrary.isInLibrary(newBook)) {
        //todo error msg
        console.log('ERROR')
    } else {
        myLibrary.addBook(newBook)
        renderBooks()
        console.log(myLibrary.books)
    }
}

const button = document.querySelector("#add-button").addEventListener("click", saveBook)
const cardContainer = document.querySelector(".book-card-container")

function createBookCard(book) {
    const bookCard = document.createElement('div')
    const title = document.createElement('h3')
    const author = document.createElement('h3')
    const pages = document.createElement('h3')
    const readStatusLabel = document.createElement('label')
    const readStatusInput = document.createElement('input')
    const readStatusSlider = document.createElement('span')
    const deleteButton = document.createElement('button')

    bookCard.classList.add('book-card')

    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages
    readStatusInput.checked = book.isRead
    deleteButton.textContent = 'delete'

    readStatusInput.type = 'checkbox'
    readStatusInput.id = "is-read"
    readStatusLabel.classList.add('switch')
    readStatusSlider.classList.add('slider', 'round')

    

    deleteButton.onclick = removeBook

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
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