let myLibrary = [];
if (localStorage.getItem("readingList")) {
  myLibrary = localStorage.getItem("readingList");
  myLibrary = JSON.parse(myLibrary);
}

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

const html = document.querySelector("html");
const style = document.createElement("style");

style.innerHTML = `

html {
background: #eee;
}

#container {
display: grid;
grid-template-areas: 
		"cards cards cards"
		"cards cards cards"
		"input input input"
}

#cards {
display: flex;
flex-wrap: wrap;
max-height: 100vmin;
overflow-x: auto;
}

.card {
display: block;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border-radius: 7px;
padding: 5px;
margin: 10px;
font-family: "Courier New", monospace;
width: 30ch;
background: repeating-linear-gradient(#fff, #fff 22%, #d9eaf3 23%, #d9eaf3 24%) 0 4px;
}

.card:hover {
box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.cardImages {
height: 2rem; 
display: flex; 
flex-direction: row;
justify-content: space-between;
}

.images {
padding: 0;
width: 1.2rem;
height: 1.2rem;
opacity: 0.3;
}

.images:hover {
opacity: 1;
}

.input {
border: none;
font-family: "Courier New", monospace;
font-size: 1em;
margin: 0 0 0.5em 0;
width: 100%;
background: rgba(0,0,0,0);
}
`;

html.appendChild(style);

const container = document.querySelector("#container");

const cards = document.createElement("div");
cards.id = "cards";
cards.style.gridArea = "cards";
container.appendChild(cards);

const status = (item) => myLibrary[item].read;

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
  const index = book.id.slice(4);
  const delButton = document
    .getElementById(`delButton${book.id}`)
    .addEventListener("click", () => {
      myLibrary.splice(index, 1);
      localStorage.setItem("readingList", JSON.stringify(myLibrary));
      createCards();
    });
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

const createCards = () => {
  while (cards.firstChild) {
    cards.removeChild(cards.lastChild);
  }
  enterNewBook();
  for (item in myLibrary) {
    createCard(item);
  }
};

createCards();
