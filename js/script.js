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
  // add only the new book
  let newBook = library[library.length - 1]
  printBooksToPage([newBook])
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
let fahr = new Book("Fahrenheit 451", "Ray Bradbury", 451, true)
let starship = new Book("Starship Troopers", "Robert Heinlein", 300, true)
let ender = new Book("Ender's Game", "Orson Scott Card", 400)

function addBooksToLibrary() {
  let books = [theHobbit, underpants, divineComedy, dune, hyperion, endymion, fahr, starship, ender]
  books.forEach(book => {
    addBookToLibrary(book)
  })
}

addBooksToLibrary()
printBooksToPage(library)

// Add event listeners for delete book buttons
const deleteButtons = document.querySelectorAll('.book-delete')
deleteButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.parentNode.parentNode.classList.add("d-none")
  })
})


const infoButtons = document.querySelectorAll('.book-info')
const bookCards = document.querySelectorAll('.book')
const cardBackSides = document.querySelectorAll('.book-back')
const flipCards = document.querySelectorAll('.flip-card')

bookCards.forEach((card, idx) => {
  let infoButton = infoButtons[idx]
  let backInfo = cardBackSides[idx]
  let backInfoChildren = Array.from(backInfo.children)
  let childElements = Array.from(card.children)
  let currentBook = library[idx]

  infoButton.addEventListener('click', () => {
    rotateCard(card, backInfo)
    hideElementsOnCard(childElements)
    changeReadInfoText(currentBook, backInfoChildren[0])
    displayElementsOnCard(backInfo)
  })
})

const readStatusButtons = document.querySelectorAll('.change-read-status')
readStatusButtons.forEach((button, idx) => {
  let frontElements = Array.from(bookCards[idx].children)
  let backInfo = cardBackSides[idx]
  let currentBook = library[idx]
  let currentBookElement = document.getElementById(`book${idx}`)
  let flipCard = flipCards[idx]

  button.addEventListener('click', () => {
    currentBook.switchReadStatus()
    rotateCardBack(currentBookElement)
    displayElementsOnCard(frontElements)
    hideElementsOnCard(backInfo)
  })

  flipCard.addEventListener('click', () => {
    rotateCardBack(currentBookElement)
    displayElementsOnCard(frontElements)
    hideElementsOnCard(backInfo)
  })
})


function rotateCard(card, back) {
  card.style.transition = "transform 0.2s"
  card.style.transform = "rotateY(180deg)"
  back.style.transform = "rotateY(180deg)"
  card.style.boxShadow = "-3px 4px 8px -4px rgba(0, 0, 0, 0.466)"
}
function rotateCardBack(back) {
  back.style.boxShadow = "3px 4px 8px -4px rgba(0, 0, 0, 0.466)"
  back.style.transform = "rotateY(180deg)"
  back.style.transform = "none"
}
function hideElementsOnCard(card) {
  if (Array.isArray(card)) {
    card.forEach(child => {
      hideElementsOnCard(child)
    })
  } else {
    card.classList.add("d-none")
  }
}
function displayElementsOnCard(card) {
  if (Array.isArray(card)) {
    card.forEach(child => {
      displayElementsOnCard(child)
    })
  } else {
    card.classList.remove("d-none")
  }
}
function changeReadInfoText(book, element) {
  if (book.haveRead) {
    element.innerText = "You have already read this book."
  } else {
    element.innerText = "You have not read this book."
  }
}