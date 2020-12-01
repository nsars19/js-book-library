let library = []

function Book(title, author, numPages, haveRead = false) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.haveRead = haveRead;
}

Book.prototype.switchReadStatus = function() {
  return this.haveRead ? this.haveRead = false : this.haveRead = true
}

function addBookToLibrary(obj) {
  let newBook = new Book(obj.title, obj.author, obj.numPages, obj.haveRead)
  library.push(newBook)
}

function printBooksToPage(library) {
  // create variable for main book container
  let bookContainer = document.querySelector(".books")
  
  library.forEach((book, idx) => {
    // initialize book container to be added
    let bookInfoWrapper = document.createElement('div')
    bookInfoWrapper.className = "col-sm book"
    bookInfoWrapper.setAttribute("id", `book${idx}`)

    // initialize element for book title
    let bookTitle = document.createElement("h4")
    bookTitle.innerText = book.title

    // initialize element for book author
    let bookAuthor = document.createElement("h6")
    bookAuthor.innerText = book.author

    // initialize element for page length of book
    let bookPageLength = document.createElement("p")
    bookPageLength.innerText = `${book.numPages} pages`

    // initialize element container for backside of card
    let bookBackSideWrapper = document.createElement("div")
    bookBackSideWrapper.className = "book-back d-none"

    // initialize element to hold text alerting user of read status
    let backsideText = document.createElement("p")
    bookBackSideWrapper.append(backsideText)

    // initialize button to hold read/unread status changing function
    let backsideReadButton = document.createElement("div")
    backsideReadButton.className = "btn change-read-status"
    backsideReadButton.innerText = "change status"
    bookBackSideWrapper.append(backsideReadButton)

    // initialize button to flip card back over
    let backFlipButton // nice
    backFlipButton = document.createElement("div")
    backFlipButton.className = "btn flip-card"
    backFlipButton.innerText = "back"
    bookBackSideWrapper.append(backFlipButton)

    // append book to books container
    bookContainer.append(bookInfoWrapper)
    
    // append book info to book information container
    let bookInfo = [bookTitle, bookAuthor, bookPageLength, bookBackSideWrapper]
    bookInfo.forEach(section => {
      bookInfoWrapper.append(section);
    })
    // create & append button wrapper
    const buttonWrapper = document.createElement('div')
    buttonWrapper.className = "book-info-buttons"
    bookInfoWrapper.append(buttonWrapper)
    // create & append info button
    const viewButton = document.createElement('span')
    viewButton.className = "btn book-info"
    viewButton.innerText = 'info'
    // viewButton.style.maxWidth = "40%"
    buttonWrapper.append(viewButton);
    // create & append delete button
    const deleteButton = document.createElement('span')
    deleteButton.className = "btn book-delete"
    deleteButton.innerText = "delete"
    // deleteButton.style.maxWidth = "40%"
    buttonWrapper.append(deleteButton)
  })
}

function hideElement(elem) {
  elem.classList.add('d-none')
}
function showElement(elem) {
  elem.classList.remove('d-none')
}

// Display form when add book button is pressed
const addBookButton = document.querySelector('.add-book')
const bookForm = document.querySelector('.book-form')
addBookButton.addEventListener('click', () => {
  hideElement(addBookButton)
  showElement(bookForm)
  // remove 20px whitespace between container elements
  addMargin();
})

// Hide form after submitting book
const submitBookButton = document.querySelector('.book-submit')
submitBookButton.addEventListener('click', () => {
  bookObj = pullBookInfoFromForm()
  addBookToLibrary(bookObj)
  showElement(addBookButton)
  hideElement(bookForm)
  printBooksToPage(library)
  // remove added margin
  removeMargin()
})
// Hide form when cancelled
const cancelBookButton = document.querySelector('.book-cancel')
cancelBookButton.addEventListener('click', () => {
  hideElement(bookForm)
  showElement(addBookButton)
  // remove added margin
  removeMargin()
})

function addMargin() {
  const booksWrapper = document.querySelector('.books-wrapper');
  booksWrapper.style.marginTop = "-20px";
}
function removeMargin() {
  const booksWrapper = document.querySelector('.books-wrapper');
  booksWrapper.style.marginTop = "0px";
}

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

// Add event listeners for delete book buttons
const deleteButtons = document.querySelectorAll('.book-delete')
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.parentNode.parentNode.classList.add("d-none")
  })
})