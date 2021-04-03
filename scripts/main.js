// Set up array and persistant storage for books
let myLibrary = [];
if (localStorage.getItem("readingList")) {
  myLibrary = localStorage.getItem("readingList");
  myLibrary = JSON.parse(myLibrary);
}

// Set up HTML elements
const html = document.querySelector("html");
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = "./css/style.css";
html.appendChild(style);

const container = document.querySelector("#container");

const cards = document.createElement("div");
cards.id = "cards";
cards.style.gridArea = "cards";
container.appendChild(cards);

// Main library function
const library = () => {
  // Set up Book constructor
  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };

  function addBookToLibrary(book) {
    myLibrary.push(new Book(book.title, book.author, book.pages, book.read));
    localStorage.setItem("readingList", JSON.stringify(myLibrary));
  }

  // Helper
  const status = (item) => myLibrary[item].read;

  // Set up 'index cards' that will display information about book
  const createCard = (item) => {
    const book = document.createElement("div");
    book.className = "card";
    book.id = `Book${item}`;
    book.innerHTML = `<div class="cardImages"><h4>${
      myLibrary[item].title
    }</h4><input type="image" id="delButton${
      book.id
    }" src="../images/SeekPng.com_cross-png-transparent_601052.png" class="images"></div>
												<p>by <em>${myLibrary[item].author}</em></p>
												<p>${myLibrary[item].pages} pages</p>
														<div class="cardImages"><p>...${status(
                              item
                            )}</p><input type="image" id="checkButton${
      book.id
    }" src="../images/565-5650947_green-check-mark-clip-art.png" class="images" style="align-self: flex-end;"></div>
																								`;
    cards.appendChild(book);

    // Helper
    const index = book.id.slice(4);

    // Removes index card and book info from array/localStorage
    const delButton = document
      .getElementById(`delButton${book.id}`)
      .addEventListener("click", () => {
        myLibrary.splice(index, 1);
        localStorage.setItem("readingList", JSON.stringify(myLibrary));
        createCards();
      });
    // Updates 'read' status of book
    const checkButton = document.getElementById(`checkButton${book.id}`);
    checkButton.addEventListener("click", () => {
      const card = document.getElementById(book.id);
      switch (myLibrary[index].read == "Read") {
        case true:
          myLibrary[index].read = "not read yet";
          localStorage.setItem("readingList", JSON.stringify(myLibrary));
          createCards();
          break;
        case false:
          myLibrary[index].read = "Read";
          localStorage.setItem("readingList", JSON.stringify(myLibrary));
          createCards();
          break;
      }
    });
    if (myLibrary[item].read == "Read") {
      checkButton.style.opacity = "1";
    }
  };

  // Set up input fields for adding new books (in style of other index cards)
  const enterNewBook = () => {
    const book = document.createElement("div");
    book.className = "card";
    book.innerHTML = `<form id="newBookForm"><input type="text" autofocus="autofocus" onFocus="this.select()" style="margin-top: 1em; font-weight: bold;"class="input" value="Add new book" id="newTitle" required><input type="text" class="input" value="author" id="newAuthor" required><input type="text" style="margin-top: 0.5em;"class="input" value="# of pages" id="newPages" required><div style="display: flex; flex-direction: row; justify-content: space-between;" required><input type="text" style="margin-top: 1.2em; margin-bottom: 0; width: 60%;" class="input" value="read?" id="newRead" required><input type="image" class="images" style="align-self: flex-end" id="submit" value="Submit" src="../images/565-5650947_green-check-mark-clip-art.png"></div></form>`;
    cards.appendChild(book);
    const newBook = document
      .getElementById("newBookForm")
      .addEventListener("submit", () => {
        let title = document.getElementById("newTitle");
        let author = document.getElementById("newAuthor");
        let pages = document.getElementById("newPages");
        let read = document.getElementById("newRead");

        addBookToLibrary(
          new Book(title.value, author.value, pages.value, read.value)
        );
        createCards();
      });
  };

  // Clear all cards before repopulating to allow for new indices in array
  const createCards = () => {
    while (cards.firstChild) {
      cards.removeChild(cards.lastChild);
    }
    enterNewBook();
    for (item in myLibrary) {
      createCard(item);
    }
  };
  return { createCards };
};

const main = library();

main.createCards();
