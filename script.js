
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
        console.log('ERROR')
    } else {
        myLibrary.addBook(newBook)
        console.log(myLibrary.books)
    }
}

const button = document.querySelector("#add-button").addEventListener("click", saveBook)


console.log(myLibrary.books)