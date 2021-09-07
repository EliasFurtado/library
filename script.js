
class Book {
    constructor(
        title = '',
        author = '',
        pages = 0
    ){
    this.title = title
    this.author = author
    this.pages = pages}
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

    isInLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title)
    }
}

const myLibrary = new Library()

function getDataFromInput() {
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const pages = document.querySelector("#pages").value

    return new Book(title, author, pages)
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

    bookCard.classList.add('book-card')

    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
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