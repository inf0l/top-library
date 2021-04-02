let myLibrary = [];

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
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
const theAlchemist = new Book("The Alchemist", "Pablo Cueho", 164, "finished");

addBookToLibrary(theHobbit);
addBookToLibrary(theAlchemist);
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "Read"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));

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
display: grid;
grid-auto-flow: row;
grid-template-columns: repeat(3, 1fr);
max-height: 800px;
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
max-width: 300px;
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

//function updateCard(id, item) {
//const book = document.getElementById(id);
//cards.removeChild(book);
//const nextCard = document.getElementById(`Book${Number(item) + 1}`);
//book.innerHTML = `<div class="cardImages"><h4>${
//myLibrary[item].title
//}</h4><input type="image" id="delButton${
//book.id
//}" src="../images/SeekPng.com_cross-png-transparent_601052.png" class="images"></div>
//<p>by <em>${myLibrary[item].author}</em></p>
//<p>${myLibrary[item].pages} pages</p>
//<div class="cardImages"><p>...${status(
//item
//)}</p><input type="image" id="checkButton${
//book.id
//}" src="../images/565-5650947_green-check-mark-clip-art.png" class="images" style="opacity: 1; align-self: flex-end;"></div>
//`;
//cards.insertBefore(book, nextCard);
//}

const enterNewBook = () => {
  const book = document.createElement("div");
  book.className = "card";
  book.innerHTML = `<form action="addNew" id="new"><input type="text" style="margin-top: 1em; font-weight: bold;"class="input" value="title" id="title" required><input type="text" class="input" value="author" id="author" required><input type="text" style="margin-top: 0.5em;"class="input" value="pages" id="pages" required><div style="display: flex; flex-direction: row; justify-content: space-between;" required><input type="text" style="margin-top: 1.2em; margin-bottom: 0; width: 60%;" class="input" value="read" id="read" required><input type="submit" id="submit" value="Submit" style="background: rgba(1,1,0,0.15); border: 0; height: 2.6em; align-self: flex-end; font-family: 'Courier New', monospace;"></div></form>`;
  cards.appendChild(book);
};

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
  const delButton = document
    .getElementById(`delButton${book.id}`)
    .addEventListener("click", () => {
      myLibrary.splice(book.id, 1);
      updateCards();
    });
  const checkButton = document.getElementById(`checkButton${book.id}`);
  checkButton.addEventListener("click", () => {
    console.table(myLibrary);
    const card = document.getElementById(book.id);
    const index = book.id.slice(4);
    switch (myLibrary[index].read == "Read") {
      case true:
        myLibrary[index].read = "not read yet";
        cards.removeChild(card);
        createCard(index);
        break;
      case false:
        myLibrary[index].read = "Read";
        cards.removeChild(card);
        createCard(index);
        break;
    }
  });
  if (myLibrary[item].read == "Read") {
    checkButton.style.opacity = "1";
  }
};

const newBook = document.getElementsByName("addNew");
console.log(newBook.elements);
newBook.addEventListener("submit", () => {
  let title = document.getElementById(title);
  let author = document.getElementById(author);
  let pages = document.getElementById(pages);
  let read = document.getElementById(read);

  addBookToLibrary(new Book(title, author, pages, read));
});

const createCards = () => {
  enterNewBook();
  for (item in myLibrary) {
    createCard(item);
  }
};

const updateCards = () => {
  location.reload();
};

createCards();
