let library = []

function Book(title, author, numPages, haveRead = false) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
  this.info = () => {
    let info = `${this.title} by ${this.author}, ${this.numPages} pages, `
    if (this.haveRead) {
      return info + "have read."
    } else {
      return info + "have not read."
    }
  }
}


function addBookToLibrary(obj) {
  let newBook = new Book(obj.title, obj.author, obj.numPages, obj.haveRead)
  library.push(newBook)
}

function printBooksToPage(library) {
  // create variable for main book container
  let bookContainer = document.querySelector(".books")
  
  library.forEach(book => {
    // initialize book container to be added
    let bookInfoWrapper = document.createElement('div')
    bookInfoWrapper.className = "col-sm book"

    // initialize element for book title
    let bookTitle = document.createElement("h4")
    bookTitle.innerText = book.title

    // initialize element for book author
    let bookAuthor = document.createElement("h6")
    bookAuthor.innerText = book.author

    // initialize element for page length of book
    let bookPageLength = document.createElement("p")
    bookPageLength.innerText = `${book.numPages} pages`

    // append book to books container
    bookContainer.append(bookInfoWrapper)
    
    // append book info to book information container
    let bookInfo = [bookTitle, bookAuthor, bookPageLength]
    bookInfo.forEach(section => {
      bookInfoWrapper.append(section);
    })
    const viewButton = document.createElement('div')
    viewButton.className = "btn book-info"
    viewButton.innerText = 'info'
    bookInfoWrapper.append(viewButton);
  })
}

// Display form when add book button is pressed
const addBookButton = document.querySelector('.add-book')
const bookForm = document.querySelector('.book-form')
addBookButton.addEventListener('click', () => {
  addBookButton.classList.add('d-none')
  bookForm.classList.remove('d-none')
})

// Hide form after submitting book
const submitBookButton = document.querySelector('.book-submit')
submitBookButton.addEventListener('click', () => {
  bookObj = pullBookInfoFromForm()
  addBookToLibrary(bookObj)
  addBookButton.classList.remove('d-none')
  bookForm.classList.add('d-none')
  printBooksToPage(library)
})

// Pull info from form for new book creation
function pullBookInfoFromForm() {
  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const haveRead = document.getElementById("haveRead").checked
  
  let book = {
    title: title,
    author: author,
    pages: pages,
    haveRead: haveRead,
  }
  console.log(book)

  clearForm()
  return book
}

function clearForm() {
  const title = document.getElementById("title").value = ""
  const author = document.getElementById("author").value = ""
  const pages = document.getElementById("pages").value = ""
}



let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295)
let underpants = new Book("Captain Underpants", "Johnathan Underpants", 97, true)
let divineComedy = new Book("The Divine Comedy", "Dante", 353,)
let dune = new Book("Dune", "Frank Herbert", 501, true)
let hyperion = new Book("Hyperion", "Dan Simmons", 462, true)
let endymion = new Book("Endymion", "Dan Simmons", 516, true)

addBookToLibrary(theHobbit)
addBookToLibrary(underpants)
addBookToLibrary(divineComedy)
addBookToLibrary(dune)
addBookToLibrary(hyperion)
addBookToLibrary(endymion)

printBooksToPage(library)
printBooksToPage(library)
printBooksToPage(library)