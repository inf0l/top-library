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
addBookToLibrary(new Book("Inferno", "Dante", 666, "not read yet"));
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

for (item in myLibrary) {
  const book = document.createElement("div");
  book.className = "card";
  book.id = myLibrary[item].title;
  book.innerHTML = `<h4>${book.id}</h4>
	<p>by <em>${myLibrary[item].author}</em></p>
<p>${myLibrary[item].pages} pages</p>
	<p>...${myLibrary[item].read}</p>
		`;
  cards.appendChild(book);
}
