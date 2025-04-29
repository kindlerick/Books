class Book {
  constructor(author, title, read, pages) {
    this.author = author;
    this.title = title;
    this.read = read;
    this.pages = pages;
    this.id = this.generateId();
  }
  generateId() {
    return crypto.randomUUID();
  }
}

class Library {
  constructor() {
    this.library = [];

    this.addBookToLibrary = this.addBookToLibrary.bind(this);
    this.addRowToTable = this.addRowToTable.bind(this);
    this.populateTable = this.populateTable.bind(this);
    this.addListeners = this.addListeners.bind(this);
  }

  addBookToLibrary(bookName, bookAuthor, bookRead, bookPages) {
  
    if (!this.library || this.library.length === 0) {
      console.log("Library is empty for now.");
    }
    
    let newBook = new Book(bookName, bookAuthor, bookRead, bookPages);
    
    this.library.push(newBook);
  
  }
  
  populateTable() {

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
        
    const deleteHead = document.createElement("td");
    const authorHead = document.createElement("td");
    const titleHead = document.createElement("td");
    const idHead = document.createElement("td");
    const readHead = document.createElement("td");
    const pagesHead = document.createElement("td");
  
    tbl.id = 'bookTable';
    tblBody.id = 'table-body';
  
    deleteHead.textContent = "Delete";
    authorHead.textContent = "Author";
    titleHead.textContent = "Title";
    idHead.textContent = "Book Id";
    readHead.textContent = "Read";
    pagesHead.textContent = "Pages";
    
    tbl.appendChild(deleteHead);
    tbl.appendChild(authorHead);
    tbl.appendChild(titleHead);
    tbl.appendChild(idHead);
    tbl.appendChild(readHead);
    tbl.appendChild(pagesHead);
  
    if (!this.library || this.library.length === 0) {
      console.log("Library is empty.");
      return;
    }

    for (let i = 0; i < this.library.length; i++) {

      const row = document.createElement("tr");

      const book = this.library[i];

      const deleteCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const titleCell = document.createElement("td");
      const idCell = document.createElement("td");
      const readCell = document.createElement("td");
      const pagesCell = document.createElement("td");

      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("delete-button");
      deleteCell.appendChild(button);

      authorCell.textContent = book.author;
      titleCell.textContent = book.title;
      idCell.textContent = book.id;
      pagesCell.textContent = book.pages;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      readCell.appendChild(checkbox);

      checkbox.checked = book.read;


      row.appendChild(deleteCell);
      row.appendChild(authorCell);
      row.appendChild(titleCell);
      row.appendChild(idCell);
      row.appendChild(readCell);
      row.appendChild(pagesCell);

      tblBody.appendChild(row);

    }

    tbl.appendChild(tblBody);
    
    document.body.appendChild(tbl);

    tbl.setAttribute("border", "2");
    
  }
  
  addRowToTable(title,author,pages) {
  
    const newRow = document.createElement("tr");
  
    let deleteCell = document.createElement("td");
    let button = document.createElement("button");
    button.classList.add("delete-button");
    deleteCell.appendChild(button);
    newRow.appendChild(deleteCell);
  
    let authorCell = document.createElement("td");
    authorCell.textContent = (author);
    newRow.appendChild(authorCell);
  
    let titleCell = document.createElement("td");
    titleCell.textContent = (title);
    newRow.appendChild(titleCell);
  
    let bookIdCell = document.createElement("td");
    bookIdCell.textContent = (crypto.randomUUID());
    newRow.appendChild(bookIdCell);
  
    let readCell = document.createElement("td");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    readCell.appendChild(checkbox); 
  
    newRow.appendChild(readCell);
  
    let pagesCell = document.createElement("td");
    pagesCell.textContent = (pages);
    newRow.appendChild(pagesCell);
  
    const tblBody = document.getElementById("table-body");
    tblBody.appendChild(newRow);
  }

  addListeners () {

    document.addEventListener('DOMContentLoaded', () => {
  
      const form = document.getElementById('form-example');
      
      form.addEventListener("submit", (event) => {
      
        event.preventDefault();
      
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
      
        this.addBookToLibrary(title, author, read, pages);
      
        this.addRowToTable(title,author,pages,read);
  
        form.reset();
        });
      });
  
      document.addEventListener('DOMContentLoaded', () => {
        let table = document.querySelector('table'); 
      
        table.addEventListener('click', (event) => {
          if (event.target.classList.contains('delete-button')) {
            event.preventDefault();
      
            let rowToDelete = event.target.closest("tr");
      
            if (rowToDelete) {
              rowToDelete.remove();
            }
          }
        });
      });

  }

}

  const myLibrary = new Library();
  
  myLibrary.addBookToLibrary("Amy", "Brand", true, "555");
  myLibrary.addBookToLibrary("Beth", "Wayne", false, "344");
  myLibrary.addBookToLibrary("Alice", "Johnson", true, "123");
  myLibrary.addBookToLibrary("Michael", "Smith", false, "457");
  myLibrary.addBookToLibrary("Emma", "Williams", true, "678");
  
  myLibrary.populateTable();

  myLibrary.addListeners();
