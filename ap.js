// Book Class: Represents a Book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {

    const books = store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static deleteBooks(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();

    }
  }
  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }
  static showAlert(message,className){
    const div=document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container= document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //alert will vanish in 2 sec
    setTimeout(()=>document.querySelector('.alert').remove(),2000);

  }
  static clearFields(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
  }

}

// Store Class:handles storage
class store{
  //get books from localstorage
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books=[];
    } else{
      books=JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  // add books to local storage
  static addBook(book){
    const books=store.getBooks();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }
  //remove book from  local storage
  static removeBook(isbn){
    const books=store.getBooks();

    books.forEach((book,index)=>{
      if(book.isbn===isbn){
        books.splice(index,1);
      }
    });

    localStorage.setItem('books',JSON.stringify(books));
  }
}

// Event:Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: add a book
document.querySelector('#book-form').addEventListener('submit',
(e)=>{
  //prevent actual submit
  e.preventDefault();

  //get details
  const title= document.querySelector('#title').value;
  const author= document.querySelector('#author').value;
  const isbn= document.querySelector('#isbn').value;

// validiate
  if(title===''||author===''||isbn===''){
    UI.showAlert(`please fill u sick head`,'danger');
  }
  else
  {
    // initiate a book
    const book= new Book(title,author,isbn);

    //add book to list
    UI.addBookToList(book);

    //add book to local localStorage

    store.addBook(book);

    //alert success
    UI.showAlert(`You successfully added a Book`,'success');

    // clear fields
    UI.clearFields()
  }
});
// Event: remove a book
  document.querySelector('#book-list').addEventListener('click',
  (e)=>{
     UI.deleteBooks(e.target);

     //remove a book from  localStorage
     //const isbn=document.querySelector(e.target.parentElement.previousElementSibling.textContent);
     store.removeBook
     (e.target.parentElement.previousElementSibling.textContent);

     //alert succesfuly deleted
     UI.showAlert(`you removed a book`,'success');
  });
