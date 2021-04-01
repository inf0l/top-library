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
`;

html.appendChild(style);

const container = document.querySelector("#container");

const cards = document.createElement("div");
cards.id = "cards";
cards.style.gridArea = "cards";
container.appendChild(cards);

const inputFields = document.createElement("div");
inputFields.id = "inputFields";
inputFields.style.gridArea = "input";
container.appendChild(inputFields);

const status = (item) => myLibrary[item].read;

for (item in myLibrary) {
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
      const card = document.getElementById(book.id);
      cards.removeChild(card);
    });
  const checkButton = document.getElementById(`checkButton${book.id}`);
  checkButton.addEventListener("click", () => {
    const index = book.id.slice(4);
    const card = document.getElementById(book.id);
    const nextCard = document.getElementById(`Book${Number(index) + 1}`);
    if (status(index) != "Read") {
      myLibrary[index].read = "Read";
      checkButton.style.opacity = "1";
      console.log(myLibrary[index].read);
    } else {
      myLibrary[index].read = "not read yet";
      checkButton.style.opacity = "0.3";
      console.log(myLibrary[index].read);
    }
    cards.removeChild(card);
    cards.insertBefore(card, nextCard);
  });
  if (myLibrary[item].read == "Read") {
    checkButton.style.opacity = "1";
  }
}
